import React, { useEffect, useState } from 'react';
import { Building2, Search, Filter, ArrowUpRight } from 'lucide-react';
import { fetchCSEs } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

export default function CSEsView({ onSelectCSE, onNavigate }) {
  const [cses, setCses] = useState([]);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCSEs();
  }, []);

  const loadCSEs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchCSEs();
      setCses(res);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load the CSE directory.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingNotice label="Loading CSE directory..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load the CSE directory" description={error} actionLabel="Retry" onAction={loadCSEs} />;
  }

  if (cses.length === 0) {
    return (
      <StateMessage
        tone="empty"
        title="No entities on file"
        description={'No Critical Sector Entities have been generated or ingested yet. Use "Generate Demo Dataset" in the top bar to populate the directory.'}
        actionLabel="Reload"
        onAction={loadCSEs}
      />
    );
  }

  const sectors = ['All', ...new Set(cses.map(c => c.sector))];

  const filtered = cses.filter(c => {
    const matchSearch = c.cse_id.toLowerCase().includes(search.toLowerCase()) ||
                        c.cse_name.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === 'All' || c.sector === sectorFilter;
    return matchSearch && matchSector;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Filter Controls Bar */}
      <div className="card" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
          <Search size={16} color="var(--paper-faint)" />
          <input
            type="text"
            placeholder="Search CSE ID, name or sector..."
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={15} color="var(--paper-faint)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--paper-dim)' }}>Sector:</span>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            style={{
              background: 'var(--ink-800)',
              border: '1px solid var(--line)',
              color: 'var(--paper)',
              padding: '4px 10px',
              borderRadius: 'var(--radius)',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          >
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* CSEs Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <StateMessage tone="empty" title="No matching entities" description="No CSE matches this search and filter combination. Try clearing the search or sector filter." />
        ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Entity ID</th>
                <th>Critical sector entity name</th>
                <th>Sector</th>
                <th>Tier criticality</th>
                <th>Attention score</th>
                <th>Supervisory review status</th>
                <th>Detected signals</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
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
                  <tr
                    key={c.cse_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { onSelectCSE(c.cse_id); onNavigate('cse-profile'); }}
                  >
                    <td style={{ fontWeight: '600', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>
                      {c.cse_id}
                    </td>
                    <td style={{ fontWeight: '600' }}>
                      {c.cse_name}
                      {c.cse_id === 'CSE-07' && (
                        <span className="badge badge-critical" style={{ marginLeft: '8px', fontSize: '0.68rem' }}>
                          Star demo
                        </span>
                      )}
                    </td>
                    <td>{c.sector}</td>
                    <td><span className="badge badge-low">{c.criticality}</span></td>
                    <td>
                      <span style={{ fontWeight: '700', fontSize: '1.05rem', color: scoreColor, fontFamily: 'var(--font-mono)' }}>
                        {c.attention_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}> / 100</span>
                    </td>
                    <td>
                      <span className={`badge ${badgeClass}`}>{c.review_status}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
                      {c.findings_count} signals
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCSE(c.cse_id);
                          onNavigate('cse-profile');
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        <span>Profile</span>
                        <ArrowUpRight size={13} />
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
