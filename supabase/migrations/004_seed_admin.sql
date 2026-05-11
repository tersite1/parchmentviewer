-- 어드민 계정 생성 (수동 실행용)
-- ⚠️ 사용 전: user_email / user_pass 두 줄을 본인 값으로 교체하세요.
-- 멱등성 — 동일 이메일이 이미 있으면 role만 admin으로 갱신.

do $$
declare
  user_email   text := 'admin@parchment.app';     -- ← 바꾸기
  user_pass    text := 'ChangeMe!2026';           -- ← 바꾸기 (8자 이상)
  existing_id  uuid;
  new_user_id  uuid;
begin
  select id into existing_id from auth.users where email = user_email;

  if existing_id is not null then
    update auth.users
    set raw_app_meta_data = jsonb_set(
      coalesce(raw_app_meta_data, '{}'::jsonb),
      '{role}', '"admin"'
    )
    where id = existing_id;
    raise notice 'Existing user upgraded to admin: %', user_email;
    return;
  end if;

  new_user_id := gen_random_uuid();

  insert into auth.users (
    instance_id, id, aud, role, email,
    encrypted_password, email_confirmed_at,
    created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data,
    is_sso_user, is_anonymous,
    confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated', 'authenticated',
    user_email,
    crypt(user_pass, gen_salt('bf')),
    now(), now(), now(),
    jsonb_build_object(
      'provider', 'email',
      'providers', array['email'],
      'role', 'admin'
    ),
    '{}'::jsonb,
    false, false, '', '', '', ''
  );

  insert into auth.identities (
    id, user_id, identity_data,
    provider, provider_id,
    last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(),
    new_user_id,
    jsonb_build_object(
      'sub', new_user_id::text,
      'email', user_email,
      'email_verified', true,
      'phone_verified', false
    ),
    'email',
    new_user_id::text,
    now(), now(), now()
  );

  raise notice 'Admin user created: %', user_email;
end $$;
