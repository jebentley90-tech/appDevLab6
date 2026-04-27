export type StudentRecord = {
    name: string,
    id: string,
    studentId: string,
    age: number,
    gpa: number,
    major: string,
    units: number,
    gradYear: number,
    unpaidDues: number
};

export type AcademicStanding = 'Excellent' | 'Good' | 'Probation' | 'Dismissal';
export type EnrollmentLoad = 'Full-Time' | 'Part-Time' | 'Underloaded';
export type RiskLevel = 'Low' | 'Medium' | 'High'

export type StudentFormValues = {
    name: string;
    studentId: string;
    age: string;
    gpa: string;
    major: string;
    units: string;
    gradYear: string;
    unpaidDues: string;
};

export type StudentValidationErrors = Partial<Record<keyof StudentFormValues, string>>;