import React, { useEffect, useRef, useState } from 'react';
import { FileText, ExternalLink, Printer, Building, ShieldCheck, AlertTriangle } from 'lucide-react';
import { fetchCSEs, getExecutiveReportUrl, getCSEReportUrl } from '../api';

export default function ReportsView({ initialCSE = 'CSE-07' }) {
  const [cses, setCses] = useState([]);
  const [cseListError, setCseListError] = useState(null);
  const [selectedReport, setSelectedReport] = useState('executive');
  const [selectedCSE, setSelectedCSE] = useState(initialCSE);
  const iframeRef = useRef(null);

  useEffect(() => {
    fetchCSEs()
      .then(setCses)
      .catch(err => {
        console.error(err);
        setCseListError(err.message || 'Failed to load the CSE list.');
      });
  }, []);

  const reportUrl = selectedReport === 'executive'
    ? getExecutiveReportUrl()
    : getCSEReportUrl(selectedCSE);

  const handlePrint = () => {
    try {
      iframeRef.current?.contentWindow?.print();
    } catch {
      // Cross-origin or not-yet-loaded — fall back to opening it directly.
      window.open(reportUrl, '_blank');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Control Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setSelectedReport('executive')}
              className={`btn ${selectedReport === 'executive' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem' }}
            >
              <FileText size={15} />
              <span>National executive report</span>
            </button>

            <button
              onClick={() => setSelectedReport('cse')}
              className={`btn ${selectedReport === 'cse' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem' }}
            >
              <Building size={15} />
              <span>CSE audit dossier</span>
            </button>
          </div>

          {selectedReport === 'cse' && (
            cseListError ? (
              <span style={{ fontSize: '0.78rem', color: 'var(--sev-critical)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={13} /> Couldn't load entity list ({cseListError})
              </span>
            ) : (
              <select
                value={selectedCSE}
                onChange={(e) => setSelectedCSE(e.target.value)}
                style={{
                  background: 'var(--ink-800)',
                  border: '1px solid var(--line)',
                  color: 'var(--paper)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.82rem',
                  fontWeight: '600'
                }}
              >
                {cses.map(c => (
                  <option key={c.cse_id} value={c.cse_id}>
                    {c.cse_id} - {c.cse_name}
                  </option>
                ))}
              </select>
            )
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={handlePrint} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
            <Printer size={15} />
            <span>Print preview</span>
          </button>
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem' }}
          >
            <ExternalLink size={15} />
            <span>Open in fullscreen / print PDF</span>
          </a>
        </div>
      </div>

      {/* Embedded Printable Report Preview Frame */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', height: '760px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px 16px', background: 'var(--ink-800)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-dim)', fontFamily: 'var(--font-mono)' }}>
            Preview: {selectedReport === 'executive' ? 'National Executive Supervisory Assessment' : `Audit Dossier for ${selectedCSE}`}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#5fac86', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Official format validated · print-ready
          </span>
        </div>

        <iframe
          ref={iframeRef}
          src={reportUrl}
          title="Supervisory Report"
          style={{ width: '100%', height: '100%', border: 'none', background: 'var(--ink-950)' }}
        />
      </div>
    </div>
  );
}
