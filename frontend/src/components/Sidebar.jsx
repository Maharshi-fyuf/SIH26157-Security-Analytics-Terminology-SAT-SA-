import React from 'react';
import {
  LayoutDashboard,
  Building2,
  FileSearch,
  ListTodo,
  Crosshair,
  Grid,
  BarChart3,
  HeartHandshake,
  CheckCheck,
  FileText,
  UploadCloud,
  ShieldAlert,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ activeView, onViewChange, currentCSE }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cses', label: 'CSE Directory', icon: Building2 },
    { id: 'cse-profile', label: currentCSE ? `${currentCSE} Profile` : 'CSE Profile', icon: UserCheck },
    { id: 'findings', label: 'Findings Explorer', icon: FileSearch },
    { id: 'review-queue', label: 'Review Queue', icon: ListTodo },
    { id: 'samples', label: 'Recommended Samples', icon: Crosshair },
    { id: 'negative-space', label: 'Negative Space Heatmap', icon: Grid },
    { id: 'benchmarks', label: 'Peer Benchmark Hub', icon: BarChart3 },
    { id: 'remediation', label: 'Remediation ("Heal")', icon: HeartHandshake },
    { id: 'validation', label: 'Analytics Validation', icon: CheckCheck },
    { id: 'reports', label: 'Supervisory Reports', icon: FileText },
    { id: 'upload', label: 'Data Ingestion & Audit', icon: UploadCloud }
  ];

  return (
    <aside className="sidebar">
      {/* Org / product identity */}
      <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'var(--ink-800)', border: '1px solid var(--line-strong)', width: '36px', height: '36px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldAlert size={18} color="#5b84e8" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--paper)', lineHeight: '1.2' }}>
            SAT-SA
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--paper-dim)', marginTop: '1px' }}>
            NCIIPC, Government of India
          </div>
        </div>
      </div>

      {/* Air-gapped runtime status */}
      <div style={{ padding: '9px 14px', margin: '12px 10px 4px', background: 'var(--ink-850)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '9px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--sev-healthy)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.74rem', fontWeight: '500', color: 'var(--paper-dim)' }}>
          Running in air-gapped mode
        </span>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }} aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              style={{ width: 'calc(100% - 16px)', border: 'none', borderLeft: isActive ? undefined : '2px solid transparent', textAlign: 'left', background: 'transparent' }}
            >
              <Icon size={17} color={isActive ? '#5b84e8' : '#999da5'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / authority notice */}
      <div style={{ padding: '13px 16px', borderTop: '1px solid var(--line)' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--paper-dim)' }}>
          Mandate: Sec. 70A IT Act
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--paper-faint)', marginTop: '2px' }}>
          Human supervisor authority active
        </div>
      </div>
    </aside>
  );
}
