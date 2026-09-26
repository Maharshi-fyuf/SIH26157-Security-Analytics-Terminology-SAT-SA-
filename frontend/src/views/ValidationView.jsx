import React, { useEffect, useState } from 'react';
import { CheckCheck, CheckCircle2, XCircle, AlertCircle, UserCheck } from 'lucide-react';
import { fetchValidation } from '../api';
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function ValidationView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

  useEffect(() => {
    loadValidation();
  }, []);

  const loadValidation = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const res = await fetchValidation();
      setData(res);
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || 'Failed to load validation metrics.');
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
    return <LoadingNotice label="Evaluating empirical ground-truth validation metrics..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load validation metrics" description={error} actionLabel="Retry" onAction={loadValidation} />;
  }

  const overall = data?.overall || {};
  const evaluations = data?.evaluations || [];
  const human = data?.human_validation || {};

  if (evaluations.length === 0) {
    return (
      <StateMessage
        tone="empty"
        title="No ground-truth controls loaded"
        description={'Empirical validation needs ground-truth control records. These are seeded by the demo dataset generator.'}
        actionLabel="Reload"
        onAction={loadValidation}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro Banner */}
      <div className="card" style={{ padding: '16px 20px', borderLeft: '3px solid #5fac86' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--paper)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCheck size={20} color="#5fac86" />
          <span>Empirical analytics validation against ground truth (SIH evaluation standard)</span>
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'var(--paper-dim)', marginTop: '4px', lineHeight: 1.5 }}>
          To demonstrate rigorous algorithmic reliability without black-box opacity, the SAT-SA supervisory engine is benchmarked against internal ground-truth controls. True positives, false positives, false negatives, precision, recall, and F1 score are computed dynamically from active database state.
=======
    return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Evaluating empirical ground-truth validation metrics...</div>;
  }

  const overall = data?.overall || {};
  const byCategory = data?.by_category || {};
  const evaluations = data?.evaluations || [];
  const human = data?.human_validation || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro Banner */}
      <div className="card" style={{ padding: '16px 20px', borderLeft: '4px solid #10b981' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCheck size={20} color="#10b981" />
          <span>Empirical Analytics Validation against Ground Truth (SIH Evaluation Standard)</span>
        </h3>
        <p style={{ fontSize: '0.84rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.5 }}>
          To demonstrate rigorous algorithmic reliability without black-box opacity, the SAT-SA supervisory engine is benchmarked against internal ground-truth controls. True Positives, False Positives, False Negatives, Precision, Recall, and F1 Score are computed dynamically from active database state.
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        </p>
      </div>

      {/* KPI Cards: Precision, Recall, F1 Score */}
<<<<<<< HEAD
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div className="kpi-card">
          <div className="kpi-label">Precision rate</div>
          <div className="kpi-value" style={{ color: '#5fac86' }}>
            {Math.round((overall.precision || 0) * 100)}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            TP / (TP + FP) — detection reliability
=======
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="kpi-card">
          <div className="kpi-label">Precision Rate</div>
          <div className="kpi-value" style={{ color: '#10b981' }}>
            {Math.round(overall.precision * 100)}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            TP / (TP + FP) — Detection Reliability
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>
        </div>

        <div className="kpi-card">
<<<<<<< HEAD
          <div className="kpi-label">Recall (sensitivity)</div>
          <div className="kpi-value" style={{ color: '#5b84e8' }}>
            {Math.round((overall.recall || 0) * 100)}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            TP / (TP + FN) — coverage completeness
=======
          <div className="kpi-label">Recall (Sensitivity)</div>
          <div className="kpi-value" style={{ color: '#06b6d4' }}>
            {Math.round(overall.recall * 100)}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            TP / (TP + FN) — Coverage Completeness
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>
        </div>

        <div className="kpi-card">
<<<<<<< HEAD
          <div className="kpi-label">F1 composite score</div>
          <div className="kpi-value" style={{ color: '#5b84e8' }}>
            {overall.f1_score}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            Harmonic mean of precision & recall
=======
          <div className="kpi-label">F1 Composite Score</div>
          <div className="kpi-value" style={{ color: '#38bdf8' }}>
            {overall.f1_score}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Harmonic Mean of Precision & Recall
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>
        </div>

        <div className="kpi-card">
<<<<<<< HEAD
          <div className="kpi-label">Ground truth controls</div>
          <div className="kpi-value" style={{ color: '#d3c15f' }}>
            {overall.total_ground_truth_items || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>
            {overall.true_positives} TP | {overall.true_negatives} clean controls
=======
          <div className="kpi-label">Ground Truth Controls</div>
          <div className="kpi-value" style={{ color: '#f59e0b' }}>
            {overall.total_ground_truth_items || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            {overall.true_positives} TP | {overall.true_negatives} Clean Controls
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>
        </div>
      </div>

      {/* Human-in-the-loop Validation Tracking */}
      <div className="card">
        <div className="card-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
<<<<<<< HEAD
            <UserCheck size={18} color="#5b84e8" />
            <span>Human-in-the-loop supervisory feedback calibration</span>
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Supervisory decisions recorded</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginTop: '8px' }}>
          <div style={{ background: 'var(--ink-800)', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#5fac86', fontFamily: 'var(--font-mono)' }}>{human.confirmed_by_expert}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--paper-dim)', marginTop: '2px' }}>Confirmed findings</div>
          </div>
          <div style={{ background: 'var(--ink-800)', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--paper-dim)', fontFamily: 'var(--font-mono)' }}>{human.dismissed_by_expert}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--paper-dim)', marginTop: '2px' }}>Dismissed as benign</div>
          </div>
          <div style={{ background: 'var(--ink-800)', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d3c15f', fontFamily: 'var(--font-mono)' }}>{human.requires_clarification}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--paper-dim)', marginTop: '2px' }}>Awaiting entity response</div>
          </div>
          <div style={{ background: 'var(--ink-800)', padding: '12px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>{human.total_reviewed}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--paper-dim)', marginTop: '2px' }}>Total expert triaged</div>
=======
            <UserCheck size={18} color="#06b6d4" />
            <span>Human-in-the-Loop Supervisory Feedback Calibration</span>
          </span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Supervisory Decisions Recorded</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginTop: '8px' }}>
          <div style={{ background: '#090d16', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399', fontFamily: 'var(--font-mono)' }}>{human.confirmed_by_expert}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Confirmed Findings</div>
          </div>
          <div style={{ background: '#090d16', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{human.dismissed_by_expert}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Dismissed as Benign</div>
          </div>
          <div style={{ background: '#090d16', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>{human.requires_clarification}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Awaiting Entity Response</div>
          </div>
          <div style={{ background: '#090d16', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{human.total_reviewed}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Total Expert Triaged</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </div>
        </div>
      </div>

      {/* Ground Truth Evaluation Table */}
      <div className="card">
        <div className="card-title">
<<<<<<< HEAD
          <span>Ground truth benchmark verification table</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Dynamic empirical evaluation</span>
=======
          <span>Ground Truth Benchmark Verification Table</span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Dynamic Empirical Evaluation</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
<<<<<<< HEAD
                <th>Test control ID</th>
                <th>Entity</th>
                <th>Target operational pattern</th>
                <th>Expected flag</th>
                <th>Algorithm result</th>
                <th>Empirical status</th>
                <th>Benchmark rationale</th>
=======
                <th>Test Control ID</th>
                <th>Entity</th>
                <th>Target Operational Pattern</th>
                <th>Expected Flag</th>
                <th>Algorithm Result</th>
                <th>Empirical Status</th>
                <th>Benchmark Rationale</th>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
              </tr>
            </thead>
            <tbody>
              {evaluations.map((ev) => {
<<<<<<< HEAD
=======
                const isTP = ev.status.includes('True Positive');
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                const isTN = ev.status.includes('True Negative');
                const isFP = ev.status.includes('False Positive');
                const isFN = ev.status.includes('False Negative');

                let statusBadge = 'badge-green';
                let icon = <CheckCircle2 size={13} />;
                if (isTN) {
                  statusBadge = 'badge-low';
                } else if (isFP || isFN) {
                  statusBadge = 'badge-critical';
                  icon = <XCircle size={13} />;
                }

                return (
                  <tr key={ev.ground_truth_id}>
<<<<<<< HEAD
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: '#5b84e8' }}>
=======
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#38bdf8' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      {ev.ground_truth_id}
                    </td>
                    <td style={{ fontWeight: '700' }}>
                      {ev.cse_id}
                    </td>
                    <td style={{ fontWeight: '600', maxWidth: '300px' }}>
                      {ev.title}
                    </td>
                    <td>
                      <span className={`badge ${ev.expected_flag ? 'badge-amber' : 'badge-low'}`}>
<<<<<<< HEAD
                        {ev.expected_flag ? 'Expected concern' : 'Healthy control'}
=======
                        {ev.expected_flag ? 'Expected Concern' : 'Healthy Control'}
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${ev.detected ? 'badge-critical' : 'badge-green'}`}>
<<<<<<< HEAD
                        {ev.detected ? 'Flagged by engine' : 'No concern'}
=======
                        {ev.detected ? 'Flagged by Engine' : 'No Concern'}
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${statusBadge}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {icon}
                        <span>{ev.status}</span>
                      </span>
                    </td>
<<<<<<< HEAD
                    <td style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', maxWidth: '300px' }}>
=======
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8', maxWidth: '300px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      {ev.rationale}
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
