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
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function FindingDetailModal({ findingId, onClose, onStatusUpdated }) {
  const [finding, setFinding] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [remediationCreated, setRemediationCreated] = useState(false);

  useEffect(() => {
    if (findingId) loadDetail(findingId);
  }, [findingId]);

  const loadDetail = async (id) => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const data = await fetchFindingDetail(id);
      setFinding(data);
      setNotes(data.supervisor_notes || '');
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || 'Failed to load this finding.');
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
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
=======
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={`badge ${finding?.severity === 'Critical' ? 'badge-critical' : (finding?.severity === 'High' ? 'badge-high' : 'badge-amber')}`}>
              {finding?.severity}
            </span>
            <span className="badge badge-low">{finding?.finding_type}</span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              {finding?.finding_id} // {finding?.cse_id}
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {loading ? (
<<<<<<< HEAD
          <div className="modal-body">
            <LoadingNotice label="Loading finding evidence..." />
          </div>
        ) : error ? (
          <div className="modal-body">
            <StateMessage tone="error" title="Couldn't load this finding" description={error} actionLabel="Retry" onAction={() => loadDetail(findingId)} />
          </div>
=======
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading finding evidence...</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        ) : (
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Title & Description */}
            <div>
<<<<<<< HEAD
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--paper)', marginBottom: '8px' }}>
                {finding.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--paper-dim)', lineHeight: 1.6 }}>
=======
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', marginBottom: '8px' }}>
                {finding.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                {finding.description}
              </p>
            </div>

            {/* Explainability Matrix: Signal, Baseline, Observed, Deviation */}
<<<<<<< HEAD
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Signal</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--paper)', fontWeight: '600', marginTop: '4px' }}>
=======
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <div style={{ background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Signal</div>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc', fontWeight: '600', marginTop: '4px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {finding.metrics?.signal || 'Operational metric anomaly'}
                </div>
              </div>

<<<<<<< HEAD
              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Baseline norm</div>
                <div style={{ fontSize: '0.82rem', color: '#5b84e8', fontWeight: '600', marginTop: '4px' }}>
=======
              <div style={{ background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Baseline Norm</div>
                <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: '600', marginTop: '4px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {finding.metrics?.baseline || 'Peer sector median'}
                </div>
              </div>

<<<<<<< HEAD
              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Observed entity value</div>
                <div style={{ fontSize: '0.82rem', color: '#e0616b', fontWeight: '600', marginTop: '4px' }}>
=======
              <div style={{ background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Observed Entity Value</div>
                <div style={{ fontSize: '0.82rem', color: '#fb7185', fontWeight: '600', marginTop: '4px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                  {finding.metrics?.observed || 'Significant deviation'}
                </div>
              </div>

<<<<<<< HEAD
              <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--paper-faint)', fontWeight: '600' }}>Confidence index</div>
                <div style={{ fontSize: '0.82rem', color: '#5fac86', fontWeight: '600', marginTop: '4px' }}>
                  {Math.round(finding.confidence * 100)}% (strong heuristic)
=======
              <div style={{ background: '#090d16', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Confidence Index</div>
                <div style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: '600', marginTop: '4px' }}>
                  {Math.round(finding.confidence * 100)}% (Strong Heuristic)
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                </div>
              </div>
            </div>

            {/* Lifecycle Flowchart */}
<<<<<<< HEAD
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
=======
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '14px' }}>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>
                Operational Lifecycle Timeline
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', textAlign: 'center' }}>
                <div style={{ background: '#090d16', padding: '8px 14px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: '#38bdf8', fontWeight: '700' }}>1. Alert Created</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>SIEM / EDR Sensor</div>
                </div>
                <ArrowRight size={16} color="#64748b" />
                <div style={{ background: '#090d16', padding: '8px 14px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: '#38bdf8', fontWeight: '700' }}>2. Acknowledged</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Avg 4-12 min</div>
                </div>
                <ArrowRight size={16} color="#64748b" />
                <div style={{ background: '#090d16', padding: '8px 14px', borderRadius: '4px', border: `1px solid ${finding.finding_id.includes('FAST') ? '#f43f5e' : 'var(--border-subtle)'}` }}>
                  <div style={{ color: finding.finding_id.includes('FAST') ? '#fb7185' : '#38bdf8', fontWeight: '700' }}>3. Investigation</div>
                  <div style={{ fontSize: '0.72rem', color: finding.finding_id.includes('FAST') ? '#fb7185' : '#64748b' }}>
                    {finding.finding_id.includes('FAST') ? 'Flagged Fast Duration' : 'Case Triage'}
                  </div>
                </div>
                <ArrowRight size={16} color="#64748b" />
                <div style={{ background: '#090d16', padding: '8px 14px', borderRadius: '4px', border: `1px solid ${finding.finding_id.includes('ESC') ? '#f43f5e' : 'var(--border-subtle)'}` }}>
                  <div style={{ color: finding.finding_id.includes('ESC') ? '#fb7185' : '#38bdf8', fontWeight: '700' }}>4. Escalation</div>
                  <div style={{ fontSize: '0.72rem', color: finding.finding_id.includes('ESC') ? '#fb7185' : '#64748b' }}>
                    {finding.finding_id.includes('ESC') ? 'Missing Record' : 'Tier-2 / IR'}
                  </div>
                </div>
                <ArrowRight size={16} color="#64748b" />
                <div style={{ background: '#090d16', padding: '8px 14px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: '#10b981', fontWeight: '700' }}>5. Closure Disposition</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Root Cause & Remediation</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                </div>
              </div>
            </div>

            {/* Evidence Table */}
            <div>
<<<<<<< HEAD
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--paper)' }}>
                  Underlying forensic evidence records ({finding.evidence?.length || 0} sample records)
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--paper-faint)' }}>Prove: raw database records</span>
              </div>

              <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
=======
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f8fafc' }}>
                  Underlying Forensic Evidence Records ({finding.evidence?.length || 0} sample records)
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>PROVE: Raw Database Records</span>
              </div>

              <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--paper-faint)' }}>No evidence records attached.</div>
=======
                  <div style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>No evidence records attached.</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                )}
              </div>
            </div>

            {/* "How to Heal" Corrective Actions */}
<<<<<<< HEAD
            <div style={{ background: 'rgba(95, 172, 134, 0.08)', border: '1px solid rgba(95, 172, 134, 0.25)', borderRadius: 'var(--radius)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#5fac86' }}>
                  Recommended corrective action plan ("heal the wound")
=======
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#34d399' }}>
                  Recommended Corrective Action Plan ("HEAL THE WOUND")
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                </span>
                <button
                  onClick={handleCreateRemediation}
                  disabled={submitting}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '3px 10px' }}
                >
<<<<<<< HEAD
                  <PlusCircle size={14} color="#5fac86" />
                  <span>{remediationCreated ? 'Added to tracker' : 'Add to remediation tracker'}</span>
                </button>
              </div>

              <ul style={{ paddingLeft: '20px', fontSize: '0.84rem', color: 'var(--paper-dim)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
=======
                  <PlusCircle size={14} color="#10b981" />
                  <span>{remediationCreated ? 'Added to Tracker!' : 'Add to Remediation Tracker'}</span>
                </button>
              </div>

              <ul style={{ paddingLeft: '20px', fontSize: '0.84rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                {finding.recommended_actions?.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

            {/* Supervisor Notes & Decision Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
<<<<<<< HEAD
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--paper-dim)' }}>
                Supervisor decision notes / audit justification:
=======
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8' }}>
                Supervisor Decision Notes / Audit Justification:
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter manual supervisory observations, justification, or clarification notes..."
                style={{
<<<<<<< HEAD
                  background: 'var(--ink-800)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--paper)',
=======
                  background: '#090d16',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#f8fafc',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
        {!loading && !error && finding && (
        <div className="modal-footer" style={{ flexWrap: 'wrap' }}>
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--paper-faint)' }}>Current status:</span>
            <span className="badge badge-low">{finding.review_status}</span>
=======
        <div className="modal-footer">
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Status:</span>
            <span className="badge badge-low">{finding?.review_status}</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>

          <button
            onClick={() => handleStatusChange('Requires CSE Clarification')}
            disabled={submitting}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
<<<<<<< HEAD
            <HelpCircle size={14} color="#d3c15f" />
            <span>Request clarification</span>
=======
            <HelpCircle size={14} color="#f59e0b" />
            <span>Request Clarification</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </button>

          <button
            onClick={() => handleStatusChange('Dismissed')}
            disabled={submitting}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
<<<<<<< HEAD
            <XCircle size={14} color="var(--paper-faint)" />
            <span>Dismiss finding</span>
=======
            <XCircle size={14} color="#64748b" />
            <span>Dismiss Finding</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </button>

          <button
            onClick={() => handleStatusChange('Confirmed')}
            disabled={submitting}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
<<<<<<< HEAD
            <CheckCircle size={14} />
            <span>Confirm finding</span>
          </button>
        </div>
        )}
=======
            <CheckCircle size={14} color="#fff" />
            <span>Confirm Finding</span>
          </button>
        </div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      </div>
    </div>
  );
}
