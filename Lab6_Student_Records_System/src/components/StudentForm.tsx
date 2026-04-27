import React, { useMemo, useState } from 'react';
import { Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import { StudentRecord, StudentFormValues } from '../types/student';
import { studentFormToStudent, studentToFormValues, validateStudent } from '../utils/validation';

type Props = {
    existingStudents: StudentRecord[];
    initialStudent?: StudentRecord;
    onSubmit: (student: StudentRecord) => void;
};

function Field({
    label,
    value,
    onChangeText,
    error,
    keyboardType = 'default',
} : {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    keyboardType?: 'default' | 'numeric' | 'decimal-pad';
}) {
    return (
        <View style={{ marginBottom: 14 }}>
            <Text style={{ marginBottom: 6, fontWeight: '600' }}>{label}</Text>
            <TextInput 
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                style={{
                    borderWidth: 1,
                    borderColor: error ? '#DC2626' : '#D1D5DB',
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                }}
            />
            {error ? <Text style={{ color: '#DC2626', marginTop: 4 }}>{error}</Text> : null}
        </View>
    );
}

export function StudentForm({ existingStudents, initialStudent, onSubmit } : Props) {
    const [values, setValues] = useState<StudentFormValues>(studentToFormValues(initialStudent));
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const errors = useMemo(
        () => validateStudent(values, existingStudents, initialStudent?.id),
        [values, existingStudents, initialStudent?.id]
    );

    const updateField = (key: keyof StudentFormValues, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value}));
        setTouched((prev) => ({ ...prev, [key]: true }));
    };

    const handleSave = () => {
        const hasErrors = Object.keys(errors).length > 0;
        if(hasErrors) {
            setTouched({
                name: true,
                studentId: true,
                age: true,
                gpa: true,
                major: true,
                units: true,
                gradYear: true,
                unpaidDues: true,
            });
            return;
        }

        onSubmit(studentFormToStudent(values, initialStudent?.id));
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Field label="Name" value={values.name} onChangeText={(text) => updateField('name', text)} error={touched.name ? errors.name : undefined} />
            <Field label="Student ID" value={values.studentId} onChangeText={(text) => updateField('studentId', text)} error={touched.studentId ? errors.studentId : undefined} />
            <Field label="Age" value={values.age} onChangeText={(text) => updateField('age', text)} error={touched.age ? errors.age : undefined} keyboardType="numeric" />
            <Field label="GPA" value={values.gpa} onChangeText={(text) => updateField('gpa', text)} error={touched.gpa ? errors.gpa : undefined} keyboardType="decimal-pad" />
            <Field label="Major" value={values.major} onChangeText={(text) => updateField('major', text)} error={touched.major ? errors.major : undefined} />
            <Field label="Units" value={values.units} onChangeText={(text) => updateField('units', text)} error={touched.units ? errors.units : undefined} keyboardType="numeric" />
            <Field label="Graduation Year" value={values.gradYear} onChangeText={(text) => updateField('gradYear', text)} error={touched.graduation ? errors.gradYear : undefined} keyboardType="numeric" />
            <Field label="Unpaid Dues" value={values.unpaidDues} onChangeText={(text) => updateField('unpaidDues', text)} error={touched.unpaidDues ? errors.unpaidDues : undefined} keyboardType="decimal-pad" />
            
            <Pressable
                onPress={handleSave}
                style={{
                    backgroundColor: '#111827',
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                    marginTop: 10,
                }}
            >
                <Text style={{ color: 'white', fontWeight: '700' }}>
                    {initialStudent ? 'Save Changes' : 'Add Student'}
                </Text>
            </Pressable>
        </ScrollView>
    );
}