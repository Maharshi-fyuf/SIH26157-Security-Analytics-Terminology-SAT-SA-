import React, { useEffect, useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, FileSpreadsheet, ShieldAlert, History, Download } from 'lucide-react';
import { uploadDataset, fetchAuditLogs } from '../api';
import StateMessage from '../components/StateMessage';

export default function DataUploadView() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [logsError, setLogsError] = useState(null);

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    try {
      setLogsError(null);
      const logs = await fetchAuditLogs();
      setAuditLogs(logs);
    } catch (err) {
      console.error(err);
      setLogsError(err.message || 'Failed to load the audit trail.');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadDataset(file);
      setResult(res);
      loadAuditLogs();
    } catch (err) {
      setResult({ status: 'error', details: err.message });
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "alert_id,cse_id,asset_id,timestamp,severity,category,source,acknowledged_at,closed_at,duration_minutes,disposition\n" +
      "ALT-SAMPLE-01,CSE-01,AST-001,2026-08-10 14:20:00,Critical,Ransomware Precursor,EDR - Sentinel,2026-08-10 14:25:00,2026-08-10 15:15:00,50.0,True Positive\n" +
      "ALT-SAMPLE-02,CSE-07,AST-004,2026-08-11 09:12:00,Critical,SCADA Protocol Deviation,OT-Inspector,2026-08-11 09:15:00,2026-08-11 09:22:00,7.0,False Positive\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sat_sa_alert_sample_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Upload and Ingestion Card */}
      <div className="card">
        <div className="card-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UploadCloud size={18} color="#5b84e8" />
            <span>Air-gapped local submission ingestion (CSV / JSON)</span>
          </span>
          <button onClick={downloadSampleCSV} className="btn btn-secondary" style={{ fontSize: '0.78rem' }}>
            <Download size={14} />
            <span>Download sample CSV template</span>
          </button>
        </div>

        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
          <div style={{
            border: '1px dashed var(--line-strong)',
            borderRadius: 'var(--radius)',
            padding: '30px',
            textAlign: 'center',
            background: 'var(--ink-800)'
          }}>
            <input
              type="file"
              accept=".csv,.json"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'block', margin: '0 auto', fontSize: '0.85rem' }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--paper-dim)', marginTop: '10px' }}>
              Upload a periodic SOC alert export (CSV or JSON format). Ingests and validates entirely within local SQLite.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={!file || uploading}
              className="btn btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              <span>{uploading ? 'Validating & ingesting...' : 'Validate & ingest file'}</span>
            </button>
          </div>
        </form>

        {result && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: 'var(--radius)',
            background: result.status === 'success' ? 'rgba(95, 172, 134, 0.1)' : 'rgba(224, 97, 107, 0.1)',
            border: `1px solid ${result.status === 'success' ? '#5fac86' : '#e0616b'}`,
            color: result.status === 'success' ? '#5fac86' : '#e0616b',
            fontSize: '0.85rem'
          }}>
            {result.status === 'success' ? (
              <div>
                <strong>Ingestion success:</strong> Processed {result.rows_processed} records from '{result.filename}'. Validated {result.entities_found} entities and {result.categories_found} categories.
              </div>
            ) : (
              <div>
                <strong>Validation failure:</strong> {result.details}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Audit Trail Table */}
      <div className="card">
        <div className="card-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} color="#d3c15f" />
            <span>Supervisory action audit trail (local immutable log)</span>
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-faint)' }}>Tracking all analyst actions</span>
        </div>

        {logsError ? (
          <StateMessage tone="error" title="Couldn't load the audit trail" description={logsError} actionLabel="Retry" onAction={loadAuditLogs} />
        ) : auditLogs.length === 0 ? (
          <StateMessage tone="empty" title="No audit entries yet" description="Actions like status changes, remediation updates and file ingestions will appear here as they happen." />
        ) : (
        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Operator</th>
                <th>Supervisory action</th>
                <th>Action details & notes</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--paper-dim)' }}>
                    {log.timestamp}
                  </td>
                  <td style={{ fontWeight: '600', color: '#5b84e8' }}>
                    {log.user}
                  </td>
                  <td>
                    <span className="badge badge-low">{log.action}</span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--paper-dim)', maxWidth: '400px' }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
