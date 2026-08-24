import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';
import RegionsScreen from '../screens/RegionsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import CustomDrawerContent from './CustomDrawerContent';

// Import icon assets directly from assets folder
const pokeballIcon = require('../../assets/pokeball-icon.png');
const pokepinIcon = require('../../assets/pokepin-icon.png');
const pokeheartIcon = require('../../assets/pokeheart-icon.png');
const profileIcon = require('../../assets/profile-icon.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator with Pokédex, Regions, Favorites, and Profile
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#185A9D',
        tabBarInactiveTintColor: '#8C9DAE',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="PokedexTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Pokédex',
          tabBarIcon: ({ focused }) => (
            <Image
              source={pokeballIcon}
              style={[
                styles.tabIcon,
                !focused && styles.inactiveTabIcon,
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="RegionsTab"
        component={RegionsScreen}
        options={{
          tabBarLabel: 'Regiões',
          tabBarIcon: ({ focused }) => (
            <Image
              source={pokepinIcon}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#185A9D' : '#8C9DAE' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <Image
              source={pokeheartIcon}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#185A9D' : '#8C9DAE' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Image
              source={profileIcon}
              style={[
                styles.tabIcon,
                { tintColor: focused ? '#185A9D' : '#8C9DAE' },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator wrapping the Bottom Tabs and drawer screens
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#EFF6FF',
        drawerActiveTintColor: '#1E6091',
        drawerInactiveTintColor: '#475569',
        drawerLabelStyle: {
          fontWeight: '700',
          fontSize: 14,
          marginLeft: -10,
        },
        drawerItemStyle: {
          borderRadius: 12,
          paddingVertical: 2,
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="PokedexMain"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Pokédex Kanto',
          drawerIcon: ({ color, size }) => (
            <Image
              source={pokeballIcon}
              style={styles.drawerIcon}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Image
              source={profileIcon}
              style={[styles.drawerIcon, { tintColor: color }]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{
          drawerLabel: 'Ajuda e Suporte',
          drawerIcon: ({ color, size }) => (
            <Image
              source={pokeheartIcon}
              style={[styles.drawerIcon, { tintColor: color }]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Main Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetailsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 26,
    height: 26,
  },
  inactiveTabIcon: {
    tintColor: '#8C9DAE',
    opacity: 0.8,
  },
  drawerIcon: {
    width: 22,
    height: 22,
  },
});
