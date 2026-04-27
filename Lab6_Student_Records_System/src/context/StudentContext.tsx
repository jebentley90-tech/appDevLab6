import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { StudentRecord } from '../types/student';
import { clearStudentsStorage, loadStudents, saveStudents } from '../storage/studentStorage';
import { sampleStudents } from '../data/sampleStudents';
import { initialStudentState, studentReducer } from './studentReducer';

type StudentContextValue = {
    students: StudentRecord[];
    loaded: boolean;
    addStudent: (student: StudentRecord) => void;
    updateStudent: (student: StudentRecord) => void;
    deleteStudent: (id: string) => void;
    loadSampleData: () => void;
    clearAllData: () => void;
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(studentReducer, initialStudentState);

    useEffect(() => {
        async function initialize() {
            const storedStudents = await loadStudents();
            dispatch({ type: 'SET_STUDENTS', payload: storedStudents});
        }
        initialize();
    }, []);

    useEffect(() => {
        if (!state.loaded) return;
        saveStudents(state.students);
    }, [state.students, state.loaded]);

    const value = useMemo<StudentContextValue>(
        () => ({
            students: state.students,
            loaded: state.loaded,
            addStudent: (student) => dispatch({ type: 'ADD_STUDENT', payload: student }),
            updateStudent: (student) => dispatch({ type: 'UPDATE_STUDENT', payload: student }),
            deleteStudent: (id) => dispatch({ type: 'DELETE_STUDENT', payload: id }),
            loadSampleData: () => dispatch({ type: 'LOAD_SAMPLE_DATA', payload: sampleStudents }),
            clearAllData: () => {
                clearStudentsStorage();
                dispatch({ type: 'CLEAR_ALL_DATA' })
            },
        }),
        [state.students, state.loaded]
    );

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudents() {
    const context = useContext(StudentContext);
    if(!context) {
        throw new Error('useStudents must be used within a StudentProvider');
    }
    return context;
}