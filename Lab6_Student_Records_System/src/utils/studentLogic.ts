import { StudentRecord, AcademicStanding, EnrollmentLoad, RiskLevel } from "../types/student";

export function getAcademicStanding(student: StudentRecord) : AcademicStanding {
    if (student.gpa >= 3.5) return 'Excellent';
    if (student.gpa >= 2.0) return 'Good';
    if (student.gpa >= 1.0) return 'Probation';
    return 'Dismissal';
}

export function getEnrollmentLoad(student: StudentRecord) : EnrollmentLoad {
    if (student.units >= 12) return 'Full-Time';
    if (student.units >= 6) return 'Part-Time';
    return 'Underloaded';
}

export function hasRegistrationHold(student: StudentRecord) : boolean {
    const standing = getAcademicStanding(student);
    const hasFinancialHold = student.unpaidDues > 0;
    const hasAcademicHold = standing === 'Dismissal';
    return hasFinancialHold || hasAcademicHold;
}

export function getRiskLevel(student: StudentRecord) : RiskLevel {
    if (student.gpa < 1.0 || student.unpaidDues > 1000 || student.units < 6) return 'High';
    if (student.gpa < 2.0 || student.unpaidDues > 0) return 'Medium';
    return 'Low';
}

export function getStudentSummary(student: StudentRecord) {
    return {
        standing: getAcademicStanding(student),
        load: getEnrollmentLoad(student),
        hold: hasRegistrationHold(student),
        risk: getRiskLevel(student),
    };
}