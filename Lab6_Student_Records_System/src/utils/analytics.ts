import { StudentRecord } from "../types/student";
import { getAcademicStanding, hasRegistrationHold } from './studentLogic';

export function getAnalytics(students: StudentRecord[]) {
    const totalStudents = students.length;
    const averageGPA = 
        totalStudents === 0
            ? 0
            : students.reduce((sum, student) => sum + student.gpa, 0) / totalStudents;

    const highestPerformingStudent = students.reduce<StudentRecord | null>((best, current) => {
        if(!best || current.gpa > best.gpa) return current;
        return best;
    }, null);

    const standingDistribution = students.reduce<Record<string, number>>((acc, student) => {
        const standing = getAcademicStanding(student);
        acc[standing] = (acc[standing] ?? 0) + 1;
        return acc;
    }, {});

    const holdCount = students.filter(hasRegistrationHold).length;

    const byMajor = students.reduce<Record<string, { count: number; totalGPA: number }>>((acc, student) => {
        const key = student.major;
        if(!acc[key]) {
            acc[key] = { count: 0, totalGPA: 0 };
        }

        acc[key].count += 1;
        acc[key].totalGPA += student.gpa;
        return acc;
    }, {});

    const majorStats = Object.entries(byMajor).map(([major, data]) => ({
        major,
        count: data.count,
        averageGPA: Number((data.totalGPA / data.count).toFixed(2)),
    }));

    return {
        totalStudents,
        averageGPA: Number(averageGPA.toFixed(2)),
        highestPerformingStudent,
        standingDistribution,
        holdCount,
        majorStats,
    };
}