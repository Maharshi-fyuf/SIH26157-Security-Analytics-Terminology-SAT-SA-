import React, { useState } from 'react';
import { Database, Play, CheckCircle, AlertTriangle, Shield, RefreshCw, Radio, FlaskConical } from 'lucide-react';
import { generateDemoData, runSupervisoryAnalysis, getUIMode, setUIMode } from '../api';

export default function TopBar({ activeView, onDataRefresh, onSelectCSE }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [mode, setMode] = useState(getUIMode());

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

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

  const handleGenerateData = async () => {
    try {
      setLoading(true);
      const res = await generateDemoData();
      showToast(`Generated ${res.generator_result.alerts_count.toLocaleString()} alerts across ${res.generator_result.cses_count} CSEs`, 'success');
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
      showToast(`Supervisory analysis complete: ${res.total_findings} findings detected`, 'success');
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <h1 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--paper)', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {viewTitles[activeView] || 'Supervisory Assessment'}
        </h1>
        {activeView === 'dashboard' && (
          <span className="badge badge-blue" style={{ flexShrink: 0 }}>
            Period 2026-Q3
          </span>
        )}
      </div>

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

        {/* Action 1: Generate Demo Dataset */}
        <button
          onClick={handleGenerateData}
          disabled={loading}
          className="btn btn-secondary"
          title={mode === 'proof' ? 'Resets the Proof Mode dataset back to its baseline snapshot' : 'Generates 12 CSEs with 16,000+ realistic alerts, cases, assets and ground truth'}
        >
          <Database size={15} />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--ink-850)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
          <Shield size={15} color="#5b84e8" />
          <div style={{ fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--paper)', fontWeight: '600' }}>Supervisor</span>
            <span style={{ color: 'var(--paper-faint)', marginLeft: '6px' }}>NCIIPC Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
