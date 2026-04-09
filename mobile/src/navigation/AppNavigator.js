import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AccueilScreen from '../screens/AccueilScreen';
import InscriptionScreen from '../screens/InscriptionScreen';
import DashboardScreen from '../screens/DashboardScreen';
import QuizScreen from '../screens/QuizScreen';
import PanneauxScreen from '../screens/PanneauxScreen';
import AdminScreen from '../screens/AdminScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ResultatsScreen from '../screens/ResultatsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MesCours') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Quiz') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          } else if (route.name === 'Panneaux') {
            iconName = focused ? 'warning' : 'warning-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1d4ed8',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={AccueilScreen}
        options={{ tabBarLabel: 'Accueil' }}
      />
      <Tab.Screen
        name="MesCours"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Mes Cours' }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ tabBarLabel: 'Quiz' }}
      />
      <Tab.Screen
        name="Panneaux"
        component={PanneauxScreen}
        options={{ tabBarLabel: 'Panneaux' }}
      />
      <Tab.Screen
        name="Profil"
        component={ResultatsScreen}
        options={{ tabBarLabel: 'Résultats' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
