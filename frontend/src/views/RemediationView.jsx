import React, { useEffect, useState } from 'react';
import { HeartHandshake, PlusCircle, CheckCircle, Clock, Filter, AlertTriangle } from 'lucide-react';
import { fetchRemediations, createRemediation, updateRemediation, fetchCSEs } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

export default function RemediationView() {
  const [actions, setActions] = useState([]);
  const [cses, setCses] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAction, setNewAction] = useState({
    cse_id: 'CSE-07',
    title: '',
    owner: 'CSE SOC Operations Lead',
    due_date: '2026-10-31',
    priority: 'High',
    verification_metric: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [actData, cData] = await Promise.all([
        fetchRemediations(),
        fetchCSEs()
      ]);
      setActions(actData);
      setCses(cData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load remediation actions.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (actionId, newStatus) => {
    try {
      await updateRemediation(actionId, { status: newStatus });
      setActions(prev => prev.map(a => a.action_id === actionId ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newAction.title || !newAction.verification_metric) {
      alert('Please fill in the action title and verification metric.');
      return;
    }
    try {
      await createRemediation(newAction);
      setShowModal(false);
      setNewAction({
        cse_id: 'CSE-07',
        title: '',
        owner: 'CSE SOC Operations Lead',
        due_date: '2026-10-31',
        priority: 'High',
        verification_metric: '',
        notes: ''
      });
      loadData();
    } catch (err) {
      alert(`Creation failed: ${err.message}`);
    }
  };

  if (loading) {
    return <LoadingNotice label="Loading remediation tracker..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load remediations" description={error} actionLabel="Retry" onAction={loadData} />;
  }

  const filtered = actions.filter(a => statusFilter === 'All' || a.status === statusFilter);

  const statusCounts = {
    total: actions.length,
    open: actions.filter(a => a.status === 'Open').length,
    inProgress: actions.filter(a => a.status === 'In Progress').length,
    completed: actions.filter(a => a.status === 'Completed').length,
    verification: actions.filter(a => a.status === 'Verification Pending').length
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* KPI Status Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div className="card">
          <div className="kpi-label">Total corrective actions</div>
          <div className="kpi-value" style={{ color: '#5b84e8' }}>{statusCounts.total}</div>
        </div>
        <div className="card">
          <div className="kpi-label">Open actions</div>
          <div className="kpi-value" style={{ color: '#d99a52' }}>{statusCounts.open}</div>
        </div>
        <div className="card">
          <div className="kpi-label">In progress</div>
          <div className="kpi-value" style={{ color: '#d3c15f' }}>{statusCounts.inProgress}</div>
        </div>
        <div className="card">
          <div className="kpi-label">Completed / verified</div>
          <div className="kpi-value" style={{ color: '#5fac86' }}>{statusCounts.completed + statusCounts.verification}</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="card" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Filter size={15} color="var(--paper-faint)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--paper-dim)' }}>Filter status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: 'var(--ink-800)',
              border: '1px solid var(--line)',
              color: 'var(--paper)',
              padding: '4px 10px',
              borderRadius: 'var(--radius)',
              fontSize: '0.82rem'
            }}
          >
            <option value="All">All statuses ({actions.length})</option>
            <option value="Open">Open ({statusCounts.open})</option>
            <option value="In Progress">In progress ({statusCounts.inProgress})</option>
            <option value="Verification Pending">Verification pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
          style={{ fontSize: '0.82rem' }}
        >
          <PlusCircle size={15} />
          <span>Create remediation action</span>
        </button>
      </div>

      {/* Remediations Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <StateMessage
            tone="empty"
            title={actions.length === 0 ? 'No remediation actions yet' : 'No matching actions'}
            description={actions.length === 0 ? 'Create one from a finding\u2019s detail view, or use "Create Remediation Action" above.' : 'No action matches this status filter.'}
          />
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Action ID</th>
                <th>Entity</th>
                <th>Priority</th>
                <th>Corrective action item</th>
                <th>Designated owner</th>
                <th>Target due date</th>
                <th>Quantitative verification metric</th>
                <th>Progress status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((act) => {
                let pBadge = 'badge-critical';
                if (act.priority === 'High') pBadge = 'badge-high';
                if (act.priority === 'Medium') pBadge = 'badge-amber';

                return (
                  <tr key={act.action_id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: '#5b84e8' }}>
                      {act.action_id}
                    </td>
                    <td style={{ fontWeight: '700' }}>
                      {act.cse_id}
                    </td>
                    <td>
                      <span className={`badge ${pBadge}`}>{act.priority}</span>
                    </td>
                    <td style={{ fontWeight: '600', maxWidth: '300px' }}>
                      {act.title}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--paper-dim)' }}>
                      {act.owner}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                      {act.due_date || 'N/A'}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#5fac86', maxWidth: '260px' }}>
                      {act.verification_metric}
                    </td>
                    <td>
                      <select
                        value={act.status}
                        onChange={(e) => handleStatusUpdate(act.action_id, e.target.value)}
                        style={{
                          background: 'var(--ink-800)',
                          border: '1px solid var(--line)',
                          color: act.status === 'Completed' ? '#5fac86' : (act.status === 'In Progress' ? '#d3c15f' : 'var(--paper)'),
                          padding: '4px 8px',
                          borderRadius: 'var(--radius)',
                          fontSize: '0.78rem',
                          fontWeight: '600'
                        }}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Verification Pending">Verification Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Create Remediation Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--paper)' }}>
                Create supervisory corrective action
              </h3>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', display: 'block', marginBottom: '4px' }}>Target entity:</label>
                  <select
                    value={newAction.cse_id}
                    onChange={(e) => setNewAction({ ...newAction, cse_id: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', borderRadius: 'var(--radius)' }}
                  >
                    {cses.map(c => <option key={c.cse_id} value={c.cse_id}>{c.cse_id} - {c.cse_name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', display: 'block', marginBottom: '4px' }}>Action title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Implement mandatory forensic artifact attachment checklist"
                    value={newAction.title}
                    onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', borderRadius: 'var(--radius)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', display: 'block', marginBottom: '4px' }}>Designated owner:</label>
                  <input
                    type="text"
                    value={newAction.owner}
                    onChange={(e) => setNewAction({ ...newAction, owner: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', borderRadius: 'var(--radius)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', display: 'block', marginBottom: '4px' }}>Quantitative verification metric:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Critical-alert median investigation duration >= 40 minutes"
                    value={newAction.verification_metric}
                    onChange={(e) => setNewAction({ ...newAction, verification_metric: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', borderRadius: 'var(--radius)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', display: 'block', marginBottom: '4px' }}>Priority:</label>
                    <select
                      value={newAction.priority}
                      onChange={(e) => setNewAction({ ...newAction, priority: e.target.value })}
                      style={{ width: '100%', padding: '8px', background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', borderRadius: 'var(--radius)' }}
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', display: 'block', marginBottom: '4px' }}>Target due date:</label>
                    <input
                      type="date"
                      value={newAction.due_date}
                      onChange={(e) => setNewAction({ ...newAction, due_date: e.target.value })}
                      style={{ width: '100%', padding: '8px', background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', borderRadius: 'var(--radius)' }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
