import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStudents } from '../context/StudentContext';
import { StudentCard } from '../components/StudentCard';
import { getRiskLevel, hasRegistrationHold } from '../utils/studentLogic';

export function RiskScreen() {
    const navigation = useNavigation<any>();
    const { students, deleteStudent } = useStudents();

    const flaggedStudents = students.filter(
        (student) => hasRegistrationHold(student) || getRiskLevel(student) !== 'Low'
    );

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: '#F5F7FB' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 12 }}>Risks & Holds</Text>

            <FlatList
                data={flaggedStudents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StudentCard
                        student={item}
                        onEdit={() => navigation.navigate('StudentForm', { studentId: item.id })}
                        onDelete={() => deleteStudent(item.id)}
                    />
                )}
                ListEmptyComponent={<Text>No at-risk students right now!</Text>}
            />
        </View>
    );
}