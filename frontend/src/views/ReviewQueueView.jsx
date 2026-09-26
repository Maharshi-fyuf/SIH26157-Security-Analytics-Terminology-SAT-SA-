import React, { useEffect, useState } from 'react';
import { ListTodo, CheckCircle, Clock, AlertTriangle, HelpCircle, XCircle } from 'lucide-react';
import { fetchReviewQueue, updateFindingStatus } from '../api';
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function ReviewQueueView({ onSelectFinding }) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const res = await fetchReviewQueue();
      setQueue(res);
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || 'Failed to load the review queue.');
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (findingId, newStatus) => {
    try {
      setUpdatingId(findingId);
      await updateFindingStatus(findingId, newStatus);
      setQueue(prev => prev.map(item => item.finding_id === findingId ? { ...item, review_status: newStatus } : item));
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
<<<<<<< HEAD
    return <LoadingNotice label="Loading prioritized review queue..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load the review queue" description={error} actionLabel="Retry" onAction={loadQueue} />;
  }

  if (queue.length === 0) {
    return (
      <StateMessage
        tone="empty"
        title="Review queue is empty"
        description={'No findings are awaiting supervisory review. Run "Run Supervisory Analysis" in the top bar once a dataset has been ingested.'}
        actionLabel="Reload"
        onAction={loadQueue}
      />
    );
=======
    return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading prioritized review queue...</div>;
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overview Info Banner */}
<<<<<<< HEAD
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--paper)' }}>
            Active supervisory triage queue ({queue.length} items)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '2px' }}>
            Sorted by risk weight, confidence, and negative-space criticality. Update review status to record supervisor decisions.
=======
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f8fafc' }}>
            Active Supervisory Triage Queue ({queue.length} items)
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
            Sorted by Risk Weight, Confidence, and Negative-Space Criticality. Update review status to record supervisor decisions.
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem' }}>
<<<<<<< HEAD
          <div><strong style={{ color: '#e0616b' }}>{queue.filter(q => q.priority === 'P1').length}</strong> P1 critical</div>
          <div><strong style={{ color: '#d99a52' }}>{queue.filter(q => q.priority === 'P2').length}</strong> P2 elevated</div>
          <div><strong style={{ color: '#5b84e8' }}>{queue.filter(q => q.priority === 'P3').length}</strong> P3 standard</div>
=======
          <div><strong style={{ color: '#fb7185' }}>{queue.filter(q => q.priority === 'P1').length}</strong> P1 Critical</div>
          <div><strong style={{ color: '#fb923c' }}>{queue.filter(q => q.priority === 'P2').length}</strong> P2 Elevated</div>
          <div><strong style={{ color: '#38bdf8' }}>{queue.filter(q => q.priority === 'P3').length}</strong> P3 Standard</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        </div>
      </div>

      {/* Queue Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Entity</th>
<<<<<<< HEAD
                <th>Supervisory finding</th>
                <th>Attention weight</th>
                <th>Evidence items</th>
                <th>Recommended primary action</th>
                <th>Review status decision</th>
=======
                <th>Supervisory Finding</th>
                <th>Attention Weight</th>
                <th>Evidence Items</th>
                <th>Recommended Primary Action</th>
                <th>Review Status Decision</th>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => {
                const isP1 = item.priority === 'P1';
                const isP2 = item.priority === 'P2';
<<<<<<< HEAD
                const pColor = isP1 ? '#e0616b' : (isP2 ? '#d99a52' : '#5b84e8');
=======
                const pColor = isP1 ? '#f43f5e' : (isP2 ? '#f97316' : '#0284c7');
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

                return (
                  <tr key={item.finding_id}>
                    <td>
                      <span style={{
                        background: `${pColor}22`,
                        color: pColor,
                        border: `1px solid ${pColor}55`,
                        padding: '3px 8px',
<<<<<<< HEAD
                        borderRadius: 'var(--radius)',
                        fontWeight: '700',
=======
                        borderRadius: '4px',
                        fontWeight: '800',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {item.priority}
                      </span>
                    </td>
<<<<<<< HEAD
                    <td style={{ fontWeight: '700', color: 'var(--paper)' }}>
=======
                    <td style={{ fontWeight: '700', color: '#f8fafc' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      {item.cse_id}
                    </td>
                    <td style={{ fontWeight: '600', maxWidth: '320px' }}>
                      {item.title}
                    </td>
                    <td>
<<<<<<< HEAD
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: item.risk_score >= 80 ? '#e0616b' : '#5b84e8' }}>
                        {item.risk_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}> / 100</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                      {item.evidence_count} records
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', maxWidth: '280px' }}>
=======
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: item.risk_score >= 80 ? '#fb7185' : '#38bdf8' }}>
                        {item.risk_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}> / 100</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>
                      {item.evidence_count} records
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8', maxWidth: '280px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      {item.primary_action}
                    </td>
                    <td>
                      <select
                        value={item.review_status}
                        disabled={updatingId === item.finding_id}
                        onChange={(e) => handleStatusChange(item.finding_id, e.target.value)}
                        style={{
<<<<<<< HEAD
                          background: 'var(--ink-800)',
                          border: '1px solid var(--line)',
                          color: item.review_status === 'Confirmed' ? '#5fac86' : (item.review_status === 'Dismissed' ? 'var(--paper-dim)' : 'var(--paper)'),
                          padding: '4px 8px',
                          borderRadius: 'var(--radius)',
=======
                          background: '#090d16',
                          border: '1px solid var(--border-subtle)',
                          color: item.review_status === 'Confirmed' ? '#34d399' : (item.review_status === 'Dismissed' ? '#94a3b8' : '#f8fafc'),
                          padding: '4px 8px',
                          borderRadius: '4px',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dismissed">Dismissed</option>
                        <option value="Requires CSE Clarification">Requires Clarification</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => onSelectFinding(item.finding_id)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Examine
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
