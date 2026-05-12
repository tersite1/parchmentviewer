import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../config/constants';
import { Icon } from './Icon';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddPlace: () => void;
  onChat: () => void;
}

export function CenterActionSheet({ visible, onClose, onAddPlace, onChat }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={s.sheet} onPress={(e) => e.stopPropagation?.()}>
          <View style={s.handle} />
          <Text style={s.title}>무엇을 할까요?</Text>

          <TouchableOpacity style={s.row} onPress={onChat} activeOpacity={0.85}>
            <View style={[s.iconBox, { backgroundColor: COLORS.bone }]}>
              <Icon name="sparkle" size={22} color={COLORS.coal} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>큐레이터에게 물어보기</Text>
              <Text style={s.rowDesc}>어디로 떠나고 싶은지 말해보세요</Text>
            </View>
            <Icon name="chevronRight" size={18} color={COLORS.tabInactive} />
          </TouchableOpacity>

          <TouchableOpacity style={s.row} onPress={onAddPlace} activeOpacity={0.85}>
            <View style={[s.iconBox, { backgroundColor: COLORS.bone }]}>
              <Icon name="plus" size={22} color={COLORS.coal} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>장소·리뷰 추가</Text>
              <Text style={s.rowDesc}>방문한 공간을 큐레이션에 더하기</Text>
            </View>
            <Icon name="chevronRight" size={18} color={COLORS.tabInactive} />
          </TouchableOpacity>

          <TouchableOpacity style={s.cancel} onPress={onClose} activeOpacity={0.7}>
            <Text style={s.cancelText}>취소</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.overlayStrong,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.coal,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl + SPACING.lg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: SPACING.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.graphite,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.bone,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.obsidian,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassHint,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    color: COLORS.bone,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  rowDesc: {
    color: COLORS.tabInactive,
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: 2,
  },
  cancel: {
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  cancelText: {
    color: COLORS.tabInactive,
    fontSize: TYPOGRAPHY.sizes.body,
  },
});
