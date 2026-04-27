Lab 6 Student Records App
Overview:
This app manages student records while enforcing general validation rules. It derive academic status and display analytics based on live student data.

Features
Student Record Management
-Creation of student records -Editing of existing student records -Deletion of student records -Allows viewing of all student records

Each student record includes: -Name -Student ID -Age -GPA -Major -Units -Expected Graduation Year -Unpaid Dues

Validation
The app validates data before saving and during form usage

Academic Logic
The app computes the following dynamically from stored student data: -Academic Standing -Enrollment Load -Registration Holds -Risk Level

Search, Sorting, Filtering
Users are allowed to: -Search by name, student ID, or major -Sort by multiple criteria -Filter by attributes

Multiple Views
-Student Management -Add/Edit student form -Analytics -Risks/Holds

Persistence
The app stores data locally between sessions Can also: -Load sample data -Clear all data

Teck Stack
Uses: -React Native -Expo -React Navigation -AsyncStorage -Context API -useReducer

Installation
Install dependencies: npm install Install Expo-compatible packages if needed: npx expo install @react-native-async-storage/async-storage npx expo install @react-navigation/native npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons npx expo install @react-navigation/bottom-tabs @react-navigation/native-stack

Run with: npx expo start
