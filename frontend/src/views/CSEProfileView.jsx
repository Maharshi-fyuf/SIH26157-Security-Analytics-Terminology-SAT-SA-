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
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function CSEProfileView({ cseId = 'CSE-07', onSelectCSE, onSelectFinding, onNavigate }) {
  const [profile, setProfile] = useState(null);
  const [allCSEs, setAllCSEs] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

  useEffect(() => {
    loadData(cseId);
  }, [cseId]);

  const loadData = async (targetId) => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const [profData, csesData] = await Promise.all([
        fetchCSEProfile(targetId),
        fetchCSEs()
      ]);
      setProfile(profData);
      setAllCSEs(csesData);
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || `Failed to load the profile for ${targetId}.`);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
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
=======
    return <div style={{ padding: '40px', color: '#94a3b8', textAlign: 'center' }}>Loading CSE Profile dossier...</div>;
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
          <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line-strong)', padding: '10px', borderRadius: 'var(--radius)' }}>
            <Building size={22} color="#5b84e8" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--paper)' }}>
=======
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid #06b6d4', padding: '10px', borderRadius: '8px' }}>
            <Building size={24} color="#06b6d4" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                {entity.cse_name} ({entity.cse_id})
              </h2>
              {isStarDemo && (
                <span className="badge badge-critical" style={{ fontSize: '0.72rem' }}>
<<<<<<< HEAD
                  Featured SIH demo case
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '2px' }}>
              Sector: <strong style={{ color: 'var(--paper)' }}>{entity.sector}</strong> · Criticality: <strong style={{ color: 'var(--paper)' }}>{entity.criticality}</strong> · Period: <strong style={{ color: 'var(--paper)' }}>{entity.reporting_period}</strong>
=======
                  FEATURED SIH DEMO CASE
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
              Sector: <strong style={{ color: '#cbd5e1' }}>{entity.sector}</strong> | Criticality: <strong style={{ color: '#cbd5e1' }}>{entity.criticality}</strong> | Period: <strong style={{ color: '#cbd5e1' }}>{entity.reporting_period}</strong>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
            </div>
          </div>
        </div>

        {/* Switch Entity dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<<<<<<< HEAD
          <span style={{ fontSize: '0.8rem', color: 'var(--paper-dim)' }}>Select entity:</span>
=======
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Select Entity:</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          <select
            value={entity.cse_id}
            onChange={(e) => onSelectCSE(e.target.value)}
            style={{
<<<<<<< HEAD
              background: 'var(--ink-800)',
              border: '1px solid var(--line)',
              color: 'var(--paper)',
              padding: '6px 12px',
              borderRadius: 'var(--radius)',
=======
              background: '#090d16',
              border: '1px solid var(--border-subtle)',
              color: '#f8fafc',
              padding: '6px 12px',
              borderRadius: '6px',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
            <span>Export dossier</span>
=======
            <span>Export Dossier</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </a>
        </div>
      </div>

<<<<<<< HEAD
      {/* Hero Supervisory Story Banner */}
      <div className="card" style={{
        borderLeft: `3px solid ${entity.attention_score >= 70 ? 'var(--sev-critical)' : 'var(--sev-healthy)'}`,
=======
      {/* Hero Supervisory Story Banner (Especially tailored for CSE-07) */}
      <div style={{
        background: entity.attention_score >= 70 ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.16) 0%, rgba(20, 30, 51, 0.8) 100%)' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 30, 51, 0.8) 100%)',
        border: `1px solid ${entity.attention_score >= 70 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.3)'}`,
        borderRadius: '8px',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: '24px'
      }}>
        {/* Score Gauge */}
<<<<<<< HEAD
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)', paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', fontWeight: '600' }}>
            Supervisory attention
          </div>
          <div style={{ fontSize: '3.2rem', fontWeight: '700', color: entity.attention_score >= 70 ? '#e0616b' : '#5fac86', fontFamily: 'var(--font-mono)', lineHeight: 1.1, margin: '8px 0' }}>
            {entity.attention_score}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>out of 100 maximum</div>
=======
        <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
            Supervisory Attention
          </div>
          <div style={{ fontSize: '3.4rem', fontWeight: '900', color: entity.attention_score >= 70 ? '#fb7185' : '#34d399', fontFamily: 'var(--font-mono)', lineHeight: 1.1, margin: '8px 0' }}>
            {entity.attention_score}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>out of 100 maximum</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          <div style={{ marginTop: '10px' }}>
            <span className={`badge ${entity.attention_score >= 70 ? 'badge-critical' : 'badge-green'}`} style={{ fontSize: '0.78rem' }}>
              {entity.review_status}
            </span>
          </div>
        </div>

        {/* Narrative & Reasons */}
        <div>
<<<<<<< HEAD
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
=======
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f8fafc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={18} color="#f43f5e" />
            <span>Why did SAT-SA prioritize {entity.cse_id}? (Supervisory Evidence Narrative)</span>
          </div>

          {isStarDemo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <div><strong>1. Fast Critical Closures:</strong> Critical alerts closed in median <strong>8.3 min</strong>, which is <strong>85.5% faster</strong> than peer median of 57.2 min.</div>
              <div><strong>2. Unescalated Critical Threats:</strong> <strong>14+ critical alerts</strong> resolved without escalation to Tier-2 or Incident Response.</div>
              <div><strong>3. Critical SCADA Telemetry Blind Spots:</strong> <strong>3 designated critical RTUs</strong> generated under 15% expected telemetry during the quarter.</div>
              <div><strong>4. Chronic Recurring Incidents:</strong> <strong>27 repeated SCADA Protocol Deviation alerts</strong> on the same asset without root-cause remediation.</div>
              <div><strong>5. Template-Driven Documentation:</strong> <strong>100% textual similarity</strong> across analyst investigation logs, indicating canned triage notes.</div>
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              {findings.length > 0 ? (
                findings.slice(0, 4).map((f, i) => (
                  <div key={f.finding_id} style={{ marginBottom: '6px', color: '#cbd5e1' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                    <strong>{i + 1}. {f.finding_type}:</strong> {f.title} ({f.severity} severity)
                  </div>
                ))
              ) : (
<<<<<<< HEAD
                <div style={{ color: '#5fac86', fontWeight: '500' }}>
=======
                <div style={{ color: '#34d399', fontWeight: '500' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
          <span>Operational benchmark vs sector peer distribution</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Peer median normalized</span>
=======
          <span>Operational Benchmark vs Sector Peer Distribution</span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Peer Median Normalized</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
<<<<<<< HEAD
                <th>Operational dimension</th>
                <th>Entity value</th>
                <th>Peer median</th>
                <th>Percentile deviation</th>
                <th>Supervisory evaluation</th>
=======
                <th>Operational Dimension</th>
                <th>Entity Value</th>
                <th>Peer Median</th>
                <th>Percentile Deviation</th>
                <th>Supervisory Evaluation</th>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
              </tr>
            </thead>
            <tbody>
              <tr>
<<<<<<< HEAD
                <td style={{ fontWeight: '600' }}>Critical alert closure median</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.crit_median_dur < 15 ? '#e0616b' : '#5b84e8' }}>
                  {metrics.crit_median_dur} min
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.crit_median_dur} min
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: metrics.crit_dur_deviation < -50 ? '#e0616b' : '#5fac86' }}>
=======
                <td style={{ fontWeight: '600' }}>Critical Alert Closure Median</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.crit_median_dur < 15 ? '#fb7185' : '#38bdf8' }}>
                  {metrics.crit_median_dur} min
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                  {peer.crit_median_dur} min
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: metrics.crit_dur_deviation < -50 ? '#fb7185' : '#34d399' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {metrics.crit_dur_deviation > 0 ? `+${metrics.crit_dur_deviation}%` : `${metrics.crit_dur_deviation}%`}
                </td>
                <td>
                  {metrics.crit_median_dur < 15 ? (
<<<<<<< HEAD
                    <span className="badge badge-critical">Requires review (anomalously fast)</span>
=======
                    <span className="badge badge-critical">Requires Review (Anomalously Fast)</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>

              <tr>
<<<<<<< HEAD
                <td style={{ fontWeight: '600' }}>Critical alert escalation rate</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.crit_esc_rate < 40 ? '#e0616b' : '#5b84e8' }}>
                  {metrics.crit_esc_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.crit_esc_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: metrics.crit_esc_deviation < -40 ? '#e0616b' : '#5fac86' }}>
=======
                <td style={{ fontWeight: '600' }}>Critical Alert Escalation Rate</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.crit_esc_rate < 40 ? '#fb7185' : '#38bdf8' }}>
                  {metrics.crit_esc_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                  {peer.crit_esc_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: metrics.crit_esc_deviation < -40 ? '#fb7185' : '#34d399' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {metrics.crit_esc_deviation > 0 ? `+${metrics.crit_esc_deviation}%` : `${metrics.crit_esc_deviation}%`}
                </td>
                <td>
                  {metrics.crit_esc_rate < 40 ? (
<<<<<<< HEAD
                    <span className="badge badge-critical">Requires review (low escalation)</span>
=======
                    <span className="badge badge-critical">Requires Review (Low Escalation)</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>

              <tr>
<<<<<<< HEAD
                <td style={{ fontWeight: '600' }}>Telemetry coverage index</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.telemetry_coverage < 75 ? '#e0616b' : '#5b84e8' }}>
                  {metrics.telemetry_coverage}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                  {peer.telemetry_coverage}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
=======
                <td style={{ fontWeight: '600' }}>Telemetry Coverage Index</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: metrics.telemetry_coverage < 75 ? '#fb7185' : '#38bdf8' }}>
                  {metrics.telemetry_coverage}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                  {peer.telemetry_coverage}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {metrics.tel_deviation > 0 ? `+${metrics.tel_deviation}%` : `${metrics.tel_deviation}%`}
                </td>
                <td>
                  {metrics.telemetry_coverage < 85 ? (
<<<<<<< HEAD
                    <span className="badge badge-orange">Potential blind spot</span>
=======
                    <span className="badge badge-orange">Potential Blind Spot</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  ) : (
                    <span className="badge badge-green">Conformant</span>
                  )}
                </td>
              </tr>

              <tr>
<<<<<<< HEAD
                <td style={{ fontWeight: '600' }}>Remediation documentation rate</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  {metrics.remediation_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
=======
                <td style={{ fontWeight: '600' }}>Remediation Documentation Rate</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  {metrics.remediation_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {peer.remediation_rate}%
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>
                  {metrics.remediation_rate < 50 ? '-35.2%' : '+8.1%'}
                </td>
                <td>
                  {metrics.remediation_rate < 50 ? (
<<<<<<< HEAD
                    <span className="badge badge-amber">Under-documented</span>
=======
                    <span className="badge badge-amber">Under-Documented</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
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
=======
      <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
        <div className="card-title">
          <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} />
            <span>"How to Heal" Supervisory Remediation Plan for {entity.cse_id}</span>
          </span>
          <button onClick={() => onNavigate('remediation')} className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
            Open Remediation Tracker
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '12px' }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
              Recommended Corrective Actions
            </div>
            <ol style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
              <li>Establish mandatory minimum investigation checklist before critical alert disposition.</li>
              <li>Enforce mandatory forensic evidence attachment (logs, pcaps) for high-impact events.</li>
              <li>Calibrate escalation matrix and define strict SLA for Critical SCADA incidents.</li>
              <li>Validate telemetry health and log forwarders on degraded RTU controllers.</li>
              <li>Perform structured root-cause analysis on repeated protocol deviation alerts.</li>
            </ol>
          </div>

          <div>
<<<<<<< HEAD
            <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--paper-dim)', marginBottom: '10px' }}>
              Quantitative verification metrics
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--paper-dim)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
=======
            <div style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
              Quantitative Verification Metrics
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
          <span>Detected supervisory findings for {entity.cse_id} ({findings.length})</span>
        </div>

        {findings.length === 0 ? (
          <StateMessage tone="empty" title="No findings for this entity" description="Operational metrics for this entity are within established sector peer distributions." />
        ) : (
=======
          <span>Detected Supervisory Findings for {entity.cse_id} ({findings.length})</span>
        </div>

>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
                  background: 'var(--ink-800)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
=======
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  padding: '14px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
<<<<<<< HEAD
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
=======
                  transition: 'background-color 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`badge ${sevBadge}`}>{f.severity}</span>
                    <span className="badge badge-low">{f.finding_type}</span>
                    <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#f8fafc' }}>
                      {f.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                    {f.description.slice(0, 160)}...
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
<<<<<<< HEAD
                    <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)' }}>Confidence</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>
                      {Math.round(f.confidence * 100)}%
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--paper-faint)" />
=======
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Confidence</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                      {Math.round(f.confidence * 100)}%
                    </div>
                  </div>
                  <ChevronRight size={18} color="#64748b" />
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                </div>
              </div>
            );
          })}
        </div>
<<<<<<< HEAD
        )}
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      </div>
    </div>
  );
}
