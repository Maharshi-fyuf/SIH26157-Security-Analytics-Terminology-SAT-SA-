import React, { useState, useEffect } from 'react';
import { API_ERROR_EVENT, setUIMode } from './api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import DashboardView from './views/DashboardView';
import CSEsView from './views/CSEsView';
import CSEProfileView from './views/CSEProfileView';
import FindingsView from './views/FindingsView';
import ReviewQueueView from './views/ReviewQueueView';
import SamplesView from './views/SamplesView';
import NegativeSpaceView from './views/NegativeSpaceView';
import PeerBenchmarkView from './views/PeerBenchmarkView';
import RemediationView from './views/RemediationView';
import ValidationView from './views/ValidationView';
import ReportsView from './views/ReportsView';
import DataUploadView from './views/DataUploadView';
import FindingDetailModal from './views/FindingDetailModal';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCSE, setSelectedCSE] = useState('CSE-07');
  const [selectedFindingId, setSelectedFindingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const handleError = () => setApiError(true);
    window.addEventListener(API_ERROR_EVENT, handleError);
    return () => window.removeEventListener(API_ERROR_EVENT, handleError);
  }, []);

  const handleDataRefresh = () => {
    setApiError(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleSelectCSE = (cseId) => {
    setSelectedCSE(cseId);
  };

  const handleSelectFinding = (findingId) => {
    setSelectedFindingId(findingId);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        currentCSE={selectedCSE}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {apiError && (
          <div style={{ padding: '12px 20px', background: '#ffebee', color: '#c62828', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ef9a9a' }}>
            <span><strong>Connection Error:</strong> Could not reach the live backend API. The backend might be asleep or misconfigured.</span>
            <button 
              onClick={() => { setUIMode('proof'); setApiError(false); setRefreshKey(k => k + 1); }}
              style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Switch to Offline Proof Mode
            </button>
          </div>
        )}
        <TopBar
          activeView={activeView}
          onDataRefresh={handleDataRefresh}
          onSelectCSE={handleSelectCSE}
        />

        <div className="content-body" key={refreshKey}>
          {activeView === 'dashboard' && (
            <DashboardView
              onNavigate={setActiveView}
              onSelectCSE={(id) => { setSelectedCSE(id); setActiveView('cse-profile'); }}
            />
          )}

          {activeView === 'cses' && (
            <CSEsView
              onSelectCSE={handleSelectCSE}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'cse-profile' && (
            <CSEProfileView
              cseId={selectedCSE}
              onSelectCSE={handleSelectCSE}
              onSelectFinding={handleSelectFinding}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'findings' && (
            <FindingsView
              onSelectFinding={handleSelectFinding}
            />
          )}

          {activeView === 'review-queue' && (
            <ReviewQueueView
              onSelectFinding={handleSelectFinding}
            />
          )}

          {activeView === 'samples' && (
            <SamplesView
              onSelectFinding={handleSelectFinding}
            />
          )}

          {activeView === 'negative-space' && (
            <NegativeSpaceView
              onSelectCSE={handleSelectCSE}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'benchmarks' && (
            <PeerBenchmarkView
              onSelectCSE={handleSelectCSE}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'remediation' && (
            <RemediationView />
          )}

          {activeView === 'validation' && (
            <ValidationView />
          )}

          {activeView === 'reports' && (
            <ReportsView
              initialCSE={selectedCSE}
            />
          )}

          {activeView === 'upload' && (
            <DataUploadView />
          )}
        </div>
      </div>

      {/* Modal for Finding Evidence & Decision */}
      {selectedFindingId && (
        <FindingDetailModal
          findingId={selectedFindingId}
          onClose={() => setSelectedFindingId(null)}
          onStatusUpdated={() => handleDataRefresh()}
        />
      )}
    </div>
  );
}
