import React, { useEffect, useState } from 'react';
import { Grid, EyeOff, Check, AlertTriangle, X, HelpCircle } from 'lucide-react';
import { fetchNegativeSpaceMatrix } from '../api';
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function NegativeSpaceView({ onSelectCSE, onNavigate }) {
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

  useEffect(() => {
    loadMatrix();
  }, []);

  const loadMatrix = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const res = await fetchNegativeSpaceMatrix();
      setMatrix(res);
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || 'Failed to load the negative space matrix.');
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
    return <LoadingNotice label="Loading negative space heatmap matrix..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load the matrix" description={error} actionLabel="Retry" onAction={loadMatrix} />;
  }

  if (matrix.length === 0) {
    return (
      <StateMessage
        tone="empty"
        title="No entities to map yet"
        description={'No CSE data has been generated or ingested yet, so there is nothing to plot on the matrix.'}
        actionLabel="Reload"
        onAction={loadMatrix}
      />
    );
  }

  const columns = [
    { key: 'critical_asset_telemetry', label: 'Critical asset telemetry' },
    { key: 'alert_categories', label: 'Alert category spectrum' },
    { key: 'investigation_depth', label: 'Investigation evidence depth' },
    { key: 'escalation_rigor', label: 'Escalation rigor & SLAs' },
    { key: 'root_cause_remediation', label: 'Root-cause remediation' },
    { key: 'monitoring_activity', label: 'Expected baseline activity' },
    { key: 'operational_integrity', label: 'Operational metric integrity' }
=======
    return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading negative space heatmap matrix...</div>;
  }

  const columns = [
    { key: 'critical_asset_telemetry', label: 'Critical Asset Telemetry' },
    { key: 'alert_categories', label: 'Alert Category Spectrum' },
    { key: 'investigation_depth', label: 'Investigation Evidence Depth' },
    { key: 'escalation_rigor', label: 'Escalation Rigor & SLAs' },
    { key: 'root_cause_remediation', label: 'Root-Cause Remediation' },
    { key: 'monitoring_activity', label: 'Expected Baseline Activity' },
    { key: 'operational_integrity', label: 'Operational Metric Integrity' }
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  ];

  const renderCell = (state) => {
    let className = 'heatmap-cell cell-present';
<<<<<<< HEAD
    let label = 'Evidence present';
=======
    let label = 'Evidence Present';
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    let icon = <Check size={13} />;

    if (state === 'Missing') {
      className = 'heatmap-cell cell-missing';
<<<<<<< HEAD
      label = 'Missing / blind spot';
      icon = <X size={13} />;
    } else if (state === 'Partial') {
      className = 'heatmap-cell cell-partial';
      label = 'Partial evidence';
      icon = <AlertTriangle size={13} />;
    } else if (state === 'Requires Validation') {
      className = 'heatmap-cell cell-validate';
      label = 'Requires validation';
=======
      label = 'Missing / Blind Spot';
      icon = <X size={13} />;
    } else if (state === 'Partial') {
      className = 'heatmap-cell cell-partial';
      label = 'Partial Evidence';
      icon = <AlertTriangle size={13} />;
    } else if (state === 'Requires Validation') {
      className = 'heatmap-cell cell-validate';
      label = 'Requires Validation';
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      icon = <HelpCircle size={13} />;
    }

    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        {icon}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Intro Header & Legend */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
<<<<<<< HEAD
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--paper)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EyeOff size={18} color="#a992dd" />
            <span>Negative space operational heatmap</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '3px' }}>
=======
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EyeOff size={18} color="#c084fc" />
            <span>Negative Space Operational Heatmap</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '3px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
            Analyzes what SHOULD exist but is absent (telemetry voids, omitted MITRE threat categories, missing root-cause records).
          </p>
        </div>

        {/* Legend */}
<<<<<<< HEAD
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#5fac86', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5fac86' }} />
            Evidence present
          </span>
          <span style={{ color: '#d3c15f', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d3c15f' }} />
            Partial telemetry
          </span>
          <span style={{ color: '#e0616b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e0616b' }} />
            Missing / blind spot
          </span>
          <span style={{ color: '#a992dd', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a992dd' }} />
            Requires validation
=======
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem' }}>
          <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            Evidence Present
          </span>
          <span style={{ color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
            Partial Telemetry
          </span>
          <span style={{ color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} />
            Missing / Blind Spot
          </span>
          <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }} />
            Requires Validation
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </span>
        </div>
      </div>

      {/* Heatmap Grid Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ margin: 0 }}>
            <thead>
              <tr>
<<<<<<< HEAD
                <th style={{ minWidth: '180px' }}>Critical sector entity</th>
                <th style={{ minWidth: '90px' }}>Attention score</th>
=======
                <th style={{ minWidth: '180px' }}>Critical Sector Entity</th>
                <th style={{ minWidth: '90px' }}>Attention Score</th>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                {columns.map(col => (
                  <th key={col.key} style={{ minWidth: '160px', textAlign: 'center' }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr
                  key={row.cse_id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => { onSelectCSE(row.cse_id); onNavigate('cse-profile'); }}
                >
<<<<<<< HEAD
                  <td style={{ fontWeight: '700', color: 'var(--paper)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>{row.cse_id}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--paper-dim)' }}>{row.cse_name.slice(0, 22)}...</span>
=======
                  <td style={{ fontWeight: '700', color: '#f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{row.cse_id}</span>
                      <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>{row.cse_name.slice(0, 22)}...</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                    </div>
                  </td>
                  <td>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
<<<<<<< HEAD
                      fontWeight: '700',
                      color: row.attention_score >= 70 ? '#e0616b' : (row.attention_score >= 50 ? '#d99a52' : '#5fac86')
=======
                      fontWeight: '800',
                      color: row.attention_score >= 70 ? '#fb7185' : (row.attention_score >= 50 ? '#fb923c' : '#34d399')
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                    }}>
                      {row.attention_score}
                    </span>
                  </td>
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '8px' }}>
                      {renderCell(row.pillars[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
