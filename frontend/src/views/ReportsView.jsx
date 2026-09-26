<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
import { FileText, ExternalLink, Printer, Building, ShieldCheck, AlertTriangle } from 'lucide-react';
=======
import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, Printer, Building, ShieldCheck } from 'lucide-react';
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
import { fetchCSEs, getExecutiveReportUrl, getCSEReportUrl } from '../api';

export default function ReportsView({ initialCSE = 'CSE-07' }) {
  const [cses, setCses] = useState([]);
<<<<<<< HEAD
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
=======
  const [selectedReport, setSelectedReport] = useState('executive');
  const [selectedCSE, setSelectedCSE] = useState(initialCSE);

  useEffect(() => {
    fetchCSEs().then(setCses).catch(console.error);
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  }, []);

  const reportUrl = selectedReport === 'executive'
    ? getExecutiveReportUrl()
    : getCSEReportUrl(selectedCSE);

<<<<<<< HEAD
  const handlePrint = () => {
    try {
      iframeRef.current?.contentWindow?.print();
    } catch {
      // Cross-origin or not-yet-loaded — fall back to opening it directly.
      window.open(reportUrl, '_blank');
    }
  };

=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Control Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
<<<<<<< HEAD
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
=======
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setSelectedReport('executive')}
              className={`btn ${selectedReport === 'executive' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem' }}
            >
              <FileText size={15} />
<<<<<<< HEAD
              <span>National executive report</span>
=======
              <span>National Executive Report</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
            </button>

            <button
              onClick={() => setSelectedReport('cse')}
              className={`btn ${selectedReport === 'cse' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem' }}
            >
              <Building size={15} />
<<<<<<< HEAD
              <span>CSE audit dossier</span>
=======
              <span>CSE Audit Dossier</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
            </button>
          </div>

          {selectedReport === 'cse' && (
<<<<<<< HEAD
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
=======
            <select
              value={selectedCSE}
              onChange={(e) => setSelectedCSE(e.target.value)}
              style={{
                background: '#090d16',
                border: '1px solid var(--border-subtle)',
                color: '#f8fafc',
                padding: '6px 12px',
                borderRadius: '6px',
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
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<<<<<<< HEAD
          <button onClick={handlePrint} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
            <Printer size={15} />
            <span>Print preview</span>
          </button>
=======
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem' }}
          >
            <ExternalLink size={15} />
<<<<<<< HEAD
            <span>Open in fullscreen / print PDF</span>
=======
            <span>Open in Fullscreen / Print PDF</span>
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </a>
        </div>
      </div>

      {/* Embedded Printable Report Preview Frame */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', height: '760px', display: 'flex', flexDirection: 'column' }}>
<<<<<<< HEAD
        <div style={{ padding: '10px 16px', background: 'var(--ink-800)', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--paper-dim)', fontFamily: 'var(--font-mono)' }}>
            Preview: {selectedReport === 'executive' ? 'National Executive Supervisory Assessment' : `Audit Dossier for ${selectedCSE}`}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#5fac86', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Official format validated · print-ready
=======
        <div style={{ padding: '10px 16px', background: '#0d1527', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            PREVIEW: {selectedReport === 'executive' ? 'National Executive Supervisory Assessment' : `Audit Dossier for ${selectedCSE}`}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> Official Format Validated
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
          </span>
        </div>

        <iframe
<<<<<<< HEAD
          ref={iframeRef}
          src={reportUrl}
          title="Supervisory Report"
          style={{ width: '100%', height: '100%', border: 'none', background: 'var(--ink-950)' }}
=======
          src={reportUrl}
          title="Supervisory Report"
          style={{ width: '100%', height: '100%', border: 'none', background: '#0b0f17' }}
>>>>>>> 584f86a5a08d6aa3db9f3ba3b386a17085f0be83
        />
      </div>
    </div>
  );
}
