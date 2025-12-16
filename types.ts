export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  schedule: string;
  progress?: number; // For students
  studentsCount?: number; // For teachers/admin
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  grade?: string;
}

export interface Stat {
  name: string;
  value: number;
}

export enum GeminiModel {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview',
}
