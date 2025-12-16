import React, { useState } from 'react';
import { User, UserRole } from './types';
import Login from './components/Login';
import Layout from './components/Layout';
import StudentDashboard from './components/DashboardStudent';
import TeacherDashboard from './components/DashboardTeacher';
import AdminDashboard from './components/DashboardAdmin';

// Mock user data generator based on role
const getMockUser = (role: UserRole): User => {
  switch (role) {
    case UserRole.ADMIN:
      return {
        id: 'admin-1',
        name: 'Admin Yusuf',
        role: UserRole.ADMIN,
        avatar: 'https://picsum.photos/200/200?random=1'
      };
    case UserRole.TEACHER:
      return {
        id: 'teacher-1',
        name: 'Sheikh Abdullah',
        role: UserRole.TEACHER,
        avatar: 'https://picsum.photos/200/200?random=2'
      };
    case UserRole.STUDENT:
      return {
        id: 'student-1',
        name: 'Omar Khalid',
        role: UserRole.STUDENT,
        avatar: 'https://picsum.photos/200/200?random=3'
      };
  }
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole) => {
    // In a real app, this would involve API calls and authentication tokens
    setUser(getMockUser(role));
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {user.role === UserRole.STUDENT && <StudentDashboard />}
      {user.role === UserRole.TEACHER && <TeacherDashboard />}
      {user.role === UserRole.ADMIN && <AdminDashboard />}
    </Layout>
  );
};

export default App;
