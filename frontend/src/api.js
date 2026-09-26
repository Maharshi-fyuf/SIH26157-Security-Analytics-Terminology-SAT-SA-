import { demo } from './data/demoSnapshot';

const API_BASE = "http://127.0.0.1:8000/api";
const MODE_KEY = "sat-sa-ui-mode";
export const MODE_EVENT = "sat-sa-mode-change";

// --- Proof Mode -------------------------------------------------------
// Proof Mode swaps every read/write call below for a pre-baked, internally
// consistent dataset (frontend/src/data/demoSnapshot.js) so the app is
// fully demoable offline, with no dependency on the Python backend, a
// network connection, or the live demo-data generator working on stage.

export function getUIMode() {
  try {
    return localStorage.getItem(MODE_KEY) === 'proof' ? 'proof' : 'live';
  } catch {
    return 'live';
  }
}

export function isProofMode() {
  return getUIMode() === 'proof';
}

export function setUIMode(mode) {
  const next = mode === 'proof' ? 'proof' : 'live';
  try { localStorage.setItem(MODE_KEY, next); } catch { /* ignore */ }
  if (next === 'proof') demo.reset();
  window.dispatchEvent(new CustomEvent(MODE_EVENT, { detail: next }));
}

// Small artificial delay so Proof Mode still *feels* like it's doing work,
// rather than snapping instantly in a way that looks fake.
function settle(value, ms = 250) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

export async function fetchDashboard() {
  if (isProofMode()) return settle(demo.getDashboard());
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
}

export async function fetchCSEs() {
  if (isProofMode()) return settle(demo.getCSEsList());
  const res = await fetch(`${API_BASE}/cses`);
  if (!res.ok) throw new Error("Failed to fetch CSE list");
  return res.json();
}

export async function fetchCSEProfile(cseId) {
  if (isProofMode()) return settle(demo.getCSEProfile(cseId));
  const res = await fetch(`${API_BASE}/cses/${cseId}`);
  if (!res.ok) throw new Error(`Failed to fetch profile for ${cseId}`);
  return res.json();
}

export async function fetchFindings(params = {}) {
  if (isProofMode()) {
    let results = demo.getFindingsList();
    if (params.cse_id) results = results.filter(f => f.cse_id === params.cse_id);
    if (params.severity) results = results.filter(f => f.severity === params.severity);
    if (params.finding_type) results = results.filter(f => f.finding_type === params.finding_type);
    if (params.status) results = results.filter(f => f.review_status === params.status);
    return settle(results);
  }
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/findings?${query}`);
  if (!res.ok) throw new Error("Failed to fetch findings");
  return res.json();
}

export async function fetchFindingDetail(findingId) {
  if (isProofMode()) {
    const detail = demo.getFindingDetail(findingId);
    if (!detail) throw new Error(`Finding ${findingId} not found`);
    return settle(detail);
  }
  const res = await fetch(`${API_BASE}/findings/${findingId}`);
  if (!res.ok) throw new Error(`Failed to fetch finding ${findingId}`);
  return res.json();
}

export async function updateFindingStatus(findingId, status, notes = "") {
  if (isProofMode()) {
    const ok = demo.updateFindingStatus(findingId, status, notes);
    if (!ok) throw new Error(`Finding ${findingId} not found`);
    return settle({ status: "success", finding_id: findingId, new_status: status }, 180);
  }
  const res = await fetch(`${API_BASE}/findings/${findingId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, supervisor_notes: notes })
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function fetchReviewQueue() {
  if (isProofMode()) return settle(demo.getReviewQueue());
  const res = await fetch(`${API_BASE}/review-queue`);
  if (!res.ok) throw new Error("Failed to fetch review queue");
  return res.json();
}

export async function fetchSamples() {
  if (isProofMode()) return settle(demo.getSamples());
  const res = await fetch(`${API_BASE}/samples`);
  if (!res.ok) throw new Error("Failed to fetch recommended samples");
  return res.json();
}

export async function fetchNegativeSpaceMatrix() {
  if (isProofMode()) return settle(demo.getNegativeSpaceMatrix());
  const res = await fetch(`${API_BASE}/negative-space`);
  if (!res.ok) throw new Error("Failed to fetch negative space matrix");
  return res.json();
}

export async function fetchBenchmarks() {
  if (isProofMode()) return settle(demo.getBenchmarks());
  const res = await fetch(`${API_BASE}/benchmarks`);
  if (!res.ok) throw new Error("Failed to fetch benchmarks");
  return res.json();
}

export async function fetchRemediations(params = {}) {
  if (isProofMode()) {
    let results = demo.getRemediations();
    if (params.cse_id) results = results.filter(r => r.cse_id === params.cse_id);
    if (params.status) results = results.filter(r => r.status === params.status);
    return settle(results);
  }
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/remediations?${query}`);
  if (!res.ok) throw new Error("Failed to fetch remediations");
  return res.json();
}

export async function createRemediation(data) {
  if (isProofMode()) {
    const actionId = demo.createRemediation(data);
    return settle({ status: "success", action_id: actionId }, 180);
  }
  const res = await fetch(`${API_BASE}/remediations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create remediation");
  return res.json();
}

export async function updateRemediation(actionId, data) {
  if (isProofMode()) {
    const newStatus = demo.updateRemediation(actionId, data);
    if (newStatus === null) throw new Error(`Remediation ${actionId} not found`);
    return settle({ status: "success", action_id: actionId, new_status: newStatus }, 180);
  }
  const res = await fetch(`${API_BASE}/remediations/${actionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update remediation");
  return res.json();
}

export async function fetchValidation() {
  if (isProofMode()) return settle(demo.getValidation());
  const res = await fetch(`${API_BASE}/validation`);
  if (!res.ok) throw new Error("Failed to fetch validation metrics");
  return res.json();
}

export async function generateDemoData() {
  if (isProofMode()) {
    demo.reset();
    demo.logAudit('Supervisor', 'Demo Dataset Regenerated', 'Proof Mode dataset reset to its baseline snapshot.');
    return settle(demo.getGenerateResult(), 500);
  }
  const res = await fetch(`${API_BASE}/demo/generate`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to generate demo dataset");
  return res.json();
}

export async function runSupervisoryAnalysis() {
  if (isProofMode()) {
    demo.logAudit('Supervisor', 'Supervisory Analysis Run', 'Re-ran the (pre-computed) analysis pipeline in Proof Mode.');
    return settle(demo.getAnalysisResult(), 500);
  }
  const res = await fetch(`${API_BASE}/analytics/run`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to run supervisory analysis");
  return res.json();
}

export async function uploadDataset(file) {
  if (isProofMode()) {
    // Simulate a plausible, successful ingestion without touching the network.
    const approxRows = Math.max(20, Math.round((file.size || 4000) / 140));
    demo.logAudit('Supervisor (Uploader)', 'Dataset Uploaded', `Uploaded file '${file.name}' with ~${approxRows} records (Proof Mode simulated ingestion).`);
    return settle({
      status: "success",
      filename: file.name,
      rows_processed: approxRows,
      entities_found: 1,
      categories_found: 3
    }, 500);
  }
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData
  });
  return res.json();
}

export async function fetchAuditLogs() {
  if (isProofMode()) return settle(demo.getAuditLogs());
  const res = await fetch(`${API_BASE}/audit-logs`);
  if (!res.ok) throw new Error("Failed to fetch audit logs");
  return res.json();
}

export function getExecutiveReportUrl() {
  return `${API_BASE}/reports/executive`;
}

export function getCSEReportUrl(cseId) {
  return `${API_BASE}/reports/cse/${cseId}`;
}
