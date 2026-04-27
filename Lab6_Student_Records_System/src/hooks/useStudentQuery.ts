import { useMemo } from 'react';
import { StudentRecord } from '../types/student';
import { getAcademicStanding, getEnrollmentLoad, getRiskLevel, hasRegistrationHold } from '../utils/studentLogic';

export type StudentSortKey = 'name' | 'gpa' | 'age' | 'gradYear' | 'units';

export type StudentFilters = {
    major: string;
    standing: string;
    load: string;
    holdOnly: boolean;
    risk: string;
};

export function useStudentQuery(
    students: StudentRecord[],
    search: string,
    filters: StudentFilters,
    sortKey: StudentSortKey,
) {
    return useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        const filtered = students.filter((student) => {
            if(!normalizedSearch) return true;

            return [student.name, student.studentId, student.major]
            .join(' ').toLowerCase().includes(normalizedSearch);
        })
        .filter((student) => {
            if(filters.major && student.major !== filters.major) return false;
            if(filters.standing && getAcademicStanding(student) !== filters.standing) return false;
            if(filters.load && getEnrollmentLoad(student) !== filters.load) return false;
            if(filters.risk && getRiskLevel(student) !== filters.risk) return false;
            if(filters.holdOnly && !hasRegistrationHold(student)) return false;

            return true;
        })
        .sort((a, b) => {
            switch(sortKey) {
                case 'gpa':
                    return b.gpa - a.gpa;
                case 'age':
                    return a.age - b.age;
                case 'gradYear':
                    return a.gradYear - b.gradYear;
                case 'units':
                    return b.units - a.units;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
        return filtered;
    }, [students, search, filters, sortKey]);
}