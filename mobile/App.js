import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions,Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HambergerMenu, Magicpen } from 'iconsax-react-native';
import { BlurView } from 'expo-blur';
import { ArrowLeft2, Scroll,Heart,Pause } from 'iconsax-react-native';
import { ye } from './config/temp';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/Landing';
import { NavigationContainer } from '@react-navigation/native';
import Music from './components/Music';
import GeneratePlay from './components/Generate';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={Landing} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Generate" component={GeneratePlay} />
 
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <MyStack />
  );

}

