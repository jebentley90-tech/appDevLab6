import { StudentRecord, StudentFormValues, StudentValidationErrors } from '../types/student';

export function validateStudent(
    values: StudentFormValues,
    existingStudents: StudentRecord[],
    editingId?: string
) : StudentValidationErrors {
    const errors: StudentValidationErrors = {};
    const currentYear = new Date().getFullYear();

    const age = Number(values.age);
    const gpa = Number(values.gpa);
    const units = Number(values.units);
    const gradYear = Number(values.gradYear);
    const unpaidDues = Number(values.unpaidDues);

    if(!values.name.trim() || values.name.trim().length < 2) {
        errors.studentId = 'Name must be at least 2 characters.';
    }

    if(!values.studentId.trim()) {
        errors.studentId = 'Student ID required.';
    } else {
        const duplicate = existingStudents.find(
            (student) =>
                student.studentId.toLowerCase() === values.studentId.trim().toLowerCase() &&
                student.id !== editingId
        );

        if(duplicate) {
            errors.studentId = 'Student ID must be unique.';
        }
    }

    if(!Number.isFinite(age) || age < 16 || age > 100) {
        errors.age = 'Age must be between 16 and 100.';
    }

    if(!Number.isFinite(gpa) || gpa < 0 || gpa > 4) {
        errors.gpa = 'GPA must be between 0.0 and 4.0';
    }

    if(!values.major.trim()) {
        errors.major = 'Major is required.';
    }

    if(!Number.isFinite(units) || units < 0 || units > 24) {
        errors.units = 'Units must be between 0 and 24.';
    }

    if(
        !Number.isFinite(gradYear) ||
        gradYear < currentYear ||
        gradYear > currentYear + 10
    ) {
        errors.gradYear = 'Graduation year must be between ${currentYear} and ${currentYear + 10}.';
    }

    if (!Number.isFinite(unpaidDues) || unpaidDues < 0) {
        errors.unpaidDues = 'Unpaid dues cannot be negative.';
    }

    return errors;
}

export function studentFormToStudent(values: StudentFormValues, existingId?: string): StudentRecord {
    return {
        id: existingId ?? Date.now().toString(),
        name: values.name.trim(),
        studentId: values.studentId.trim(),
        age: Number(values.age),
        gpa: Number(values.gpa),
        major: values.major.trim(),
        units: Number(values.units),
        gradYear: Number(values.gradYear),
        unpaidDues: Number(values.unpaidDues),
    };
}

export function studentToFormValues(student?: StudentRecord): StudentFormValues {
    return {
        name: student?.name ?? '',
        studentId: student?.studentId ?? '',
        age: student ? String(student.age) : '',
        gpa: student ? String(student.gpa) : '',
        major: student?.major ?? '',
        units: student ? String(student.units) : '',
        gradYear: student ? String(student.gradYear) : '',
        unpaidDues: student ? String(student.unpaidDues) : '0',
    };
}
