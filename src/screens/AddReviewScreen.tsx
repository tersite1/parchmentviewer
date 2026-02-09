import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker'; // Requires native rebuild
import * as Haptics from '../utils/haptics';
import { COLORS, SPACING, CATEGORIES, TYPOGRAPHY } from '../config/constants';
import { Icon } from '../components/Icon';
import { Toast } from '../components/Toast';
import { supabase } from '../config/supabase';
import { useAuthStore } from '../stores/authStore';
import { useRegionsStore } from '../stores/regionsStore';

const CATEGORY_LIST = [
  { id: 'cafe', label: '카페', icon: 'cafe', color: CATEGORIES.cafe.color },
  { id: 'restaurant', label: '음식', icon: 'restaurant', color: CATEGORIES.restaurant.color },
  { id: 'culture', label: '문화', icon: 'culture', color: CATEGORIES.culture.color },
  { id: 'bar', label: '술집', icon: 'bar', color: CATEGORIES.bar.color },
  { id: 'stay', label: '숙박', icon: 'stay', color: CATEGORIES.stay.color },
] as const;

interface AddReviewScreenProps {
  navigation: any;
}

interface MenuItem {
  name: string;
  price: string;
}

export function AddReviewScreen({ navigation }: AddReviewScreenProps) {
  const { user, isAnonymous } = useAuthStore();
  const { regions, fetchRegions } = useRegionsStore();

  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('');
  const [city, setCity] = useState('');
  const [regionId, setRegionId] = useState('');
  const [address, setAddress] = useState('');
  const [vibe, setVibe] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([{ name: '', price: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ visible: true, message, type });
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const pickImage = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    showToast('갤러리 기능은 곧 지원될 예정입니다', 'info');
  };

  const takePhoto = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    showToast('카메라 기능은 곧 지원될 예정입니다', 'info');
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addMenuItem = () => {
    if (menuItems.length < 5) {
      setMenuItems([...menuItems, { name: '', price: '' }]);
    }
  };

  const removeMenuItem = (index: number) => {
    if (menuItems.length > 1) {
      setMenuItems(menuItems.filter((_, i) => i !== index));
    }
  };

  const updateMenuItem = (index: number, field: 'name' | 'price', value: string) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };

  const handleSubmit = async () => {
    if (!name || !category || !city || !regionId) {
      setShowErrors(true);
      showToast('필수 항목을 입력해주세요', 'error');
      return;
    }
    setShowErrors(false);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSubmitting(true);

    try {
      // Filter out empty menu items
      const validMenuItems = menuItems.filter(item => item.name && item.price);

      // Submit to Supabase with pending status
      // lat/lng left null — admin will set exact coordinates
      const { error } = await supabase.from('places').insert({
        name,
        category,
        city,
        region_id: regionId || null,
        address: address || null,
        vibe: vibe || null,
        lat: null,
        lng: null,
        status: 'pending',
        image_url: images.length > 0 ? images[0] : null,
        menu_items: validMenuItems.length > 0 ? validMenuItems : null,
        curator_id: user?.id || null,
        curated_by: user?.user_metadata?.name || user?.email || null,
      });

      if (error) {
        console.error('Submit error:', error);
        showToast('제출에 실패했습니다. 다시 시도해주세요', 'error');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      showToast('관리자 승인 후 공개됩니다', 'success');
      setTimeout(() => navigation.goBack(), 2000);
    } catch (error) {
      console.error('Submit error:', error);
      showToast('제출에 실패했습니다. 다시 시도해주세요', 'error');
      setIsSubmitting(false);
    }
  };

  const showsMenuPrice = category === 'cafe' || category === 'restaurant';
  const isValid = name && category && city && regionId;

  // Login required screen (anonymous users need to sign up too)
  if (!user || isAnonymous) {
    return (
      <View style={styles.container}>
        <Toast {...toast} onHide={() => setToast(t => ({ ...t, visible: false }))} />
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.headerTitle}>공간 추가</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.loginRequired}>
          <Icon name="user" size={64} color={COLORS.textLight} />
          <Text style={styles.loginTitle}>로그인이 필요합니다</Text>
          <Text style={styles.loginDesc}>
            공간을 추가하려면 먼저 로그인해주세요.{'\n'}
            회원가입 후 나만의 공간을 공유할 수 있습니다.
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate('Main', { screen: '프로필' });
            }}
          >
            <Text style={styles.loginButtonText}>로그인 / 회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Toast {...toast} onHide={() => setToast(t => ({ ...t, visible: false }))} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="close" size={24} color={COLORS.bone} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>공간 추가</Text>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid || isSubmitting}
          style={[styles.submitButton, (!isValid || isSubmitting) && styles.submitButtonDisabled]}
        >
          <Text style={[styles.submitText, (!isValid || isSubmitting) && styles.submitTextDisabled]}>
            {isSubmitting ? '제출 중...' : '제출'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo Section - Improved UI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사진</Text>
          <Text style={styles.sectionHint}>최대 5장까지 추가할 수 있습니다</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoScrollContent}
          >
            {/* Add Photo Buttons — disabled until native rebuild */}
            <TouchableOpacity style={[styles.addPhotoButton, styles.addPhotoDisabled]} onPress={takePhoto}>
              <View style={styles.addPhotoIcon}>
                <Icon name="camera" size={28} color={COLORS.disabledText} />
              </View>
              <Text style={styles.addPhotoTextDisabled}>카메라</Text>
              <Text style={styles.comingSoonBadge}>준비중</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.addPhotoButton, styles.addPhotoDisabled]} onPress={pickImage}>
              <View style={styles.addPhotoIcon}>
                <Icon name="image" size={28} color={COLORS.disabledText} />
              </View>
              <Text style={styles.addPhotoTextDisabled}>갤러리</Text>
              <Text style={styles.comingSoonBadge}>준비중</Text>
            </TouchableOpacity>

            {/* Preview Images */}
            {images.map((uri, index) => (
              <View key={index} style={styles.photoPreview}>
                <Image source={{ uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => removeImage(index)}
                >
                  <Icon name="close" size={14} color={COLORS.textInverse} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>공간 이름 *</Text>
          <TextInput
            style={[styles.input, showErrors && !name && styles.inputError]}
            value={name}
            onChangeText={setName}
            placeholder="예: 카페 오닉스"
            placeholderTextColor={COLORS.textLight}
          />
          {showErrors && !name && <Text style={styles.errorText}>이름을 입력해주세요</Text>}
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카테고리 *</Text>
          {showErrors && !category && <Text style={styles.errorText}>카테고리를 선택해주세요</Text>}
          <View style={styles.categoryGrid}>
            {CATEGORY_LIST.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  category === cat.id && { backgroundColor: cat.color, borderColor: cat.color },
                ]}
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCategory(cat.id);
                }}
              >
                <Icon
                  name={cat.icon as any}
                  size={20}
                  color={category === cat.id ? COLORS.coal : cat.color}
                />
                <Text
                  style={[
                    styles.categoryText,
                    { color: category === cat.id ? COLORS.coal : cat.color },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu & Price - Only for cafe/restaurant */}
        {showsMenuPrice && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>대표 메뉴 & 가격</Text>
              {menuItems.length < 5 && (
                <TouchableOpacity onPress={addMenuItem}>
                  <Text style={styles.addButton}>+ 추가</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.sectionHint}>가격은 원 단위로 입력해주세요</Text>

            {menuItems.map((item, index) => (
              <View key={index} style={styles.menuItemRow}>
                <TextInput
                  style={[styles.input, styles.menuNameInput]}
                  value={item.name}
                  onChangeText={(text) => updateMenuItem(index, 'name', text)}
                  placeholder="메뉴명"
                  placeholderTextColor={COLORS.textLight}
                />
                <TextInput
                  style={[styles.input, styles.menuPriceInput]}
                  value={item.price}
                  onChangeText={(text) => updateMenuItem(index, 'price', text)}
                  placeholder="가격"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="numeric"
                />
                {menuItems.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeMenuButton}
                    onPress={() => removeMenuItem(index)}
                  >
                    <Icon name="close" size={18} color={COLORS.textLight} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* City/Region */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>지역 *</Text>
          {showErrors && !regionId && <Text style={styles.errorText}>지역을 선택해주세요</Text>}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryGrid}
          >
            {regions.filter(r => !r.parent_id).map((region) => (
              <TouchableOpacity
                key={region.id}
                style={[
                  styles.categoryButton,
                  regionId === region.id && { backgroundColor: COLORS.coal, borderColor: COLORS.coal },
                ]}
                onPress={async () => {
                  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setCity(region.name);
                  setRegionId(region.id);
                }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: regionId === region.id ? COLORS.bone : COLORS.text },
                  ]}
                >
                  {region.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주소 (선택)</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="예: 서울시 성수동 123-45"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Vibe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>분위기 설명 (선택)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={vibe}
            onChangeText={setVibe}
            placeholder="이 공간의 분위기를 설명해주세요..."
            placeholderTextColor={COLORS.textLight}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Notice */}
        <View style={styles.notice}>
          <Icon name="check" size={16} color={COLORS.textLight} />
          <Text style={styles.noticeText}>
            제출된 리뷰는 관리자 승인 후 공개됩니다
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bone,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.xl + SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.coal,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.bone,
  },
  submitButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.coal,
    borderRadius: 16,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  submitText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.bone,
  },
  submitTextDisabled: {
    color: COLORS.textLight,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  sectionHint: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  addButton: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: CATEGORIES.cafe.color,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  // Photo section styles
  photoScrollContent: {
    paddingVertical: SPACING.xs,
    gap: SPACING.sm,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIcon: {
    marginBottom: SPACING.xs,
  },
  addPhotoDisabled: {
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.surfaceElevated,
    opacity: 0.7,
  },
  addPhotoTextDisabled: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.disabledText,
  },
  comingSoonBadge: {
    fontSize: TYPOGRAPHY.sizes.xxs,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.textInverse,
    backgroundColor: COLORS.disabledText,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 2,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Input styles
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.borderFocus,
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.borderFocus,
    marginTop: 4,
    marginBottom: 2,
  },
  textArea: {
    height: 100,
    paddingTop: SPACING.sm,
  },
  // Menu item styles
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  menuNameInput: {
    flex: 2,
    marginBottom: 0,
  },
  menuPriceInput: {
    flex: 1,
    marginBottom: 0,
  },
  removeMenuButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Category styles
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noticeText: {
    fontSize: TYPOGRAPHY.sizes.meta,
    color: COLORS.textLight,
    flex: 1,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
  // Login required styles
  loginRequired: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loginTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.text,
    marginTop: SPACING.lg,
  },
  loginDesc: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: COLORS.coal,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.lg,
  },
  loginButtonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semiBold,
    color: COLORS.bone,
  },
});
