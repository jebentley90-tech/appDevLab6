import { StudentRecord } from '../types/student';

type StudentState = {
    students: StudentRecord[];
    loaded: boolean;
};

export type StudentAction =
    | { type: 'SET_STUDENTS'; payload: StudentRecord[] }
    | { type: 'ADD_STUDENT'; payload: StudentRecord }
    | { type: 'UPDATE_STUDENT'; payload: StudentRecord }
    | { type: 'DELETE_STUDENT'; payload: string }
    | { type: 'LOAD_SAMPLE_DATA'; payload: StudentRecord[] }
    | { type: 'CLEAR_ALL_DATA' };

export const initialStudentState: StudentState = {
    students: [],
    loaded: false,
};

export function studentReducer(state: StudentState, action: StudentAction) : StudentState {
    switch (action.type) {
        case 'SET_STUDENTS':
            return {
                students: action.payload,
                loaded: true,
            };
        
        case 'ADD_STUDENT':
            return {
                ...state,
                students: [...state.students, action.payload],
            };

        case 'UPDATE_STUDENT':
            return {
                ...state,
                students: state.students.map((student) =>
                    student.id === action.payload.id ? action.payload : student
                ),
            };

        case 'DELETE_STUDENT':
            return {
                ...state,
                students: state.students.filter((student) => student.id !== action.payload),
            };

        case 'LOAD_SAMPLE_DATA':
            return {
                ...state,
                students: action.payload,
            };

        case 'CLEAR_ALL_DATA':
            return {
                ...state,
                students: [],
            };

        default:
            return state;
    }
}