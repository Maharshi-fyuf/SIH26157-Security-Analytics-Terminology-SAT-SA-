import React, { useEffect, useState } from 'react';
import { Building2, Search, Filter, ArrowUpRight } from 'lucide-react';
import { fetchCSEs } from '../api';
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function CSEsView({ onSelectCSE, onNavigate }) {
  const [cses, setCses] = useState([]);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

  useEffect(() => {
    loadCSEs();
  }, []);

  const loadCSEs = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const res = await fetchCSEs();
      setCses(res);
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || 'Failed to load the CSE directory.');
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
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

=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
          <Search size={16} color="var(--paper-faint)" />
          <input
            type="text"
            placeholder="Search CSE ID, name or sector..."
=======
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search CSE ID, Name or Sector..."
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
<<<<<<< HEAD
              color: 'var(--paper)',
=======
              color: '#f8fafc',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
              fontSize: '0.88rem',
              outline: 'none',
              width: '100%'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
<<<<<<< HEAD
          <Filter size={15} color="var(--paper-faint)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--paper-dim)' }}>Sector:</span>
=======
          <Filter size={15} color="#64748b" />
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sector:</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            style={{
<<<<<<< HEAD
              background: 'var(--ink-800)',
              border: '1px solid var(--line)',
              color: 'var(--paper)',
              padding: '4px 10px',
              borderRadius: 'var(--radius)',
=======
              background: '#090d16',
              border: '1px solid var(--border-subtle)',
              color: '#f8fafc',
              padding: '4px 10px',
              borderRadius: '6px',
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
        {filtered.length === 0 ? (
          <StateMessage tone="empty" title="No matching entities" description="No CSE matches this search and filter combination. Try clearing the search or sector filter." />
        ) : (
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Entity ID</th>
<<<<<<< HEAD
                <th>Critical sector entity name</th>
                <th>Sector</th>
                <th>Tier criticality</th>
                <th>Attention score</th>
                <th>Supervisory review status</th>
                <th>Detected signals</th>
=======
                <th>Critical Sector Entity Name</th>
                <th>Sector</th>
                <th>Tier Criticality</th>
                <th>Attention Score</th>
                <th>Supervisory Review Status</th>
                <th>Detected Signals</th>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                let badgeClass = 'badge-green';
<<<<<<< HEAD
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
=======
                let scoreColor = '#34d399';
                if (c.attention_score >= 70) {
                  badgeClass = 'badge-critical';
                  scoreColor = '#fb7185';
                } else if (c.attention_score >= 50) {
                  badgeClass = 'badge-high';
                  scoreColor = '#fb923c';
                } else if (c.attention_score >= 30) {
                  badgeClass = 'badge-medium';
                  scoreColor = '#fcd34d';
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                }

                return (
                  <tr
                    key={c.cse_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { onSelectCSE(c.cse_id); onNavigate('cse-profile'); }}
                  >
<<<<<<< HEAD
                    <td style={{ fontWeight: '600', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>
=======
                    <td style={{ fontWeight: '700', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      {c.cse_id}
                    </td>
                    <td style={{ fontWeight: '600' }}>
                      {c.cse_name}
                      {c.cse_id === 'CSE-07' && (
                        <span className="badge badge-critical" style={{ marginLeft: '8px', fontSize: '0.68rem' }}>
<<<<<<< HEAD
                          Star demo
=======
                          STAR DEMO
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                        </span>
                      )}
                    </td>
                    <td>{c.sector}</td>
                    <td><span className="badge badge-low">{c.criticality}</span></td>
                    <td>
<<<<<<< HEAD
                      <span style={{ fontWeight: '700', fontSize: '1.05rem', color: scoreColor, fontFamily: 'var(--font-mono)' }}>
                        {c.attention_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--paper-faint)' }}> / 100</span>
=======
                      <span style={{ fontWeight: '800', fontSize: '1.1rem', color: scoreColor, fontFamily: 'var(--font-mono)' }}>
                        {c.attention_score}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}> / 100</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                    </td>
                    <td>
                      <span className={`badge ${badgeClass}`}>{c.review_status}</span>
                    </td>
<<<<<<< HEAD
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper-dim)' }}>
=======
                    <td style={{ fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
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
<<<<<<< HEAD
        )}
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      </div>
    </div>
  );
}
