import React, { useState } from 'react';
<<<<<<< HEAD
import { Database, Play, CheckCircle, AlertTriangle, Shield, RefreshCw, Radio, FlaskConical } from 'lucide-react';
import { generateDemoData, runSupervisoryAnalysis, getUIMode, setUIMode } from '../api';
=======
import { Database, Play, CheckCircle, AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import { generateDemoData, runSupervisoryAnalysis } from '../api';
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function TopBar({ activeView, onDataRefresh, onSelectCSE }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
<<<<<<< HEAD
  const [mode, setMode] = useState(getUIMode());
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

<<<<<<< HEAD
  const handleModeChange = (nextMode) => {
    if (nextMode === mode) return;
    setUIMode(nextMode);
    setMode(nextMode);
    showToast(
      nextMode === 'proof'
        ? 'Switched to Proof Mode — running entirely on a pre-baked, offline dataset.'
        : 'Switched to Live Mode — reading from the FastAPI backend.',
      'success'
    );
    onDataRefresh();
  };

=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  const handleGenerateData = async () => {
    try {
      setLoading(true);
      const res = await generateDemoData();
<<<<<<< HEAD
      showToast(`Generated ${res.generator_result.alerts_count.toLocaleString()} alerts across ${res.generator_result.cses_count} CSEs`, 'success');
=======
      showToast(`Generated ${res.generator_result.alerts_count.toLocaleString()} alerts across ${res.generator_result.cses_count} CSEs!`, 'success');
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      onDataRefresh();
    } catch (err) {
      showToast(`Generation failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalysis = async () => {
    try {
      setLoading(true);
      const res = await runSupervisoryAnalysis();
<<<<<<< HEAD
      showToast(`Supervisory analysis complete: ${res.total_findings} findings detected`, 'success');
=======
      showToast(`Supervisory analysis complete: ${res.total_findings} findings detected!`, 'success');
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      onDataRefresh();
    } catch (err) {
      showToast(`Analysis failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const viewTitles = {
    'dashboard': 'National SOC Supervisory Command Dashboard',
    'cses': 'Critical Sector Entities (CSEs) Directory',
    'cse-profile': 'Entity Operational Resilience & Supervisory Profile',
    'findings': 'Supervisory Findings & Evidence Explorer',
    'review-queue': 'Prioritized Manual Supervisory Review Queue',
    'samples': 'Intelligent Alert Sample Prioritization',
    'negative-space': 'Negative Space & Operational Blind Spot Matrix',
    'benchmarks': 'Sector Peer Benchmarking & Percentile Distribution Hub',
    'remediation': '"Heal the Wound" Supervisory Remediation Tracker',
    'validation': 'Empirical Analytics Validation (Ground Truth vs Algorithmic Review)',
    'reports': 'Official Supervisory Reports & Dossier Generator',
    'upload': 'Data Ingestion, CSV Validation & Audit Trail'
  };

  return (
    <header className="top-bar">
<<<<<<< HEAD
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <h1 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--paper)', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {viewTitles[activeView] || 'Supervisory Assessment'}
        </h1>
        {activeView === 'dashboard' && (
          <span className="badge badge-blue" style={{ flexShrink: 0 }}>
            Period 2026-Q3
=======
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f8fafc', letterSpacing: '-0.01em' }}>
          {viewTitles[activeView] || 'Supervisory Assessment'}
        </h2>
        {activeView === 'dashboard' && (
          <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
            PERIOD: 2026-Q3
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </span>
        )}
      </div>

<<<<<<< HEAD
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {/* Toast Notification */}
        {toast && (
          <div role="status" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--ink-850)',
            border: `1px solid ${toast.type === 'error' ? 'var(--sev-critical)' : 'var(--sev-healthy)'}`,
            color: toast.type === 'error' ? 'var(--sev-critical)' : 'var(--sev-healthy)',
            padding: '6px 12px',
            borderRadius: 'var(--radius)',
            fontSize: '0.82rem',
            fontWeight: '500',
            maxWidth: '360px'
          }}>
            {toast.type === 'error' ? <AlertTriangle size={15} style={{ flexShrink: 0 }} /> : <CheckCircle size={15} style={{ flexShrink: 0 }} />}
            <span>{toast.msg}</span>
          </div>
        )}

        {/* Live / Proof Mode toggle */}
        <div
          role="group"
          aria-label="Data mode"
          title="Live reads from the FastAPI backend. Proof Mode runs entirely on a pre-baked offline dataset — useful when presenting without a reliable backend or network connection."
          style={{ display: 'flex', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius)', overflow: 'hidden' }}
        >
          <button
            onClick={() => handleModeChange('live')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 11px', fontSize: '0.78rem', fontWeight: '600',
              border: 'none', cursor: 'pointer',
              background: mode === 'live' ? 'var(--signal-dim)' : 'transparent',
              color: mode === 'live' ? 'var(--signal)' : 'var(--paper-dim)'
            }}
          >
            <Radio size={13} />
            <span>Live</span>
          </button>
          <button
            onClick={() => handleModeChange('proof')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 11px', fontSize: '0.78rem', fontWeight: '600',
              border: 'none', borderLeft: '1px solid var(--line-strong)', cursor: 'pointer',
              background: mode === 'proof' ? 'var(--signal-dim)' : 'transparent',
              color: mode === 'proof' ? 'var(--signal)' : 'var(--paper-dim)'
            }}
          >
            <FlaskConical size={13} />
            <span>Proof Mode</span>
          </button>
        </div>

=======
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Toast Notification */}
        {toast && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: toast.type === 'error' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            border: `1px solid ${toast.type === 'error' ? '#f43f5e' : '#10b981'}`,
            color: toast.type === 'error' ? '#fda4af' : '#6ee7b7',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '0.82rem',
            fontWeight: '500'
          }}>
            {toast.type === 'error' ? <AlertTriangle size={15} /> : <CheckCircle size={15} />}
            {toast.msg}
          </div>
        )}

>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        {/* Action 1: Generate Demo Dataset */}
        <button
          onClick={handleGenerateData}
          disabled={loading}
          className="btn btn-secondary"
<<<<<<< HEAD
          title={mode === 'proof' ? 'Resets the Proof Mode dataset back to its baseline snapshot' : 'Generates 12 CSEs with 16,000+ realistic alerts, cases, assets and ground truth'}
        >
          <Database size={15} />
=======
          title="Generates 12 CSEs with 16,000+ realistic alerts, cases, assets and ground truth"
        >
          <Database size={15} color="#38bdf8" />
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          <span>Generate Demo Dataset</span>
        </button>

        {/* Action 2: Run Supervisory Analysis */}
        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="btn btn-primary"
          title="Executes execution gaps, negative space, peer benchmarks, and risk scoring"
        >
          {loading ? <RefreshCw size={15} className="spin" /> : <Play size={15} />}
          <span>Run Supervisory Analysis</span>
        </button>

        {/* Role Pill */}
<<<<<<< HEAD
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--ink-850)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
          <Shield size={15} color="#5b84e8" />
          <div style={{ fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--paper)', fontWeight: '600' }}>Supervisor</span>
            <span style={{ color: 'var(--paper-faint)', marginLeft: '6px' }}>NCIIPC Lead</span>
=======
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
          <Shield size={16} color="#06b6d4" />
          <div style={{ fontSize: '0.78rem' }}>
            <span style={{ color: '#f8fafc', fontWeight: '600' }}>Supervisor</span>
            <span style={{ color: '#64748b', marginLeft: '6px' }}>NCIIPC Lead</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>
        </div>
      </div>
    </header>
  );
}
