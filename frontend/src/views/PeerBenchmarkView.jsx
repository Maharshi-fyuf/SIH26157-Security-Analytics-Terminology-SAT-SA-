import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingDown, ArrowUpDown } from 'lucide-react';
import { fetchBenchmarks } from '../api';
import StateMessage, { LoadingNotice } from '../components/StateMessage';

  useEffect(() => {
    loadBenchmarks();
  }, []);

  const loadBenchmarks = async () => {
    try {
      setLoading(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingNotice label="Calculating sector peer benchmarks and distributions..." />;
  }

  if (error) {
    return <StateMessage tone="error" title="Couldn't load benchmarks" description={error} actionLabel="Retry" onAction={loadBenchmarks} />;
  }

  const entities = Object.values(data?.entity_metrics || {});
  const medians = data?.global_medians || {};

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

        </div>
      </div>

      {/* Benchmarking Comparison Table */}
      <div className="card">
        <div className="card-title">
          <span>Entity benchmarks vs established peer medians</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Objective deviation metrics</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Entity ID</th>
                <th>Sector</th>
                <th>Critical closure duration</th>
                <th>Closure deviation vs peer</th>
                <th>Critical escalation rate</th>
                <th>Escalation deviation vs peer</th>
                <th>Telemetry coverage</th>
                <th>Supervisory evaluation</th>
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
                    <td style={{ fontWeight: '700', color: '#5b84e8', fontFamily: 'var(--font-mono)' }}>
                      {m.cse_id}
                      {m.cse_id === 'CSE-07' && (
                        <span className="badge badge-critical" style={{ marginLeft: '6px', fontSize: '0.65rem' }}>
                          Demo
                        </span>
                      )}
                    </td>
                    <td>{m.sector}</td>
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
                      {m.telemetry_coverage}%
                    </td>
                    <td>
                      {isGapped ? (
                        <span className="badge badge-critical">Requires review</span>
                      ) : (
                        <span className="badge badge-green">Within peer range</span>
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
