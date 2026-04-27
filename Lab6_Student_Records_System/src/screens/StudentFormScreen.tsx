import React from 'react';
import { View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StudentForm } from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';

export function StudentFormScreen() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { students, addStudent, updateStudent } = useStudents();

    const editingStudent = students.find((student) => student.id === route.params?.studentId);

    return (
        <View style={{flex: 1, backgroundColor: '#F5F7FB'}}>
            <StudentForm
                existingStudents={students}
                initialStudent={editingStudent}
                onSubmit={(student) => {
                    if(editingStudent) {
                        updateStudent(student);
                    } else {
                        addStudent(student);
                    }
                    navigation.goBack();
                }}
            />
        </View>
    );
}