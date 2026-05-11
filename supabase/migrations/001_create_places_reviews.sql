-- Parchment core schema: places + reviews
-- Run BEFORE 002_create_bookmarks_table.sql (which references places.id)

-- =========================================================
-- Enums
-- =========================================================
do $$ begin
  create type place_category as enum ('cafe','restaurant','culture','bar','stay');
exception when duplicate_object then null; end $$;

do $$ begin
  create type place_status as enum ('pending','published','rejected');
exception when duplicate_object then null; end $$;

-- =========================================================
-- Tables
-- =========================================================
create table if not exists public.places (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  address         text,
  lat             double precision not null,
  lng             double precision not null,
  city            text not null,
  category        place_category not null default 'cafe',
  vibe            text,
  image_url       text,
  gallery_urls    text[],
  region_id       uuid,
  source_post_url text,
  status          place_status not null default 'pending',
  curator_notes   text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  published_at    timestamptz,
  curated_by      text,
  curator_id      uuid references auth.users(id) on delete set null,
  menu_items      jsonb
);

create index if not exists idx_places_status        on public.places (status);
create index if not exists idx_places_city          on public.places (city);
create index if not exists idx_places_category      on public.places (category);
create index if not exists idx_places_published_at  on public.places (published_at desc);

create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  place_id     uuid not null references public.places(id) on delete cascade,
  author_name  text not null,
  content      text not null,
  rating       smallint check (rating between 1 and 5),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_reviews_place_id   on public.reviews (place_id);
create index if not exists idx_reviews_created_at on public.reviews (created_at desc);

-- =========================================================
-- updated_at trigger
-- =========================================================
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_places_updated_at on public.places;
create trigger trg_places_updated_at
  before update on public.places
  for each row execute function public.set_updated_at();

drop trigger if exists trg_reviews_updated_at on public.reviews;
create trigger trg_reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

-- =========================================================
-- Row Level Security
-- =========================================================
alter table public.places  enable row level security;
alter table public.reviews enable row level security;

-- Public can read only published places
drop policy if exists "places: read published" on public.places;
create policy "places: read published"
  on public.places for select
  using (status = 'published');

-- Admins can read everything (pending/rejected included)
drop policy if exists "places: admin read all" on public.places;
create policy "places: admin read all"
  on public.places for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Admins can insert/update/delete
drop policy if exists "places: admin write" on public.places;
create policy "places: admin write"
  on public.places for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Reviews: anyone (incl. anon) can read
drop policy if exists "reviews: read all" on public.reviews;
create policy "reviews: read all"
  on public.reviews for select
  using (true);

-- Authenticated users can post reviews
drop policy if exists "reviews: auth insert" on public.reviews;
create policy "reviews: auth insert"
  on public.reviews for insert
  to authenticated
  with check (true);

-- Admins can update/delete any review
drop policy if exists "reviews: admin manage" on public.reviews;
create policy "reviews: admin manage"
  on public.reviews for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
