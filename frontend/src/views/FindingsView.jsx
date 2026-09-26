import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowUpRight, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import { fetchFindings, fetchCSEs } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingNotice label="Loading supervisory findings..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load findings" description={error} actionLabel="Retry" onAction={loadData} />;
  }

  if (findings.length === 0) {
    return (
      <StateMessage
        tone="empty"
        title="No findings yet"
        description={'No supervisory findings have been generated yet. Run "Run Supervisory Analysis" in the top bar after a dataset has been ingested.'}
        actionLabel="Reload"
        onAction={loadData}
      />
    );
  }

          <input
            type="text"
            placeholder="Search findings, keywords or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--paper)',
              fontSize: '0.88rem',
              outline: 'none',
              width: '100%'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--paper-dim)' }}>Entity:</span>
            <select
              value={cseFilter}
              onChange={(e) => setCseFilter(e.target.value)}
              style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', padding: '4px 8px', borderRadius: 'var(--radius)', fontSize: '0.8rem' }}
            >
              <option value="All">All CSEs</option>
              {cses.map(c => <option key={c.cse_id} value={c.cse_id}>{c.cse_id}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--paper-dim)' }}>Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', padding: '4px 8px', borderRadius: 'var(--radius)', fontSize: '0.8rem' }}
            >
              <option value="All">All severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--paper-dim)' }}>Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ background: 'var(--ink-800)', border: '1px solid var(--line)', color: 'var(--paper)', padding: '4px 8px', borderRadius: 'var(--radius)', fontSize: '0.8rem' }}
            >
              <option value="All">All types</option>
              <option value="Execution Gap">Execution Gap</option>
              <option value="Negative Space">Negative Space</option>
              <option value="Metric Gaming">Metric Gaming</option>
              <option value="Multivariate Anomaly">Multivariate Anomaly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Findings Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <StateMessage tone="empty" title="No matching findings" description="No finding matches this search and filter combination. Try clearing a filter." />
        ) : (
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => {
                let badgeClass = 'badge-critical';
                if (f.severity === 'High') badgeClass = 'badge-high';
                if (f.severity === 'Medium') badgeClass = 'badge-medium';

                let statusBadge = 'badge-low';
                if (f.review_status === 'Confirmed') statusBadge = 'badge-green';
                if (f.review_status === 'Dismissed') statusBadge = 'badge-secondary';
                if (f.review_status === 'Requires CSE Clarification') statusBadge = 'badge-amber';

                return (
                  <tr
                    key={f.finding_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectFinding(f.finding_id)}
                  >
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: '#5b84e8' }}>
                      {f.finding_id}
                    </td>
                    <td style={{ fontWeight: '700' }}>
                      {f.cse_id}
                    </td>
                    <td>
                      <span className="badge badge-low">{f.finding_type}</span>
                    </td>
                    <td>
                      <span className={`badge ${badgeClass}`}>{f.severity}</span>
                    </td>
                    <td style={{ fontWeight: '600', maxWidth: '380px' }}>
                      {f.title}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#5fac86' }}>
                      {Math.round(f.confidence * 100)}%
                    </td>
                    <td>
                      <span className={`badge ${statusBadge}`}>{f.review_status}</span>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFinding(f.finding_id);
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                      >
                        Evidence
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
