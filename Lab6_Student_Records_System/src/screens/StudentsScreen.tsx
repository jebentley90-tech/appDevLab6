import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStudents } from '../context/StudentContext';
import { StudentCard } from '../components/StudentCard';
import { StudentFilters, useStudentQuery } from '../hooks/useStudentQuery';

const defaultFilters: StudentFilters = {
    major: '',
    standing: '',
    load: '',
    holdOnly: false,
    risk: '',
};

export function StudentsScreen() {
    const navigation = useNavigation<any>();
    const { students, deleteStudent, loadSampleData, clearAllData } = useStudents();
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<'name' | 'gpa' | 'age' | 'gradYear' | 'units'>('name');
    const [filters] = useState<StudentFilters>(defaultFilters);

    const filteredStudents = useStudentQuery(students, search, filters, sortKey);
    const majorCount = useMemo(() => new Set(students.map((student) => student.major)).size, [students]);

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: '#F5F7FB' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 8 }}>Students</Text>
            <Text style={{ color: '#555", marginBottom: 12'}}>
                {students.length} records --- {majorCount} majors
            </Text>
            <TextInput
                placeholder="Search by Name, ID, or Major"
                value={search}
                onChangeText={setSearch}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    marginBottom: 12,
                }}
            />

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                <Pressable onPress={() => setSortKey('name')}><Text>Name</Text></Pressable>
                <Pressable onPress={() => setSortKey('gpa')}><Text>GPA</Text></Pressable>
                <Pressable onPress={() => setSortKey('units')}><Text>Units</Text></Pressable>
                <Pressable onPress={loadSampleData}><Text>Load Sample Data</Text></Pressable>
                <Pressable onPress={clearAllData}><Text>Clear All</Text></Pressable>
            </View>

            <Pressable
                onPress={() => navigation.navigate('StudentForm')}
                style={{
                    backgroundColor: '#2563EB',
                    borderRadius: 12,
                    paddingVertical: 12,
                    alignItems: 'center',
                    marginBottom: 12,
                }}
            >
                <Text style={{ color: 'white', fontWeight: '700' }}>Add Student</Text>
            </Pressable>

            <FlatList
                data={filteredStudents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StudentCard
                        student={item}
                        onEdit={() => navigation.navigate('StudentForm', { studentId: item.id})}
                        onDelete={() => deleteStudent(item.id)}
                    />
                )}
            />
        </View>

        
    )
}