import React from 'react';
import { AlertTriangle, Inbox, Loader2 } from 'lucide-react';

// Shared loading / error / empty presentation used across every view so
// a failed fetch or an empty dataset never just silently shows a blank
// screen (previously errors only went to the browser console).
export default function StateMessage({ tone = 'empty', title, description, actionLabel, onAction }) {
  const isError = tone === 'error';
  const Icon = isError ? AlertTriangle : Inbox;
  const iconColor = isError ? 'var(--sev-critical)' : 'var(--paper-faint)';

  return (
    <div style={{
      padding: '48px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      <Icon size={26} color={iconColor} />
      <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--paper)' }}>{title}</div>
      {description && (
        <div style={{ fontSize: '0.84rem', color: 'var(--paper-dim)', maxWidth: '440px', lineHeight: 1.5 }}>
          {description}
        </div>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-secondary" style={{ marginTop: '4px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function LoadingNotice({ label }) {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--paper-dim)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <Loader2 size={22} className="spin" color="var(--paper-faint)" />
      <span style={{ fontSize: '0.88rem' }}>{label}</span>
    </div>
  );
}
