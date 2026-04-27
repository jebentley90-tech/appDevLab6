import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { StudentRecord } from '../types/student';
import { getStudentSummary } from '../utils/studentLogic';
import { StatusBadge } from './StatusBadge';

 type Props = {
    student: StudentRecord;
    onEdit: () => void;
    onDelete: () => void;
 };

 export function StudentCard({ student, onEdit, onDelete }: Props) {
    const summary = getStudentSummary(student);

    return (
        <View  
            style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 2,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: '700' }}>{student.name}</Text>
            <Text style={{ marginTop: 4, color: '#555' }}>
                {student.studentId} --- {student.major}
            </Text>
            <Text style={{marginTop: 8 }}>GPA: {student.gpa.toFixed(2)}</Text>
            <Text>Units: {student.units}</Text>
            <Text>Graduation Year: {student.gradYear}</Text>
            <Text>Unpaid Dues: ${student.unpaidDues.toFixed(2)}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                <StatusBadge label={summary.standing} tone={summary.standing === 'Dismissal' ? 'danger' : 'success'} />
                <StatusBadge label={summary.load} tone="default" />
                <StatusBadge label={`Risk: ${summary.risk}`} tone={summary.risk === 'High' ? 'danger' : summary.risk === 'Medium' ? 'warning' : 'success'} />
                {summary.hold && <StatusBadge label="Registration Hold" tone="warning" />}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 12, gap: 12 }}>
                <Pressable onPress={onEdit}>
                    <Text style={{ color: '#DC2626', fontWeight: '600' }}>Delete</Text>
                </Pressable>
            </View>

        </View>
    )
 }