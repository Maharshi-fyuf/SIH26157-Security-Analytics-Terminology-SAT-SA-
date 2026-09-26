import React, { useEffect, useState } from 'react';
import {
  X,
  ShieldAlert,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Clock,
  Layers,
  Activity,
  PlusCircle
} from 'lucide-react';
import { fetchFindingDetail, updateFindingStatus, createRemediation } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [remediationCreated, setRemediationCreated] = useState(false);

  useEffect(() => {
    if (findingId) loadDetail(findingId);
  }, [findingId]);

  const loadDetail = async (id) => {
    try {
      setLoading(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setSubmitting(true);
      await updateFindingStatus(finding.finding_id, newStatus, notes);
      setFinding(prev => ({ ...prev, review_status: newStatus, supervisor_notes: notes }));
      if (onStatusUpdated) onStatusUpdated(finding.finding_id, newStatus);
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateRemediation = async () => {
    try {
      setSubmitting(true);
      const rec = finding.recommended_actions?.[0] || 'Perform corrective operational review';
      await createRemediation({
        finding_id: finding.finding_id,
        cse_id: finding.cse_id,
        title: `Remediate: ${rec}`,
        owner: `${finding.cse_id} SOC Operations Lead`,
        due_date: '2026-10-31',
        priority: finding.severity,
        verification_metric: 'Operational audit conformity sign-off',
        notes: `Created from supervisory finding ${finding.finding_id}`
      });
      setRemediationCreated(true);
      setTimeout(() => setRemediationCreated(false), 4000);
    } catch (err) {
      alert(`Failed to create remediation: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!findingId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1000px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {finding && (
              <>
                <span className={`badge ${finding.severity === 'Critical' ? 'badge-critical' : (finding.severity === 'High' ? 'badge-high' : 'badge-amber')}`}>
                  {finding.severity}
                </span>
                <span className="badge badge-low">{finding.finding_type}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--paper-dim)', fontFamily: 'var(--font-mono)' }}>
                  {finding.finding_id} / {finding.cse_id}
                </span>
              </>
            )}
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--paper-dim)' }} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <div className="modal-body">
            <LoadingNotice label="Loading finding evidence..." />
          </div>
        ) : error ? (
          <div className="modal-body">
            <StateMessage tone="error" title="Couldn't load this finding" description={error} actionLabel="Retry" onAction={() => loadDetail(findingId)} />
          </div>
        ) : (
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Title & Description */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--paper)', marginBottom: '8px' }}>
                {finding.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--paper-dim)', lineHeight: 1.6 }}>
                {finding.description}
              </p>
            </div>

            {/* Explainability Matrix: Signal, Baseline, Observed, Deviation */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Signal</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--paper)', fontWeight: '600', marginTop: '4px' }}>
                  {finding.metrics?.signal || 'Operational metric anomaly'}
                </div>
              </div>

              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Baseline norm</div>
                <div style={{ fontSize: '0.82rem', color: '#5b84e8', fontWeight: '600', marginTop: '4px' }}>
                  {finding.metrics?.baseline || 'Peer sector median'}
                </div>
              </div>

              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Observed entity value</div>
                <div style={{ fontSize: '0.82rem', color: '#e0616b', fontWeight: '600', marginTop: '4px' }}>
                  {finding.metrics?.observed || 'Significant deviation'}
                </div>
              </div>

              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Confidence index</div>
                <div style={{ fontSize: '0.82rem', color: '#5fac86', fontWeight: '600', marginTop: '4px' }}>
                  {Math.round(finding.confidence * 100)}% (strong heuristic)
                </div>
              </div>
            </div>

            {/* Lifecycle Flowchart */}
            <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '14px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--paper-dim)', fontWeight: '600', marginBottom: '10px' }}>
                Operational lifecycle timeline
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', textAlign: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ background: 'var(--ink-950)', padding: '8px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
                  <div style={{ color: '#5b84e8', fontWeight: '700' }}>1. Alert created</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}>SIEM / EDR sensor</div>
                </div>
                <ArrowRight size={16} color="var(--paper-faint)" />
                <div style={{ background: 'var(--ink-950)', padding: '8px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
                  <div style={{ color: '#5b84e8', fontWeight: '700' }}>2. Acknowledged</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}>Avg 4-12 min</div>
                </div>
                <ArrowRight size={16} color="var(--paper-faint)" />
                <div style={{ background: 'var(--ink-950)', padding: '8px 14px', borderRadius: 'var(--radius)', border: `1px solid ${finding.finding_id.includes('FAST') ? 'var(--sev-critical)' : 'var(--line)'}` }}>
                  <div style={{ color: finding.finding_id.includes('FAST') ? '#e0616b' : '#5b84e8', fontWeight: '700' }}>3. Investigation</div>
                  <div style={{ fontSize: '0.72rem', color: finding.finding_id.includes('FAST') ? '#e0616b' : 'var(--paper-faint)' }}>
                    {finding.finding_id.includes('FAST') ? 'Flagged fast duration' : 'Case triage'}
                  </div>
                </div>
                <ArrowRight size={16} color="var(--paper-faint)" />
                <div style={{ background: 'var(--ink-950)', padding: '8px 14px', borderRadius: 'var(--radius)', border: `1px solid ${finding.finding_id.includes('ESC') ? 'var(--sev-critical)' : 'var(--line)'}` }}>
                  <div style={{ color: finding.finding_id.includes('ESC') ? '#e0616b' : '#5b84e8', fontWeight: '700' }}>4. Escalation</div>
                  <div style={{ fontSize: '0.72rem', color: finding.finding_id.includes('ESC') ? '#e0616b' : 'var(--paper-faint)' }}>
                    {finding.finding_id.includes('ESC') ? 'Missing record' : 'Tier-2 / IR'}
                  </div>
                </div>
                <ArrowRight size={16} color="var(--paper-faint)" />
                <div style={{ background: 'var(--ink-950)', padding: '8px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
                  <div style={{ color: '#5fac86', fontWeight: '700' }}>5. Closure disposition</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}>Root cause & remediation</div>
                </div>
              </div>
            </div>

            {/* Evidence Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--paper)' }}>
                  Underlying forensic evidence records ({finding.evidence?.length || 0} sample records)
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--paper-faint)' }}>Prove: raw database records</span>
              </div>

              <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
                {finding.evidence && finding.evidence.length > 0 ? (
                  <table className="data-table" style={{ fontSize: '0.78rem' }}>
                    <thead>
                      <tr>
                        {Object.keys(finding.evidence[0]).slice(0, 6).map(key => (
                          <th key={key}>{key.replace('_', ' ')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {finding.evidence.map((row, idx) => (
                        <tr key={idx}>
                          {Object.keys(finding.evidence[0]).slice(0, 6).map(key => (
                            <td key={key} style={{ fontFamily: typeof row[key] === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                              {String(row[key])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--paper-faint)' }}>No evidence records attached.</div>
                )}
              </div>
            </div>

            {/* "How to Heal" Corrective Actions */}
            <div style={{ background: 'rgba(95, 172, 134, 0.08)', border: '1px solid rgba(95, 172, 134, 0.25)', borderRadius: 'var(--radius)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#5fac86' }}>
                  Recommended corrective action plan ("heal the wound")
                </span>
                <button
                  onClick={handleCreateRemediation}
                  disabled={submitting}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '3px 10px' }}
                >
                  <PlusCircle size={14} color="#5fac86" />
                  <span>{remediationCreated ? 'Added to tracker' : 'Add to remediation tracker'}</span>
                </button>
              </div>

              <ul style={{ paddingLeft: '20px', fontSize: '0.84rem', color: 'var(--paper-dim)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {finding.recommended_actions?.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

            {/* Supervisor Notes & Decision Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--paper-dim)' }}>
                Supervisor decision notes / audit justification:
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter manual supervisory observations, justification, or clarification notes..."
                style={{
                  background: 'var(--ink-800)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--paper)',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        )}

        {/* Footer Decision Buttons */}
        {!loading && !error && finding && (
        <div className="modal-footer" style={{ flexWrap: 'wrap' }}>
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--paper-faint)' }}>Current status:</span>
            <span className="badge badge-low">{finding.review_status}</span>
          </div>

          <button
            onClick={() => handleStatusChange('Requires CSE Clarification')}
            disabled={submitting}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            <HelpCircle size={14} color="#d3c15f" />
            <span>Request clarification</span>
          </button>

          <button
            onClick={() => handleStatusChange('Dismissed')}
            disabled={submitting}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            <XCircle size={14} color="var(--paper-faint)" />
            <span>Dismiss finding</span>
          </button>

          <button
            onClick={() => handleStatusChange('Confirmed')}
            disabled={submitting}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            <CheckCircle size={14} />
            <span>Confirm finding</span>
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
