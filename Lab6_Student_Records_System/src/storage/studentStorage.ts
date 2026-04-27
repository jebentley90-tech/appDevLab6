import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentRecord } from '../types/student';

const STORAGE_KEY = 'lab6_students';

export async function saveStudents(students: StudentRecord[]) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export async function loadStudents(): Promise<StudentRecord[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if(!raw) return [];

    try {
        return JSON.parse(raw) as StudentRecord[];
    } catch {
        return [];
    }
}

export async function clearStudentsStorage() {
    await AsyncStorage.removeItem(STORAGE_KEY);
}