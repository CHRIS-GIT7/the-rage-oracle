import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AssessmentForm } from './components/AssessmentForm';
import { ProcessingView } from './components/ProcessingView';
import { ReportView } from './components/ReportView';
import { ReportSkeletonLoader } from './components/ReportSkeletonLoader';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { AssessmentSubmission } from './types';
import { SAMPLE_ASSESSMENTS } from './data/sampleAssessments';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'processing' | 'report' | 'admin' | 'admin_login'>(() =>
    window.location.pathname === '/admin' ? 'admin_login' : 'landing'
  );
  const [activeSubmission, setActiveSubmission] = useState<AssessmentSubmission | null>(null);
  const [pendingBrandName, setPendingBrandName] = useState<string>('');
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Start new assessment cleanly
  const handleStartAssessment = () => {
    setActiveSubmission(null);
    setPendingBrandName('');
    setSubmissionError(null);
    try {
      localStorage.removeItem('brand_oracle_draft_v1');
    } catch {}
    setCurrentView('assessment');
  };

  // Form submission handler
  const handleFormSubmit = async (formData: Omit<AssessmentSubmission, 'id' | 'createdAt' | 'status' | 'emailStatus'>): Promise<boolean> => {
    setPendingBrandName(formData.business.brandName);
    setActiveSubmission(null); // Clear previous submission to ensure skeleton loader shows until ready
    setCurrentView('processing');

    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success || !data.assessment) {
        throw new Error(data.error || 'We couldn’t prepare your report. Your answers are saved in this browser; please try again.');
      }
      if (data.success && data.assessment) {
        setActiveSubmission(data.assessment);
        setCurrentView('report');
      }
      setSubmissionError(null);
      return true;
    } catch (error) {
      console.error('Assessment submission failed:', error);
      setSubmissionError(error instanceof Error ? error.message : 'We couldn’t prepare your report. Please try again.');
      setCurrentView('assessment');
      return false;
    }
  };

  const handleOpenSampleReport = (assessmentId = SAMPLE_ASSESSMENTS[0].id) => {
    const sample = SAMPLE_ASSESSMENTS.find(item => item.id === assessmentId) || SAMPLE_ASSESSMENTS[0];
    setActiveSubmission(sample);
    setCurrentView('report');
  };

  const handleNavigate = (view: 'landing' | 'assessment' | 'admin' | 'admin_login') => {
    if (view === 'assessment') {
      handleStartAssessment();
    } else if (view === 'admin' && !isAdminLoggedIn) {
      setCurrentView('admin_login');
    } else {
      setCurrentView(view);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentView('admin');
  };

  const handleLogoutAdmin = async () => {
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      if (!response.ok) throw new Error('The admin session could not be cleared.');
      setIsAdminLoggedIn(false);
      setCurrentView('landing');
    } catch (error) {
      console.error('Admin logout failed:', error);
    }
  };

  const handleViewReportFromAdmin = (submission: AssessmentSubmission) => {
    setActiveSubmission(submission);
    setCurrentView('report');
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] flex flex-col font-sans">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSampleReport={handleOpenSampleReport}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogoutAdmin}
      />

      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartAssessment={handleStartAssessment}
            onOpenSampleReport={handleOpenSampleReport}
          />
        )}

        {currentView === 'assessment' && (
          <AssessmentForm
            onSubmit={handleFormSubmit}
            onCancel={() => setCurrentView('landing')}
            submissionError={submissionError}
          />
        )}

        {currentView === 'processing' && (
          <ProcessingView brandName={pendingBrandName} />
        )}

        {currentView === 'report' && (
          activeSubmission && activeSubmission.analysis ? (
            <ReportView
              submission={activeSubmission}
              onBackToMain={() => setCurrentView('landing')}
            />
          ) : (
            <ReportSkeletonLoader brandName={pendingBrandName || activeSubmission?.business?.brandName} />
          )
        )}

        {currentView === 'admin_login' && (
          <AdminLogin
            onLoginSuccess={handleAdminLoginSuccess}
            onCancel={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            onViewReport={handleViewReportFromAdmin}
          />
        )}
      </main>

      {currentView !== 'report' && currentView !== 'admin' && <Footer />}
    </div>
  );
}

export default App;
