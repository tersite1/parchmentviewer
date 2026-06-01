import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Haptics from './src/utils/haptics';
import { storage } from './src/utils/storage';

import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { BookmarksScreen } from './src/screens/BookmarksScreen';
import { AddReviewScreen } from './src/screens/AddReviewScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { Icon } from './src/components/Icon';
import { Logo } from './src/components/Logo';
import { CenterActionSheet } from './src/components/CenterActionSheet';
import { COLORS, SPACING, TYPOGRAPHY } from './src/config/constants';
import { useAuthStore } from './src/stores/authStore';
import { useLanguageStore } from './src/stores/languageStore';

function CenterTabPlaceholder() {
  return <View style={{ flex: 1, backgroundColor: COLORS.coal }} />;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.bone,
    card: COLORS.bone,
    text: COLORS.text,
    border: COLORS.border,
    primary: COLORS.coal,
  },
};

function TabNavigator() {
  const navigation = useNavigation<any>();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            height: 80,
            paddingBottom: SPACING.lg,
            paddingTop: SPACING.sm,
          },
          tabBarActiveTintColor: COLORS.coal,
          tabBarInactiveTintColor: COLORS.tabInactive,
          tabBarLabelStyle: {
            fontSize: TYPOGRAPHY.sizes.xs,
            fontWeight: TYPOGRAPHY.weights.medium,
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="홈"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="home" size={22} color={color} />,
          }}
          listeners={{
            tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
          }}
        />
        <Tab.Screen
          name="북마크"
          component={BookmarksScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="bookmark" size={22} color={color} />,
          }}
          listeners={{
            tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
          }}
        />
        <Tab.Screen
          name="추가"
          component={CenterTabPlaceholder}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.addButton, focused && styles.addButtonActive]}>
                <Icon name="plus" size={24} color={focused ? COLORS.coal : COLORS.bone} />
              </View>
            ),
            tabBarLabel: () => null,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setSheetOpen(true);
            },
          }}
        />
        <Tab.Screen
          name="검색"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="search" size={22} color={color} />,
          }}
          listeners={{
            tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
          }}
        />
        <Tab.Screen
          name="프로필"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="user" size={22} color={color} />,
          }}
          listeners={{
            tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
          }}
        />
      </Tab.Navigator>

      <CenterActionSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onChat={() => {
          setSheetOpen(false);
          navigation.navigate('Chat');
        }}
        onAddPlace={() => {
          setSheetOpen(false);
          navigation.navigate('AddReview');
        }}
      />
    </>
  );
}

export default function App() {
  const { initialize: initAuth } = useAuthStore();
  const { loadLanguage } = useLanguageStore();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Initialize auth and settings on app start
    initAuth();
    loadLanguage();
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    const completed = await storage.getItem('onboardingComplete');
    setShowOnboarding(completed !== 'true');
  };

  // Show branded splash while checking onboarding status
  if (showOnboarding === null) {
    return (
      <GestureHandlerRootView style={styles.splash}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.coal} />
        <Logo size={88} />
      </GestureHandlerRootView>
    );
  }

  // Show onboarding if not completed
  if (showOnboarding) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.coal} />
        <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.coal} />
      <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.coal,
            },
            headerTintColor: COLORS.bone,
            headerTitleStyle: {
              fontSize: TYPOGRAPHY.sizes.body,
              fontWeight: TYPOGRAPHY.weights.light,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: 'MAP',
            }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: 'ABOUT',
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="AddReview"
            component={AddReviewScreen}
            options={{
              title: '장소·리뷰 추가',
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: COLORS.coal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.graphite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  addButtonActive: {
    backgroundColor: COLORS.bone,
  },
});
