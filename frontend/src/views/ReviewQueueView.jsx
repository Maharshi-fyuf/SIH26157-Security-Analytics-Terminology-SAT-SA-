import React, { useEffect, useState } from 'react';
import { ListTodo, CheckCircle, Clock, AlertTriangle, HelpCircle, XCircle } from 'lucide-react';
import { fetchReviewQueue, updateFindingStatus } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

export default function ReviewQueueView({ onSelectFinding }) {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchReviewQueue();
      setQueue(res);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load the review queue.');
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
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overview Info Banner */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--paper)' }}>
            Active supervisory triage queue ({queue.length} items)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', marginTop: '2px' }}>
            Sorted by risk weight, confidence, and negative-space criticality. Update review status to record supervisor decisions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem' }}>
          <div><strong style={{ color: '#e0616b' }}>{queue.filter(q => q.priority === 'P1').length}</strong> P1 critical</div>
          <div><strong style={{ color: '#d99a52' }}>{queue.filter(q => q.priority === 'P2').length}</strong> P2 elevated</div>
          <div><strong style={{ color: '#5b84e8' }}>{queue.filter(q => q.priority === 'P3').length}</strong> P3 standard</div>
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
                <th>Supervisory finding</th>
                <th>Attention weight</th>
                <th>Evidence items</th>
                <th>Recommended primary action</th>
                <th>Review status decision</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item) => {
                const isP1 = item.priority === 'P1';
                const isP2 = item.priority === 'P2';
                const pColor = isP1 ? '#e0616b' : (isP2 ? '#d99a52' : '#5b84e8');

                return (
                  <tr key={item.finding_id}>
                    <td>
                      <span style={{
                        background: `${pColor}22`,
                        color: pColor,
                        border: `1px solid ${pColor}55`,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius)',
                        fontWeight: '700',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {item.priority}
                      </span>
                    </td>
                    <td style={{ fontWeight: '700', color: 'var(--paper)' }}>
                      {item.cse_id}
                    </td>
                    <td style={{ fontWeight: '600', maxWidth: '320px' }}>
                      {item.title}
                    </td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: item.risk_score >= 80 ? '#e0616b' : '#5b84e8' }}>
                        {item.risk_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}> / 100</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                      {item.evidence_count} records
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', maxWidth: '280px' }}>
                      {item.primary_action}
                    </td>
                    <td>
                      <select
                        value={item.review_status}
                        disabled={updatingId === item.finding_id}
                        onChange={(e) => handleStatusChange(item.finding_id, e.target.value)}
                        style={{
                          background: 'var(--ink-800)',
                          border: '1px solid var(--line)',
                          color: item.review_status === 'Confirmed' ? '#5fac86' : (item.review_status === 'Dismissed' ? 'var(--paper-dim)' : 'var(--paper)'),
                          padding: '4px 8px',
                          borderRadius: 'var(--radius)',
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
