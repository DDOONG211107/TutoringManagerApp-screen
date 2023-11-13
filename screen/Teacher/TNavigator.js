import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CalendarScreen from './CalendarScreen.js';
import ChatStackScreen from './ChatStackScreen.js';
import MatchingStackScreen from './MatchingScreen.js';
import ClassListScreen from './ClassListScreen.js';
import MyPageStackScreen from './MyPageScreen.js';
import style from '../style.js';

const Tab = createBottomTabNavigator();

const fontAwesomeTabBarIcon = ({ focused, name }) => {
  return (
    <FontAwesome
      name={name}
      size={26}
      color={focused ? style.colorList.blue : '#d5d5d5'}
    ></FontAwesome>
  );
};

const materialIconsTabBarIcon = ({ focused, name }) => {
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? style.colorList.blue : '#d5d5d5'}
    ></MaterialIcons>
  );
};

const MyTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            fontAwesomeTabBarIcon({
              focused,
              name: 'calendar',
            }),
        }}
        name='Calendar'
        component={CalendarScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            materialIconsTabBarIcon({
              focused,
              name: focused ? 'person-add-alt-1' : 'person-add-alt',
            }),
        }}
        name='Matching'
        component={MatchingStackScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            materialIconsTabBarIcon({
              focused,
              name: focused ? 'chat-bubble' : 'chat-bubble-outline',
            }),
        }}
        name='Chat'
        component={ChatStackScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            materialIconsTabBarIcon({
              focused,
              name: 'menu-book',
            }),
        }}
        name='ClassList'
        component={ClassListScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            materialIconsTabBarIcon({
              focused,
              name: focused ? 'person' : 'person-outline',
            }),
        }}
        name='MyPage'
        component={MyPageStackScreen}
      />
    </Tab.Navigator>
  );
};

export default TNavigator = () => {
  return <MyTab />;
};
