import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { RiskScreen } from '../screens/RiskScreen';
import { StudentFormScreen } from '../screens/StudentFormScreen';
import { StudentsScreen } from '../screens/StudentsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Students" component={StudentsScreen} />
            <Tab.Screen name="Analytics" component={AnalyticsScreen} />
            <Tab.Screen name="Risks" component={RiskScreen} />
        </Tab.Navigator>
    );
}

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeTabs" component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen
                    name="StudentForm"
                    component={StudentFormScreen}
                    options={{
                        title: 'Student Form',
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}