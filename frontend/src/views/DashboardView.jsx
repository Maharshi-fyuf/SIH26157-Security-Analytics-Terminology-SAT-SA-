import React, { useEffect, useState } from 'react';
import {
  Building,
  BellRing,
  FolderArchive,
  AlertOctagon,
  EyeOff,
  Flame,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { fetchDashboard } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

export default function DashboardView({ onNavigate, onSelectCSE }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchDashboard();
      setData(res);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load the dashboard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingNotice label="Loading supervisory intelligence dashboard..." />;
  }

  if (error) {
    return (
      <StateMessage
        tone="error"
        title="Couldn't load the dashboard"
        description={error}
        actionLabel="Retry"
        onAction={loadDashboard}
      />
    );
  }

  const stats = data?.stats || {};
  const topEntities = data?.top_entities || [];
  const findingsByCat = data?.findings_by_category || [];
  const severities = data?.severity_breakdown || [];

  if (!stats.cses_analyzed) {
    return (
      <StateMessage
        tone="empty"
        title="No supervisory data yet"
        description={'No CSE data has been generated or ingested yet. Use "Generate Demo Dataset" above, or upload a submission from the Data Ingestion view, to populate the dashboard.'}
        actionLabel="Reload"
        onAction={loadDashboard}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Star Demo Showcase Callout */}
      <div style={{
        background: 'var(--ink-850)',
        border: '1px solid var(--line)',
        borderLeft: '3px solid var(--sev-critical)',
        borderRadius: 'var(--radius)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--ink-800)', padding: '9px', borderRadius: 'var(--radius)', border: '1px solid var(--line-strong)', flexShrink: 0 }}>
            <Flame size={22} color="#e0616b" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-critical">High priority</span>
              <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--paper)' }}>
                Star demo case: Northern Regional Load Despatch (CSE-07)
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '4px' }}>
              Supervisory attention score: <strong style={{ color: 'var(--sev-critical)', fontFamily: 'var(--font-mono)' }}>79 / 100</strong>. Detected fast critical closures (-85.5% vs peer), 14 unescalated critical alerts, and 3 SCADA telemetry blind spots.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onSelectCSE('CSE-07');
            onNavigate('cse-profile');
          }}
          className="btn btn-danger"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span>Inspect CSE-07 story</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Top KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">CSEs analyzed</span>
            <Building size={16} color="#5b84e8" />
          </div>
          <div className="kpi-value">{stats.cses_analyzed || 0}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            Across 6 critical infrastructure sectors
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Alerts triaged</span>
            <BellRing size={16} color="#5b84e8" />
          </div>
          <div className="kpi-value">
            {(stats.alerts_analyzed || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            3-month continuous submissions
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Cases investigated</span>
            <FolderArchive size={16} color="#5b84e8" />
          </div>
          <div className="kpi-value">
            {(stats.cases_analyzed || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            Escalated security incidents
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Supervisory signals</span>
            <AlertOctagon size={16} color="#d3c15f" />
          </div>
          <div className="kpi-value" style={{ color: '#d3c15f' }}>
            {stats.supervisory_signals || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            Gaps, anomalies & blind spots
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">High priority findings</span>
            <Flame size={16} color="#e0616b" />
          </div>
          <div className="kpi-value" style={{ color: '#e0616b' }}>
            {stats.high_priority_findings || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            Critical operational concerns
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Potential blind spots</span>
            <EyeOff size={16} color="#a992dd" />
          </div>
          <div className="kpi-value" style={{ color: '#a992dd' }}>
            {stats.potential_blind_spots || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            Negative space telemetry voids
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Entities requiring review</span>
            <AlertTriangle size={16} color="#d99a52" />
          </div>
          <div className="kpi-value" style={{ color: '#d99a52' }}>
            {stats.entities_requiring_review || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            {'Attention score \u2265 50'}
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Active remediations</span>
            <CheckSquare size={16} color="#5fac86" />
          </div>
          <div className="kpi-value" style={{ color: '#5fac86' }}>
            {stats.open_remediation_actions || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            "How to heal" corrective actions
          </div>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown & Severity Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        {/* Finding Categories */}
        <div className="card">
          <div className="card-title">
            <span>Findings by supervisory dimension</span>
            <span style={{ fontSize: '0.76rem', color: 'var(--paper-faint)' }}>Find &rarr; prove &rarr; prioritize</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
            {findingsByCat.map((item) => {
              const maxCount = Math.max(...findingsByCat.map(x => x.count), 1);
              const pct = (item.count / maxCount) * 100;
              let barColor = '#5b84e8';
              if (item.category === 'Execution Gap') barColor = '#e0616b';
              if (item.category === 'Negative Space') barColor = '#a992dd';
              if (item.category === 'Metric Gaming') barColor = '#d3c15f';
              if (item.category === 'Multivariate Anomaly') barColor = '#5b84e8';

              return (
                <div key={item.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--paper)' }}>{item.category}</span>
                    <span style={{ color: 'var(--paper-dim)', fontFamily: 'var(--font-mono)' }}>{item.count} findings</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%`, background: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="card">
          <div className="card-title">
            <span>Severity & attention intensity</span>
            <span style={{ fontSize: '0.76rem', color: 'var(--paper-faint)' }}>Supervisory weight</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
            {severities.map((item) => {
              const totalFindings = severities.reduce((a, b) => a + b.count, 0) || 1;
              const pct = Math.round((item.count / totalFindings) * 100);

              return (
                <div key={item.severity}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: item.color }}>{item.severity}</span>
                    <span style={{ color: 'var(--paper-dim)', fontFamily: 'var(--font-mono)' }}>{item.count} ({pct}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%`, background: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Priority Entities Ranking Table */}
      <div className="card">
        <div className="card-title">
          <span>Priority entities requiring supervisory oversight</span>
          <button
            onClick={() => onNavigate('cses')}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '4px 10px' }}
          >
            View all entities
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Entity ID</th>
                <th>Entity name</th>
                <th>Sector</th>
                <th>Criticality</th>
                <th>Attention score</th>
                <th>Status</th>
                <th>Signals</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topEntities.slice(0, 7).map((c) => {
                let badgeClass = 'badge-green';
                let scoreColor = '#5fac86';
                if (c.attention_score >= 70) {
                  badgeClass = 'badge-critical';
                  scoreColor = '#e0616b';
                } else if (c.attention_score >= 50) {
                  badgeClass = 'badge-high';
                  scoreColor = '#d99a52';
                } else if (c.attention_score >= 30) {
                  badgeClass = 'badge-medium';
                  scoreColor = '#d3c15f';
                }

                return (
                  <tr key={c.cse_id} style={{ cursor: 'pointer' }} onClick={() => { onSelectCSE(c.cse_id); onNavigate('cse-profile'); }}>
                    <td style={{ fontWeight: '600', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>{c.cse_id}</td>
                    <td style={{ fontWeight: '600' }}>{c.name}</td>
                    <td>{c.sector}</td>
                    <td><span className="badge badge-low">{c.criticality}</span></td>
                    <td>
                      <span style={{ fontWeight: '700', fontSize: '1.02rem', color: scoreColor, fontFamily: 'var(--font-mono)' }}>
                        {c.attention_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}> / 100</span>
                    </td>
                    <td>
                      <span className={`badge ${badgeClass}`}>{c.status}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>{c.findings_count} findings</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCSE(c.cse_id);
                          onNavigate('cse-profile');
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '3px 10px', fontSize: '0.75rem' }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
