import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import DashboardContent from './DashboardContent';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <DashboardContent />
    </Layout>
  );
};

export default Dashboard;