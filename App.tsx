import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
import { Icon } from './src/components/Icon';
import { COLORS, SPACING } from './src/config/constants';
import { useAuthStore } from './src/stores/authStore';
import { useLanguageStore } from './src/stores/languageStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.bone,
    card: COLORS.bone,
    text: COLORS.text || '#2A2A2A',
    border: '#E0E0E0',
    primary: COLORS.coal,
  },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: SPACING.lg,
          paddingTop: SPACING.sm,
        },
        tabBarActiveTintColor: COLORS.coal,
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={22} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
      <Tab.Screen
        name="북마크"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark" size={22} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
      <Tab.Screen
        name="추가"
        component={AddReviewScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.addButton, focused && styles.addButtonActive]}>
              <Icon name="plus" size={24} color={focused ? COLORS.coal : COLORS.bone} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
        }}
      />
      <Tab.Screen
        name="검색"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={22} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
      <Tab.Screen
        name="프로필"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={22} color={color} />
          ),
        }}
        listeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
    </Tab.Navigator>
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

  // Show nothing while checking onboarding status
  if (showOnboarding === null) {
    return (
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.coal }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.coal} />
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
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.coal,
            },
            headerTintColor: COLORS.bone,
            headerTitleStyle: {
              fontSize: 14,
              fontWeight: '300',
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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
