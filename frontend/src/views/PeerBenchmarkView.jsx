import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingDown, ArrowUpDown } from 'lucide-react';
import { fetchBenchmarks } from '../api';
<<<<<<< HEAD
import StateMessage, { LoadingNotice } from '../components/StateMessage';
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

export default function PeerBenchmarkView({ onSelectCSE, onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83

  useEffect(() => {
    loadBenchmarks();
  }, []);

  const loadBenchmarks = async () => {
    try {
      setLoading(true);
<<<<<<< HEAD
      setError(null);
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
      const res = await fetchBenchmarks();
      setData(res);
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      setError(err.message || 'Failed to load peer benchmarks.');
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
<<<<<<< HEAD
    return <LoadingNotice label="Calculating sector peer benchmarks and distributions..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load benchmarks" description={error} actionLabel="Retry" onAction={loadBenchmarks} />;
=======
    return <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Calculating sector peer benchmarks and distributions...</div>;
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  }

  const entities = Object.values(data?.entity_metrics || {});
  const medians = data?.global_medians || {};

<<<<<<< HEAD
  if (entities.length === 0) {
    return (
      <StateMessage
        tone="empty"
        title="No benchmark data yet"
        description={'Peer benchmarks need at least one CSE with alert and case data. Generate or ingest a dataset first.'}
        actionLabel="Reload"
        onAction={loadBenchmarks}
      />
    );
  }

=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Peer Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="card">
<<<<<<< HEAD
          <div className="kpi-label">Peer median critical closure</div>
          <div className="kpi-value" style={{ color: '#5b84e8' }}>{medians.crit_median_dur} min</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>Established sector baseline</div>
        </div>

        <div className="card">
          <div className="kpi-label">Peer median critical escalation</div>
          <div className="kpi-value" style={{ color: '#5fac86' }}>{medians.crit_esc_rate}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>Tier-2/IR escalation norm</div>
        </div>

        <div className="card">
          <div className="kpi-label">Peer median telemetry coverage</div>
          <div className="kpi-value" style={{ color: '#5b84e8' }}>{medians.telemetry_coverage}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>Continuous ingestion health</div>
        </div>

        <div className="card">
          <div className="kpi-label">Peer median evidence count</div>
          <div className="kpi-value" style={{ color: '#d3c15f' }}>{medians.avg_evidence} items</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--paper-faint)', marginTop: '4px' }}>Per case investigation</div>
=======
          <div className="kpi-label">Peer Median Critical Closure</div>
          <div className="kpi-value" style={{ color: '#38bdf8' }}>{medians.crit_median_dur} min</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Established Sector Baseline</div>
        </div>

        <div className="card">
          <div className="kpi-label">Peer Median Critical Escalation</div>
          <div className="kpi-value" style={{ color: '#10b981' }}>{medians.crit_esc_rate}%</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Tier-2/IR Escalation Norm</div>
        </div>

        <div className="card">
          <div className="kpi-label">Peer Median Telemetry Coverage</div>
          <div className="kpi-value" style={{ color: '#06b6d4' }}>{medians.telemetry_coverage}%</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Continuous Ingestion Health</div>
        </div>

        <div className="card">
          <div className="kpi-label">Peer Median Evidence Count</div>
          <div className="kpi-value" style={{ color: '#f59e0b' }}>{medians.avg_evidence} items</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Per Case Investigation</div>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        </div>
      </div>

      {/* Benchmarking Comparison Table */}
      <div className="card">
        <div className="card-title">
<<<<<<< HEAD
          <span>Entity benchmarks vs established peer medians</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Objective deviation metrics</span>
=======
          <span>Entity Benchmarks vs Established Peer Medians</span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Objective Deviation Metrics</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Entity ID</th>
                <th>Sector</th>
<<<<<<< HEAD
                <th>Critical closure duration</th>
                <th>Closure deviation vs peer</th>
                <th>Critical escalation rate</th>
                <th>Escalation deviation vs peer</th>
                <th>Telemetry coverage</th>
                <th>Supervisory evaluation</th>
=======
                <th>Critical Closure Duration</th>
                <th>Closure Deviation vs Peer</th>
                <th>Critical Escalation Rate</th>
                <th>Escalation Deviation vs Peer</th>
                <th>Telemetry Coverage</th>
                <th>Supervisory Evaluation</th>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
              </tr>
            </thead>
            <tbody>
              {entities.map((m) => {
                const isFast = m.crit_median_dur < 15;
                const isLowEsc = m.crit_esc_rate < 35;
                const isGapped = isFast || isLowEsc || m.telemetry_coverage < 80;

                return (
                  <tr
                    key={m.cse_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { onSelectCSE(m.cse_id); onNavigate('cse-profile'); }}
                  >
<<<<<<< HEAD
                    <td style={{ fontWeight: '700', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>
                      {m.cse_id}
                      {m.cse_id === 'CSE-07' && (
                        <span className="badge badge-critical" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>
                          Demo
=======
                    <td style={{ fontWeight: '700', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                      {m.cse_id}
                      {m.cse_id === 'CSE-07' && (
                        <span className="badge badge-critical" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>
                          DEMO
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                        </span>
                      )}
                    </td>
                    <td>{m.sector}</td>
<<<<<<< HEAD
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: isFast ? '#e0616b' : 'var(--paper)' }}>
                      {m.crit_median_dur} min
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: m.crit_dur_deviation < -50 ? '#e0616b' : '#5fac86' }}>
                      {m.crit_dur_deviation > 0 ? `+${m.crit_dur_deviation}%` : `${m.crit_dur_deviation}%`}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: isLowEsc ? '#e0616b' : 'var(--paper)' }}>
                      {m.crit_esc_rate}%
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: m.crit_esc_deviation < -40 ? '#e0616b' : '#5fac86' }}>
                      {m.crit_esc_deviation > 0 ? `+${m.crit_esc_deviation}%` : `${m.crit_esc_deviation}%`}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: m.telemetry_coverage < 85 ? '#d99a52' : '#5fac86' }}>
=======
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: isFast ? '#fb7185' : '#f8fafc' }}>
                      {m.crit_median_dur} min
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: m.crit_dur_deviation < -50 ? '#fb7185' : '#34d399' }}>
                      {m.crit_dur_deviation > 0 ? `+${m.crit_dur_deviation}%` : `${m.crit_dur_deviation}%`}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: isLowEsc ? '#fb7185' : '#f8fafc' }}>
                      {m.crit_esc_rate}%
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: m.crit_esc_deviation < -40 ? '#fb7185' : '#34d399' }}>
                      {m.crit_esc_deviation > 0 ? `+${m.crit_esc_deviation}%` : `${m.crit_esc_deviation}%`}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: m.telemetry_coverage < 85 ? '#fb923c' : '#34d399' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      {m.telemetry_coverage}%
                    </td>
                    <td>
                      {isGapped ? (
<<<<<<< HEAD
                        <span className="badge badge-critical">Requires review</span>
                      ) : (
                        <span className="badge badge-green">Within peer range</span>
=======
                        <span className="badge badge-critical">Requires Review</span>
                      ) : (
                        <span className="badge badge-green">Within Peer Range</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
                      )}
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
