import React, { useEffect, useState } from 'react';
import { Grid, EyeOff, Check, AlertTriangle, X, HelpCircle } from 'lucide-react';
import { fetchNegativeSpaceMatrix } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

  useEffect(() => {
    loadMatrix();
  }, []);

  const loadMatrix = async () => {
    try {
      setLoading(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
  ];

  const renderCell = (state) => {
    let className = 'heatmap-cell cell-present';
    let label = 'Evidence present';
    let icon = <Check size={13} />;

    if (state === 'Missing') {
      className = 'heatmap-cell cell-missing';
      label = 'Missing / blind spot';
      icon = <X size={13} />;
    } else if (state === 'Partial') {
      className = 'heatmap-cell cell-partial';
      label = 'Partial evidence';
      icon = <AlertTriangle size={13} />;
    } else if (state === 'Requires Validation') {
      className = 'heatmap-cell cell-validate';
      label = 'Requires validation';
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
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--paper)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EyeOff size={18} color="#a992dd" />
            <span>Negative space operational heatmap</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '3px' }}>
            Analyzes what SHOULD exist but is absent (telemetry voids, omitted MITRE threat categories, missing root-cause records).
          </p>
        </div>

        {/* Legend */}
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
          </span>
        </div>
      </div>

      {/* Heatmap Grid Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Critical sector entity</th>
                <th style={{ minWidth: '90px' }}>Attention score</th>
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
                  <td style={{ fontWeight: '700', color: 'var(--paper)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>{row.cse_id}</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--paper-dim)' }}>{row.cse_name.slice(0, 22)}...</span>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: '700',
                      color: row.attention_score >= 70 ? '#e0616b' : (row.attention_score >= 50 ? '#d99a52' : '#5fac86')
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
