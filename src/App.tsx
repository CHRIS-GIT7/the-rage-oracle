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
import { SEEDED_ASSESSMENTS } from './data/seededAssessments';
import { researchBrandWebsite } from './lib/research';
import { analyzeBrandWithGemini } from './lib/gemini';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'processing' | 'report' | 'admin' | 'admin_login'>('landing');
  const [activeSubmission, setActiveSubmission] = useState<AssessmentSubmission | null>(null);
  const [pendingBrandName, setPendingBrandName] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Start new assessment cleanly
  const handleStartAssessment = () => {
    setActiveSubmission(null);
    setPendingBrandName('');
    try {
      localStorage.removeItem('brand_oracle_draft_v1');
    } catch {}
    setCurrentView('assessment');
  };

  // Form submission handler
  const handleFormSubmit = async (formData: Omit<AssessmentSubmission, 'id' | 'createdAt' | 'status' | 'emailStatus'>) => {
    setPendingBrandName(formData.business.brandName);
    setActiveSubmission(null); // Clear previous submission to ensure skeleton loader shows until ready
    setCurrentView('processing');

    const id = 'ora-' + Date.now();
    const newSubmission: AssessmentSubmission = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
      status: 'analyzing',
      emailStatus: 'pending',
    };

    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success && data.assessment) {
        setActiveSubmission(data.assessment);
      } else {
        throw new Error(data.error || 'Failed to analyze brand');
      }
    } catch (err) {
      console.warn('Backend API request fell back to client-side AI engine:', err);
      try {
        const researchSources = await researchBrandWebsite(
          id,
          formData.business.website,
          formData.business.brandName,
          formData.business.industry
        );
        const oracleAnalysis = await analyzeBrandWithGemini(newSubmission, researchSources);
        const completedSubmission: AssessmentSubmission = {
          ...newSubmission,
          status: 'completed',
          reportUrl: `/report/${id}`,
          emailStatus: 'sent',
          emailSentAt: new Date().toISOString(),
          analysis: oracleAnalysis,
          sources: researchSources,
        };
        setActiveSubmission(completedSubmission);
      } catch (innerErr) {
        console.error('Client-side analysis error:', innerErr);
      }
    }
  };

  const handleProcessingFinished = () => {
    setCurrentView('report');
  };

  const handleOpenSampleReport = () => {
    setActiveSubmission(SEEDED_ASSESSMENTS[0]);
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

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('landing');
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
          />
        )}

        {currentView === 'processing' && (
          <ProcessingView
            brandName={pendingBrandName}
            onFinished={handleProcessingFinished}
          />
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

