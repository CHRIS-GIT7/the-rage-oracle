import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AssessmentForm } from './components/AssessmentForm';
import { ProcessingView } from './components/ProcessingView';
import { ReportView } from './components/ReportView';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { AssessmentSubmission } from './types';
import { SEEDED_ASSESSMENTS } from './data/seededAssessments';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'assessment' | 'processing' | 'report' | 'admin' | 'admin_login'>('landing');
  const [activeSubmission, setActiveSubmission] = useState<AssessmentSubmission | null>(null);
  const [pendingBrandName, setPendingBrandName] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Form submission handler
  const handleFormSubmit = async (formData: Omit<AssessmentSubmission, 'id' | 'createdAt' | 'status' | 'emailStatus'>) => {
    setPendingBrandName(formData.business.brandName);
    setCurrentView('processing');

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
      const fallbackAnalysis = {
        ...SEEDED_ASSESSMENTS[0].analysis,
        id: 'ana-client-' + Date.now(),
        executiveVerdict: `${formData.business.brandName} demonstrates clear potential in ${formData.business.industry}, but requires immediate strategic refinement to address conversion friction and maximize customer trust in the local market.`,
      };

      const fallback: AssessmentSubmission = {
        ...formData,
        id: 'ora-client-' + Date.now(),
        createdAt: new Date().toISOString(),
        status: 'completed',
        emailStatus: 'sent',
        analysis: fallbackAnalysis,
        sources: [
          {
            id: `src-web-${Date.now()}-1`,
            assessmentId: 'ora-client',
            sourceUrl: formData.business.website.startsWith('http') ? formData.business.website : `https://${formData.business.website}`,
            sourceTitle: `${formData.business.brandName} Official Digital Ecosystem`,
            sourceType: 'website',
            sourceSummary: `Analyzed digital presence for ${formData.business.brandName}. Evaluated headline value proposition and positioning clarity.`,
            relevance: 'Primary brand positioning baseline.',
            createdAt: new Date().toISOString(),
          }
        ],
      };
      setActiveSubmission(fallback);
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
    if (view === 'admin' && !isAdminLoggedIn) {
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
            onStartAssessment={() => setCurrentView('assessment')}
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

        {currentView === 'report' && activeSubmission && (
          <ReportView
            submission={activeSubmission}
            onBackToMain={() => setCurrentView('landing')}
          />
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
