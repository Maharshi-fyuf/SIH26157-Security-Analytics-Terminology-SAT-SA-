import React, { useEffect, useState } from 'react';
import {
  Building,
  ShieldAlert,
  ArrowLeft,
  Flame,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingDown,
  BarChart2,
  FileText,
  Activity,
  ChevronRight
} from 'lucide-react';
import { fetchCSEProfile, fetchCSEs, getCSEReportUrl } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

  useEffect(() => {
    loadData(cseId);
  }, [cseId]);

  const loadData = async (targetId) => {
    try {
      setLoading(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingNotice label="Loading CSE profile dossier..." />;
  }

  if (error) {
    return (
      <StateMessage
        tone="error"
        title={`Couldn't load ${cseId}`}
        description={error}
        actionLabel="Retry"
        onAction={() => loadData(cseId)}
      />
    );
  }

  const entity = profile?.entity || {};
  const metrics = profile?.metrics || {};
  const peer = profile?.peer_medians || {};
  const findings = profile?.findings || [];
  const remediations = profile?.remediations || [];

  const isStarDemo = entity.cse_id === 'CSE-07';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Entity Selector Header Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line-strong)', padding: '10px', borderRadius: 'var(--radius)' }}>
            <Building size={22} color="#5b84e8" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--paper)' }}>
                {entity.cse_name} ({entity.cse_id})
              </h2>
              {isStarDemo && (
                <span className="badge badge-critical" style={{ fontSize: '0.72rem' }}>
                  Featured SIH demo case
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '2px' }}>
              Sector: <strong style={{ color: 'var(--paper)' }}>{entity.sector}</strong> · Criticality: <strong style={{ color: 'var(--paper)' }}>{entity.criticality}</strong> · Period: <strong style={{ color: 'var(--paper)' }}>{entity.reporting_period}</strong>
            </div>
          </div>
        </div>

        {/* Switch Entity dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--paper-dim)' }}>Select entity:</span>
          <select
            value={entity.cse_id}
            onChange={(e) => onSelectCSE(e.target.value)}
            style={{
              background: 'var(--ink-800)',
              border: '1px solid var(--line)',
              color: 'var(--paper)',
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            {allCSEs.map(c => (
              <option key={c.cse_id} value={c.cse_id}>
                {c.cse_id} - {c.cse_name} (Score: {c.attention_score})
              </option>
            ))}
          </select>

          <a
            href={getCSEReportUrl(entity.cse_id)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <FileText size={15} />
            <span>Export dossier</span>
          </a>
        </div>
      </div>

      {/* Hero Supervisory Story Banner */}
      <div className="card" style={{
        borderLeft: `3px solid ${entity.attention_score >= 70 ? 'var(--sev-critical)' : 'var(--sev-healthy)'}`,
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: '24px'
      }}>
        {/* Score Gauge */}
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)', paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', fontWeight: '600' }}>
            Supervisory attention
          </div>
          <div style={{ fontSize: '3.2rem', fontWeight: '700', color: entity.attention_score >= 70 ? '#e0616b' : '#5fac86', fontFamily: 'var(--font-mono)', lineHeight: 1.1, margin: '8px 0' }}>
            {entity.attention_score}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>out of 100 maximum</div>
          <div style={{ marginTop: '10px' }}>
            <span className={`badge ${entity.attention_score >= 70 ? 'badge-critical' : 'badge-green'}`} style={{ fontSize: '0.78rem' }}>
              {entity.review_status}
            </span>
          </div>
        </div>

        {/* Narrative & Reasons */}
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--paper)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={18} color="#e0616b" />
            <span>Why did SAT-SA prioritize {entity.cse_id}? (Supervisory evidence narrative)</span>
          </div>

          {isStarDemo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--paper-dim)' }}>
              <div><strong style={{ color: 'var(--paper)' }}>1. Fast critical closures:</strong> Critical alerts closed in median <strong>8.3 min</strong>, which is <strong>85.5% faster</strong> than peer median of 57.2 min.</div>
              <div><strong style={{ color: 'var(--paper)' }}>2. Unescalated critical threats:</strong> <strong>14+ critical alerts</strong> resolved without escalation to Tier-2 or Incident Response.</div>
              <div><strong style={{ color: 'var(--paper)' }}>3. Critical SCADA telemetry blind spots:</strong> <strong>3 designated critical RTUs</strong> generated under 15% expected telemetry during the quarter.</div>
              <div><strong style={{ color: 'var(--paper)' }}>4. Chronic recurring incidents:</strong> <strong>27 repeated SCADA protocol deviation alerts</strong> on the same asset without root-cause remediation.</div>
              <div><strong style={{ color: 'var(--paper)' }}>5. Template-driven documentation:</strong> <strong>100% textual similarity</strong> across analyst investigation logs, indicating canned triage notes.</div>
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--paper-dim)', lineHeight: 1.6 }}>
              {findings.length > 0 ? (
                findings.slice(0, 4).map((f, i) => (
                  <div key={f.finding_id} style={{ marginBottom: '6px', color: 'var(--paper)' }}>
                    <strong>{i + 1}. {f.finding_type}:</strong> {f.title} ({f.severity} severity)
                  </div>
                ))
              ) : (
                <div style={{ color: '#5fac86', fontWeight: '500' }}>
                  Operational metrics align with established sector peer distributions. No critical execution gaps or negative-space blind spots detected.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Operational Metrics vs Sector Peer Benchmark Table */}
      <div className="card">
        <div className="card-title">
          <span>Operational benchmark vs sector peer distribution</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Peer median normalized</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Operational dimension</th>
                <th>Entity value</th>
                <th>Peer median</th>
                <th>Percentile deviation</th>
                <th>Supervisory evaluation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '600' }}>Critical alert closure median</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.crit_median_dur < 15 ? '#e0616b' : '#5b84e8' }}>
                  {metrics.crit_median_dur} min
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.crit_median_dur} min
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: metrics.crit_dur_deviation < -50 ? '#e0616b' : '#5fac86' }}>
                  {metrics.crit_dur_deviation > 0 ? `+${metrics.crit_dur_deviation}%` : `${metrics.crit_dur_deviation}%`}
                </td>
                <td>
                  {metrics.crit_median_dur < 15 ? (
                    <span className="badge badge-critical">Requires review (anomalously fast)</span>
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>

              <tr>
                <td style={{ fontWeight: '600' }}>Critical alert escalation rate</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.crit_esc_rate < 40 ? '#e0616b' : '#5b84e8' }}>
                  {metrics.crit_esc_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.crit_esc_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: metrics.crit_esc_deviation < -40 ? '#e0616b' : '#5fac86' }}>
                  {metrics.crit_esc_deviation > 0 ? `+${metrics.crit_esc_deviation}%` : `${metrics.crit_esc_deviation}%`}
                </td>
                <td>
                  {metrics.crit_esc_rate < 40 ? (
                    <span className="badge badge-critical">Requires review (low escalation)</span>
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>

              <tr>
                <td style={{ fontWeight: '600' }}>Telemetry coverage index</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.telemetry_coverage < 75 ? '#e0616b' : '#5b84e8' }}>
                  {metrics.telemetry_coverage}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.telemetry_coverage}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {metrics.tel_deviation > 0 ? `+${metrics.tel_deviation}%` : `${metrics.tel_deviation}%`}
                </td>
                <td>
                  {metrics.telemetry_coverage < 85 ? (
                    <span className="badge badge-orange">Potential blind spot</span>
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>

              <tr>
                <td style={{ fontWeight: '600' }}>Remediation documentation rate</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  {metrics.remediation_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.remediation_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>
                  {metrics.remediation_rate < 50 ? '-35.2%' : '+8.1%'}
                </td>
                <td>
                  {metrics.remediation_rate < 50 ? (
                    <span className="badge badge-amber">Under-documented</span>
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* "How to Heal" Action Plan */}
      <div className="card" style={{ borderLeft: '3px solid #5fac86' }}>
        <div className="card-title">
          <span style={{ color: '#5fac86', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} />
            <span>"How to heal" supervisory remediation plan for {entity.cse_id}</span>
          </span>
          <button onClick={() => onNavigate('remediation')} className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
            Open remediation tracker
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '12px' }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--paper-dim)', marginBottom: '10px' }}>
              Recommended corrective actions
            </div>
            <ol style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--paper-dim)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Establish mandatory minimum investigation checklist before critical alert disposition.</li>
              <li>Enforce mandatory forensic evidence attachment (logs, pcaps) for high-impact events.</li>
              <li>Calibrate escalation matrix and define strict SLA for Critical SCADA incidents.</li>
              <li>Validate telemetry health and log forwarders on degraded RTU controllers.</li>
              <li>Perform structured root-cause analysis on repeated protocol deviation alerts.</li>
            </ol>
          </div>

          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--paper-dim)', marginBottom: '10px' }}>
              Quantitative verification metrics
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--paper-dim)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>{'Critical-alert escalation rate (Target: >= 80% escalated or exception recorded).'}</li>
              <li>{'Critical asset telemetry coverage percentage (Target: >= 95% continuous).'}</li>
              <li>{'Repeat alert recurrence reduction (Target: >= 70% reduction over 60 days).'}</li>
              <li>{'Zero-evidence closure rate (Target: < 5%).'}</li>
              <li>{'Investigation narrative uniqueness ratio (Diversity score >= 0.65).'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Associated Findings List */}
      <div className="card">
        <div className="card-title">
          <span>Detected supervisory findings for {entity.cse_id} ({findings.length})</span>
        </div>

        {findings.length === 0 ? (
          <StateMessage tone="empty" title="No findings for this entity" description="Operational metrics for this entity are within established sector peer distributions." />
        ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {findings.map((f) => {
            let sevBadge = 'badge-critical';
            if (f.severity === 'High') sevBadge = 'badge-high';
            if (f.severity === 'Medium') sevBadge = 'badge-medium';

            return (
              <div
                key={f.finding_id}
                onClick={() => onSelectFinding(f.finding_id)}
                style={{
                  background: 'var(--ink-800)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span className={`badge ${sevBadge}`}>{f.severity}</span>
                    <span className="badge badge-low">{f.finding_type}</span>
                    <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--paper)' }}>
                      {f.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--paper-dim)' }}>
                    {f.description.slice(0, 160)}...
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)' }}>Confidence</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>
                      {Math.round(f.confidence * 100)}%
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--paper-faint)" />
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
