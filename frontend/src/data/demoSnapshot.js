// Pre-baked "Proof Mode" dataset.
//
// This mirrors the exact JSON shapes the live FastAPI backend returns
// (see backend/api/routes.py) so every view renders identically whether
// it's reading from the live API or from this snapshot. It exists so the
// app has a fully working, polished offline story that doesn't depend on
// the Python backend, a network connection, or the demo generator running
// live on stage.
//
// It is intentionally a single coherent "story": CSE-07 is the flagship
// case referenced elsewhere in the UI (attention score 79, fast critical
// closures, unescalated criticals, telemetry blind spots), and every
// number below is kept consistent with that story across endpoints.

const CSES = [
  { cse_id: 'CSE-01', cse_name: 'Northern Grid Transmission Corp', sector: 'Power & Energy', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 18, review_status: 'Normal' },
  { cse_id: 'CSE-02', cse_name: 'National Payments Switch', sector: 'Banking & Finance', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 27, review_status: 'Normal' },
  { cse_id: 'CSE-03', cse_name: 'Apex Clearing & Settlement Ltd', sector: 'Banking & Finance', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 41, review_status: 'Review Recommended' },
  { cse_id: 'CSE-04', cse_name: 'Southern Rail Signalling Authority', sector: 'Transport', criticality: 'Tier-2', reporting_period: '2026-Q3', attention_score: 46, review_status: 'Review Recommended' },
  { cse_id: 'CSE-05', cse_name: 'Coastal Energy Refining Complex', sector: 'Power & Energy', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 58, review_status: 'Review Recommended' },
  { cse_id: 'CSE-06', cse_name: 'Regional Telecom Backbone Ltd', sector: 'Telecom', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 33, review_status: 'Normal' },
  { cse_id: 'CSE-07', cse_name: 'Northern Regional Load Despatch', sector: 'Power & Energy', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 79, review_status: 'High Priority' },
  { cse_id: 'CSE-08', cse_name: 'Central Government Data Centre', sector: 'Government', criticality: 'Tier-1 Critical', reporting_period: '2026-Q3', attention_score: 12, review_status: 'Normal' },
  { cse_id: 'CSE-09', cse_name: 'Eastern Strategic Manufacturing Corp', sector: 'Strategic & Public Enterprises', criticality: 'Tier-2', reporting_period: '2026-Q3', attention_score: 54, review_status: 'Review Recommended' },
  { cse_id: 'CSE-10', cse_name: 'Digital Health Records Authority', sector: 'Government', criticality: 'Tier-2', reporting_period: '2026-Q3', attention_score: 29, review_status: 'Normal' }
];

// finding_id prefixes follow the same convention the live rule engine uses
// (FAST/ESC/TEL/CAT/WEAK/TMPL/RECUR/LOWACT/METRIC) so behavior stays
// consistent if this snapshot is ever compared against a live run.
const FINDINGS = [
  { finding_id: 'CSE07-FAST-01', cse_id: 'CSE-07', finding_type: 'Execution Gap', severity: 'Critical', confidence: 0.94, title: 'Anomalously fast critical alert closures', description: 'Critical alerts at CSE-07 closed in a median of 8.3 minutes this quarter, 85.5% faster than the peer median of 57.2 minutes, with no corresponding increase in automation coverage. This pattern is consistent with alerts being closed without adequate investigation.', evidence: [{ alert_id: 'ALT-70231', asset_id: 'AST-014', severity: 'Critical', duration_minutes: 6.5, escalated: false }, { alert_id: 'ALT-70255', asset_id: 'AST-014', severity: 'Critical', duration_minutes: 9.1, escalated: false }, { alert_id: 'ALT-70310', asset_id: 'AST-021', severity: 'Critical', duration_minutes: 7.8, escalated: true }], metrics: { signal: 'Critical alert closure duration', baseline: '57.2 min (peer median)', observed: '8.3 min (entity median)' }, risk_score: 92, recommended_actions: ['Establish a mandatory minimum investigation checklist before critical alert disposition.', 'Sample and re-review the last 90 days of fast-closed critical alerts for missed escalations.'], review_status: 'New', supervisor_notes: null },
  { finding_id: 'CSE07-ESC-01', cse_id: 'CSE-07', finding_type: 'Execution Gap', severity: 'Critical', confidence: 0.91, title: 'Unescalated critical alerts', description: '14 critical-severity alerts at CSE-07 were closed this quarter with no Tier-2 or Incident Response escalation record, against a sector norm of near-universal escalation for critical severity events.', evidence: [{ alert_id: 'ALT-70231', asset_id: 'AST-014', severity: 'Critical', escalated: false }, { alert_id: 'ALT-70298', asset_id: 'AST-017', severity: 'Critical', escalated: false }], metrics: { signal: 'Critical escalation rate', baseline: '81.4% (peer median)', observed: '22.6% (entity)' }, risk_score: 88, recommended_actions: ['Calibrate the escalation matrix and define a strict SLA for critical SCADA incidents.', 'Retroactively review the 14 unescalated critical alerts with Tier-2 on-call.'], review_status: 'Under Review', supervisor_notes: null },
  { finding_id: 'CSE07-TEL-01', cse_id: 'CSE-07', finding_type: 'Negative Space', severity: 'High', confidence: 0.88, title: 'Critical SCADA telemetry blind spots', description: '3 designated critical RTUs (remote terminal units) generated under 15% of expected telemetry volume during the quarter, indicating either sensor failure or a monitoring configuration gap that has gone unaddressed.', evidence: [{ asset_id: 'AST-021', asset_name: 'RTU-Northgate-3', expected_pct: 100, observed_pct: 11 }, { asset_id: 'AST-022', asset_name: 'RTU-Northgate-4', expected_pct: 100, observed_pct: 14 }, { asset_id: 'AST-023', asset_name: 'RTU-Substation-B', expected_pct: 100, observed_pct: 9 }], metrics: { signal: 'Telemetry coverage', baseline: '95%+ (peer median)', observed: '11-14% (3 critical RTUs)' }, risk_score: 84, recommended_actions: ['Validate telemetry health and log forwarders on the 3 degraded RTU controllers.', 'Confirm whether the gap reflects a sensor fault or an intentional decommission that was never logged.'], review_status: 'New', supervisor_notes: null },
  { finding_id: 'CSE07-RECUR-01', cse_id: 'CSE-07', finding_type: 'Execution Gap', severity: 'High', confidence: 0.86, title: 'Chronic recurring incidents without root-cause remediation', description: '27 repeated "SCADA Protocol Deviation" alerts fired on the same asset (AST-014) this quarter with no root-cause analysis or remediation recorded in any of the associated case files.', evidence: [{ asset_id: 'AST-014', category: 'SCADA Protocol Deviation', occurrences: 27, root_cause_identified: false }], metrics: { signal: 'Repeat alert rate on same asset', baseline: '< 5 occurrences (peer median)', observed: '27 occurrences' }, risk_score: 79, recommended_actions: ['Perform a structured root-cause analysis on the repeated protocol-deviation alerts.', 'Open a remediation action against AST-014 with a quantitative verification metric.'], review_status: 'New', supervisor_notes: null },
  { finding_id: 'CSE07-TMPL-01', cse_id: 'CSE-07', finding_type: 'Metric Gaming', severity: 'Medium', confidence: 0.77, title: 'Template-driven investigation documentation', description: 'Analyst investigation notes across 41 closed cases showed 100% textual similarity, consistent with a copy-pasted template rather than case-specific investigation narrative.', evidence: [{ case_id: 'CASE-3391', similarity_pct: 100 }, { case_id: 'CASE-3402', similarity_pct: 100 }, { case_id: 'CASE-3415', similarity_pct: 100 }], metrics: { signal: 'Investigation note text similarity', baseline: '< 40% (peer median)', observed: '100%' }, risk_score: 61, recommended_actions: ['Enforce mandatory forensic evidence attachment (logs, pcaps) for high-impact events.', 'Introduce a minimum-uniqueness check on investigation narratives before case closure.'], review_status: 'New', supervisor_notes: null },

  { finding_id: 'CSE05-TEL-01', cse_id: 'CSE-05', finding_type: 'Negative Space', severity: 'High', confidence: 0.81, title: 'Partial telemetry coverage on refinery control network', description: 'Telemetry coverage across the OT control network sits at 61%, indicating instrumented but incomplete visibility rather than a full blind spot.', evidence: [{ asset_id: 'AST-055', expected_pct: 100, observed_pct: 58 }, { asset_id: 'AST-056', expected_pct: 100, observed_pct: 64 }], metrics: { signal: 'Telemetry coverage', baseline: '95%+ (peer median)', observed: '61%' }, risk_score: 68, recommended_actions: ['Prioritize telemetry backfill for the 2 partially-instrumented control segments.'], review_status: 'New', supervisor_notes: null },
  { finding_id: 'CSE05-ESC-01', cse_id: 'CSE-05', finding_type: 'Execution Gap', severity: 'Medium', confidence: 0.72, title: 'Below-median critical escalation rate', description: 'Critical alert escalation rate of 52% trails the peer median of 81.4%.', evidence: [{ alert_id: 'ALT-81104', severity: 'Critical', escalated: false }], metrics: { signal: 'Critical escalation rate', baseline: '81.4% (peer median)', observed: '52%' }, risk_score: 58, recommended_actions: ['Review escalation criteria with the on-site SOC team.'], review_status: 'New', supervisor_notes: null },

  { finding_id: 'CSE04-WEAK-01', cse_id: 'CSE-04', finding_type: 'Multivariate Anomaly', severity: 'Medium', confidence: 0.69, title: 'Shallow investigation depth on signalling alerts', description: 'Median evidence-artifact count per case (1.2) is well below the peer median of 4.1, suggesting investigations are being closed without adequate forensic capture.', evidence: [{ case_id: 'CASE-5510', evidence_count: 1 }, { case_id: 'CASE-5522', evidence_count: 0 }], metrics: { signal: 'Evidence artifacts per case', baseline: '4.1 (peer median)', observed: '1.2' }, risk_score: 55, recommended_actions: ['Mandate a minimum evidence-attachment count before case closure.'], review_status: 'New', supervisor_notes: null },
  { finding_id: 'CSE04-CAT-01', cse_id: 'CSE-04', finding_type: 'Negative Space', severity: 'Medium', confidence: 0.66, title: 'Missing alert category coverage', description: 'No alerts were recorded in the "Unauthorized Access" category for the full reporting quarter, an unusual absence given comparable entities.', evidence: [{ category: 'Unauthorized Access', quarter_count: 0, peer_median_count: 14 }], metrics: { signal: 'Alerts in category', baseline: '14 (peer median)', observed: '0' }, risk_score: 49, recommended_actions: ['Confirm detection coverage for unauthorized-access use cases is actually deployed and forwarding.'], review_status: 'New', supervisor_notes: null },

  { finding_id: 'CSE09-LOWACT-01', cse_id: 'CSE-09', finding_type: 'Negative Space', severity: 'High', confidence: 0.79, title: 'Unusually low overall monitoring activity', description: 'Total alert volume (412) is 71% below the peer median (1,430) for entities of comparable size and criticality tier, suggesting under-monitoring rather than genuinely low risk.', evidence: [{ metric: 'total_alerts', observed: 412, peer_median: 1430 }], metrics: { signal: 'Total alert volume', baseline: '1,430 (peer median)', observed: '412' }, risk_score: 71, recommended_actions: ['Audit sensor and log-forwarder health across the estate.', 'Confirm SIEM ingestion pipelines are complete and not silently dropping events.'], review_status: 'New', supervisor_notes: null },
  { finding_id: 'CSE09-METRIC-01', cse_id: 'CSE-09', finding_type: 'Metric Gaming', severity: 'Medium', confidence: 0.7, title: 'Suspicious clustering of alerts just below reporting threshold', description: 'A disproportionate share of medium-severity alerts are scored just below the threshold that would reclassify them as high severity, a pattern consistent with score manipulation to minimize reported high-severity counts.', evidence: [{ severity_score_band: '69-70', count: 38, peer_median_count: 6 }], metrics: { signal: 'Alerts scored 69-70', baseline: '6 (peer median)', observed: '38' }, risk_score: 60, recommended_actions: ['Independently re-score a sample of borderline alerts.'], review_status: 'New', supervisor_notes: null },

  { finding_id: 'CSE02-RECUR-01', cse_id: 'CSE-02', finding_type: 'Execution Gap', severity: 'Low', confidence: 0.6, title: 'Minor repeat-alert pattern on payment gateway node', description: 'A single asset generated 9 repeated "Rate Limit Breach" alerts without a documented remediation, below the threshold that would typically warrant escalation but worth tracking.', evidence: [{ asset_id: 'AST-902', category: 'Rate Limit Breach', occurrences: 9 }], metrics: { signal: 'Repeat alert rate on same asset', baseline: '< 5 (peer median)', observed: '9' }, risk_score: 38, recommended_actions: ['Confirm rate-limiting thresholds are correctly tuned for this node.'], review_status: 'Confirmed', supervisor_notes: 'Reviewed with CSE-02 SOC lead; tuning change scheduled for next maintenance window.' },
  { finding_id: 'CSE06-WEAK-01', cse_id: 'CSE-06', finding_type: 'Multivariate Anomaly', severity: 'Low', confidence: 0.58, title: 'Slightly below-median investigation depth', description: 'Evidence artifacts per case (2.9) trail the peer median (4.1) but remain within an acceptable range for a Telecom-sector entity.', evidence: [{ case_id: 'CASE-7710', evidence_count: 3 }], metrics: { signal: 'Evidence artifacts per case', baseline: '4.1 (peer median)', observed: '2.9' }, risk_score: 31, recommended_actions: ['Monitor next quarter; no immediate action required.'], review_status: 'Dismissed', supervisor_notes: 'Within acceptable variance for sector; no action needed.' },
  { finding_id: 'CSE10-CAT-01', cse_id: 'CSE-10', finding_type: 'Negative Space', severity: 'Low', confidence: 0.55, title: 'Thin coverage in insider-threat alert category', description: 'Insider-threat category alert volume is low relative to peers, though this is plausible given the entity\u2019s smaller workforce footprint.', evidence: [{ category: 'Insider Threat', quarter_count: 2, peer_median_count: 9 }], metrics: { signal: 'Alerts in category', baseline: '9 (peer median)', observed: '2' }, risk_score: 27, recommended_actions: ['Revisit after next quarter\u2019s submission to confirm the trend.'], review_status: 'Requires CSE Clarification', supervisor_notes: null },
  { finding_id: 'CSE03-ESC-01', cse_id: 'CSE-03', finding_type: 'Execution Gap', severity: 'Medium', confidence: 0.68, title: 'Escalation rate trending below peer median', description: 'Critical escalation rate (64%) sits moderately below the peer median (81.4%); not yet a critical concern but worth a follow-up in the next cycle.', evidence: [{ metric: 'crit_esc_rate', observed: 64, peer_median: 81.4 }], metrics: { signal: 'Critical escalation rate', baseline: '81.4% (peer median)', observed: '64%' }, risk_score: 44, recommended_actions: ['Flag for follow-up in next quarter\u2019s review.'], review_status: 'New', supervisor_notes: null }
];

function relatedFindingsFor(cseId, excludeId) {
  return FINDINGS.filter(f => f.cse_id === cseId && f.finding_id !== excludeId).slice(0, 4)
    .map(f => ({ finding_id: f.finding_id, title: f.title, severity: f.severity, finding_type: f.finding_type }));
}

const PEER_MEDIANS = {
  crit_median_dur: 57.2,
  high_median_dur: 74.5,
  all_median_dur: 61.0,
  crit_esc_rate: 81.4,
  avg_evidence: 4.1,
  remediation_rate: 68.0,
  telemetry_coverage: 96.5,
  repeated_rate: 3.2
};

// Per-entity operational metrics, in the shape calculate_peer_benchmarks() returns.
const ENTITY_METRICS = {
  'CSE-01': { cse_id: 'CSE-01', sector: 'Power & Energy', criticality: 'Tier-1 Critical', total_alerts: 1180, total_cases: 96, crit_median_dur: 61.2, high_median_dur: 78.0, all_median_dur: 64.5, crit_esc_rate: 88.0, high_esc_rate: 74.0, avg_evidence: 4.8, remediation_rate: 82.0, root_cause_rate: 79.0, telemetry_coverage: 98.2, repeated_rate: 1.1, crit_dur_deviation: 7.0, crit_esc_deviation: 8.1, tel_deviation: 1.8 },
  'CSE-02': { cse_id: 'CSE-02', sector: 'Banking & Finance', criticality: 'Tier-1 Critical', total_alerts: 2410, total_cases: 210, crit_median_dur: 55.4, high_median_dur: 70.1, all_median_dur: 58.9, crit_esc_rate: 84.5, high_esc_rate: 71.2, avg_evidence: 4.4, remediation_rate: 75.0, root_cause_rate: 71.0, telemetry_coverage: 97.0, repeated_rate: 2.4, crit_dur_deviation: -3.1, crit_esc_deviation: 3.8, tel_deviation: 0.5 },
  'CSE-03': { cse_id: 'CSE-03', sector: 'Banking & Finance', criticality: 'Tier-1 Critical', total_alerts: 1875, total_cases: 154, crit_median_dur: 49.0, high_median_dur: 66.0, all_median_dur: 52.0, crit_esc_rate: 64.0, high_esc_rate: 58.0, avg_evidence: 3.6, remediation_rate: 61.0, root_cause_rate: 58.0, telemetry_coverage: 94.0, repeated_rate: 3.0, crit_dur_deviation: -14.3, crit_esc_deviation: -21.4, tel_deviation: -2.6 },
  'CSE-04': { cse_id: 'CSE-04', sector: 'Transport', criticality: 'Tier-2', total_alerts: 860, total_cases: 71, crit_median_dur: 52.0, high_median_dur: 69.0, all_median_dur: 55.0, crit_esc_rate: 70.0, high_esc_rate: 60.0, avg_evidence: 1.2, remediation_rate: 48.0, root_cause_rate: 40.0, telemetry_coverage: 91.0, repeated_rate: 4.5, crit_dur_deviation: -9.1, crit_esc_deviation: -14.0, tel_deviation: -5.7 },
  'CSE-05': { cse_id: 'CSE-05', sector: 'Power & Energy', criticality: 'Tier-1 Critical', total_alerts: 1340, total_cases: 118, crit_median_dur: 46.0, high_median_dur: 63.0, all_median_dur: 49.0, crit_esc_rate: 52.0, high_esc_rate: 55.0, avg_evidence: 3.1, remediation_rate: 55.0, root_cause_rate: 51.0, telemetry_coverage: 61.0, repeated_rate: 3.8, crit_dur_deviation: -19.6, crit_esc_deviation: -36.1, tel_deviation: -36.8 },
  'CSE-06': { cse_id: 'CSE-06', sector: 'Telecom', criticality: 'Tier-1 Critical', total_alerts: 1602, total_cases: 133, crit_median_dur: 58.0, high_median_dur: 72.0, all_median_dur: 60.0, crit_esc_rate: 79.0, high_esc_rate: 68.0, avg_evidence: 2.9, remediation_rate: 66.0, root_cause_rate: 62.0, telemetry_coverage: 95.0, repeated_rate: 2.9, crit_dur_deviation: 1.4, crit_esc_deviation: -2.9, tel_deviation: -1.6 },
  'CSE-07': { cse_id: 'CSE-07', sector: 'Power & Energy', criticality: 'Tier-1 Critical', total_alerts: 1975, total_cases: 163, crit_median_dur: 8.3, high_median_dur: 22.0, all_median_dur: 14.0, crit_esc_rate: 22.6, high_esc_rate: 31.0, avg_evidence: 0.9, remediation_rate: 29.0, root_cause_rate: 24.0, telemetry_coverage: 71.0, repeated_rate: 9.4, crit_dur_deviation: -85.5, crit_esc_deviation: -72.2, tel_deviation: -26.4 },
  'CSE-08': { cse_id: 'CSE-08', sector: 'Government', criticality: 'Tier-1 Critical', total_alerts: 990, total_cases: 84, crit_median_dur: 63.0, high_median_dur: 80.0, all_median_dur: 66.0, crit_esc_rate: 92.0, high_esc_rate: 85.0, avg_evidence: 5.6, remediation_rate: 91.0, root_cause_rate: 88.0, telemetry_coverage: 99.1, repeated_rate: 0.6, crit_dur_deviation: 10.1, crit_esc_deviation: 13.0, tel_deviation: 2.7 },
  'CSE-09': { cse_id: 'CSE-09', sector: 'Strategic & Public Enterprises', criticality: 'Tier-2', total_alerts: 412, total_cases: 35, crit_median_dur: 60.0, high_median_dur: 75.0, all_median_dur: 62.0, crit_esc_rate: 75.0, high_esc_rate: 65.0, avg_evidence: 3.3, remediation_rate: 63.0, root_cause_rate: 59.0, telemetry_coverage: 93.0, repeated_rate: 2.6, crit_dur_deviation: 4.9, crit_esc_deviation: -7.9, tel_deviation: -3.6 },
  'CSE-10': { cse_id: 'CSE-10', sector: 'Government', criticality: 'Tier-2', total_alerts: 705, total_cases: 58, crit_median_dur: 56.0, high_median_dur: 71.0, all_median_dur: 58.0, crit_esc_rate: 80.0, high_esc_rate: 70.0, avg_evidence: 3.9, remediation_rate: 70.0, root_cause_rate: 65.0, telemetry_coverage: 96.0, repeated_rate: 2.2, crit_dur_deviation: -2.1, crit_esc_deviation: -1.7, tel_deviation: -0.5 }
};

Object.values(ENTITY_METRICS).forEach(m => { m.peer_medians = PEER_MEDIANS; });

const NEGATIVE_SPACE_PILLARS = {
  'CSE-01': { critical_asset_telemetry: 'Present', alert_categories: 'Present', investigation_depth: 'Present', escalation_rigor: 'Present', root_cause_remediation: 'Present', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-02': { critical_asset_telemetry: 'Present', alert_categories: 'Present', investigation_depth: 'Present', escalation_rigor: 'Present', root_cause_remediation: 'Missing', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-03': { critical_asset_telemetry: 'Present', alert_categories: 'Present', investigation_depth: 'Present', escalation_rigor: 'Requires Validation', root_cause_remediation: 'Present', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-04': { critical_asset_telemetry: 'Present', alert_categories: 'Missing', investigation_depth: 'Requires Validation', escalation_rigor: 'Present', root_cause_remediation: 'Missing', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-05': { critical_asset_telemetry: 'Partial', alert_categories: 'Present', investigation_depth: 'Present', escalation_rigor: 'Requires Validation', root_cause_remediation: 'Present', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-06': { critical_asset_telemetry: 'Present', alert_categories: 'Present', investigation_depth: 'Requires Validation', escalation_rigor: 'Present', root_cause_remediation: 'Present', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-07': { critical_asset_telemetry: 'Missing', alert_categories: 'Present', investigation_depth: 'Requires Validation', escalation_rigor: 'Missing', root_cause_remediation: 'Missing', monitoring_activity: 'Present', operational_integrity: 'Requires Validation' },
  'CSE-08': { critical_asset_telemetry: 'Present', alert_categories: 'Present', investigation_depth: 'Present', escalation_rigor: 'Present', root_cause_remediation: 'Present', monitoring_activity: 'Present', operational_integrity: 'Present' },
  'CSE-09': { critical_asset_telemetry: 'Present', alert_categories: 'Present', investigation_depth: 'Present', escalation_rigor: 'Present', root_cause_remediation: 'Present', monitoring_activity: 'Requires Validation', operational_integrity: 'Requires Validation' },
  'CSE-10': { critical_asset_telemetry: 'Present', alert_categories: 'Requires Validation', investigation_depth: 'Present', escalation_rigor: 'Present', root_cause_remediation: 'Present', monitoring_activity: 'Present', operational_integrity: 'Present' }
};

const REMEDIATIONS = [
  { action_id: 'ACT-1001', finding_id: 'CSE07-FAST-01', cse_id: 'CSE-07', title: 'Establish mandatory minimum investigation checklist before critical disposition', owner: 'CSE-07 SOC Operations Lead', due_date: '2026-10-15', priority: 'Critical', status: 'In Progress', verification_metric: 'Critical-alert median investigation duration >= 40 minutes', notes: null },
  { action_id: 'ACT-1002', finding_id: 'CSE07-ESC-01', cse_id: 'CSE-07', title: 'Calibrate escalation matrix and define critical-SCADA SLA', owner: 'CSE-07 SOC Operations Lead', due_date: '2026-10-20', priority: 'Critical', status: 'Open', verification_metric: 'Critical-alert escalation rate >= 80%', notes: null },
  { action_id: 'ACT-1003', finding_id: 'CSE07-TEL-01', cse_id: 'CSE-07', title: 'Restore telemetry on 3 degraded RTU controllers', owner: 'CSE-07 OT Engineering', due_date: '2026-11-01', priority: 'High', status: 'Verification Pending', verification_metric: 'Critical asset telemetry coverage >= 95%', notes: 'Vendor dispatched to Northgate substation; awaiting confirmation.' },
  { action_id: 'ACT-1004', finding_id: 'CSE05-TEL-01', cse_id: 'CSE-05', title: 'Backfill telemetry on partially-instrumented control segments', owner: 'CSE-05 OT Engineering', due_date: '2026-11-10', priority: 'High', status: 'Open', verification_metric: 'Telemetry coverage >= 90%', notes: null },
  { action_id: 'ACT-1005', finding_id: 'CSE09-LOWACT-01', cse_id: 'CSE-09', title: 'Audit sensor and log-forwarder health across the estate', owner: 'CSE-09 SOC Lead', due_date: '2026-10-25', priority: 'High', status: 'Open', verification_metric: 'Total alert volume within 20% of peer median', notes: null },
  { action_id: 'ACT-1006', finding_id: 'CSE04-WEAK-01', cse_id: 'CSE-04', title: 'Mandate minimum evidence-attachment count before case closure', owner: 'CSE-04 SOC Lead', due_date: '2026-11-05', priority: 'Medium', status: 'Completed', verification_metric: 'Median evidence artifacts per case >= 3', notes: 'New case-closure checklist rolled out; verified against last 30 days.' }
];

const AUDIT_LOGS = [
  { id: 1, timestamp: '2026-09-24 09:12:03 UTC', user: 'Supervisor', action: 'Finding Status Changed', details: 'Finding CSE02-RECUR-01 (CSE-02) changed from \'Under Review\' to \'Confirmed\'.' },
  { id: 2, timestamp: '2026-09-23 16:40:51 UTC', user: 'Supervisor', action: 'Remediation Created', details: 'Created remediation \'Restore telemetry on 3 degraded RTU controllers\' for CSE-07.' },
  { id: 3, timestamp: '2026-09-23 11:05:27 UTC', user: 'Supervisor', action: 'Report Generated', details: 'CSE Dossier Generated for CSE-07.' },
  { id: 4, timestamp: '2026-09-22 14:22:09 UTC', user: 'Supervisor', action: 'Finding Status Changed', details: 'Finding CSE06-WEAK-01 (CSE-06) changed from \'New\' to \'Dismissed\'.' },
  { id: 5, timestamp: '2026-09-21 08:55:44 UTC', user: 'Supervisor (Uploader)', action: 'Dataset Uploaded', details: 'Uploaded file \'q3_alerts_export.csv\' with 1,842 records. Ingestion validated.' },
  { id: 6, timestamp: '2026-09-20 17:30:16 UTC', user: 'Supervisor', action: 'Remediation Updated', details: 'Updated action ACT-1003 to status \'Verification Pending\'.' }
];


// Deep-frozen originals, used to restore proof-mode state to a pristine
// baseline (e.g. when the person hits "Generate Demo Dataset" again, or
// re-enters Proof Mode after being in Live mode).
const ORIGINAL_FINDINGS = JSON.parse(JSON.stringify(FINDINGS));
const ORIGINAL_REMEDIATIONS = JSON.parse(JSON.stringify(REMEDIATIONS));
const ORIGINAL_AUDIT_LOGS = JSON.parse(JSON.stringify(AUDIT_LOGS));

function resetDemoState() {
  FINDINGS.splice(0, FINDINGS.length, ...JSON.parse(JSON.stringify(ORIGINAL_FINDINGS)));
  REMEDIATIONS.splice(0, REMEDIATIONS.length, ...JSON.parse(JSON.stringify(ORIGINAL_REMEDIATIONS)));
  AUDIT_LOGS.splice(0, AUDIT_LOGS.length, ...JSON.parse(JSON.stringify(ORIGINAL_AUDIT_LOGS)));
}

function nowStamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

function pushAuditLog(user, action, details) {
  const nextId = AUDIT_LOGS.reduce((max, l) => Math.max(max, l.id), 0) + 1;
  AUDIT_LOGS.unshift({ id: nextId, timestamp: nowStamp(), user, action, details });
}

function applyFindingStatus(findingId, status, notes) {
  const f = FINDINGS.find(x => x.finding_id === findingId);
  if (!f) return false;
  const oldStatus = f.review_status;
  f.review_status = status;
  if (notes !== undefined && notes !== null && notes !== '') f.supervisor_notes = notes;
  pushAuditLog('Supervisor', 'Finding Status Changed', `Finding ${findingId} (${f.cse_id}) changed from '${oldStatus}' to '${status}'.`);
  return true;
}

function addRemediationAction(data) {
  const actionId = `ACT-PROOF-${Date.now()}`;
  REMEDIATIONS.unshift({
    action_id: actionId,
    finding_id: data.finding_id || null,
    cse_id: data.cse_id,
    title: data.title,
    owner: data.owner || 'CSE SOC Lead',
    due_date: data.due_date || '2026-10-30',
    priority: data.priority || 'High',
    status: 'Open',
    verification_metric: data.verification_metric,
    notes: data.notes || null
  });
  pushAuditLog('Supervisor', 'Remediation Created', `Created remediation '${data.title}' for ${data.cse_id}.`);
  return actionId;
}

function applyRemediationUpdate(actionId, data) {
  const a = REMEDIATIONS.find(x => x.action_id === actionId);
  if (!a) return null;
  if (data.status) a.status = data.status;
  if (data.owner) a.owner = data.owner;
  if (data.notes) a.notes = data.notes;
  pushAuditLog('Supervisor', 'Remediation Updated', `Updated action ${actionId} to status '${a.status}'.`);
  return a.status;
}

function findingsCountFor(cseId) {
  return FINDINGS.filter(f => f.cse_id === cseId).length;
}

function buildDashboard() {
  const findings = FINDINGS;
  const highPriority = findings.filter(f => f.severity === 'Critical' || f.severity === 'High').length;
  const blindSpots = findings.filter(f => f.finding_type === 'Negative Space').length;
  const entitiesRequiringReview = CSES.filter(c => c.attention_score >= 50).length;

  const categoryCounts = {};
  findings.forEach(f => { categoryCounts[f.finding_type] = (categoryCounts[f.finding_type] || 0) + 1; });

  return {
    stats: {
      cses_analyzed: CSES.length,
      alerts_analyzed: CSES.reduce((sum, c) => sum + (ENTITY_METRICS[c.cse_id]?.total_alerts || 0), 0),
      cases_analyzed: CSES.reduce((sum, c) => sum + (ENTITY_METRICS[c.cse_id]?.total_cases || 0), 0),
      supervisory_signals: findings.length,
      high_priority_findings: highPriority,
      potential_blind_spots: blindSpots,
      entities_requiring_review: entitiesRequiringReview,
      open_remediation_actions: REMEDIATIONS.filter(r => r.status === 'Open' || r.status === 'In Progress').length
    },
    attention_distribution: [
      { name: '0-30 (Normal)', count: CSES.filter(c => c.attention_score < 31).length },
      { name: '31-60 (Review Rec.)', count: CSES.filter(c => c.attention_score >= 31 && c.attention_score <= 60).length },
      { name: '61-80 (Elevated)', count: CSES.filter(c => c.attention_score >= 61 && c.attention_score <= 80).length },
      { name: '81-100 (High Priority)', count: CSES.filter(c => c.attention_score > 80).length }
    ],
    findings_by_category: Object.entries(categoryCounts).map(([category, count]) => ({ category, count })),
    severity_breakdown: [
      { severity: 'Critical', count: findings.filter(f => f.severity === 'Critical').length, color: '#e0616b' },
      { severity: 'High', count: findings.filter(f => f.severity === 'High').length, color: '#d99a52' },
      { severity: 'Medium', count: findings.filter(f => f.severity === 'Medium').length, color: '#d3c15f' },
      { severity: 'Low', count: findings.filter(f => f.severity === 'Low').length, color: '#5b84e8' }
    ],
    top_entities: [...CSES].sort((a, b) => b.attention_score - a.attention_score).map(c => ({
      cse_id: c.cse_id, name: c.cse_name, sector: c.sector, criticality: c.criticality,
      attention_score: c.attention_score, status: c.review_status, findings_count: findingsCountFor(c.cse_id)
    }))
  };
}

function buildCSEsList() {
  return [...CSES].sort((a, b) => b.attention_score - a.attention_score).map(c => ({
    cse_id: c.cse_id, cse_name: c.cse_name, sector: c.sector, criticality: c.criticality,
    reporting_period: c.reporting_period, attention_score: c.attention_score,
    review_status: c.review_status, findings_count: findingsCountFor(c.cse_id)
  }));
}

function buildCSEProfile(cseId) {
  const cse = CSES.find(c => c.cse_id === cseId) || CSES[0];
  const metrics = ENTITY_METRICS[cse.cse_id] || {};
  const findings = FINDINGS.filter(f => f.cse_id === cse.cse_id);
  const remediations = REMEDIATIONS.filter(r => r.cse_id === cse.cse_id);
  const categoryCounts = {};
  findings.forEach(f => { categoryCounts[f.finding_type] = (categoryCounts[f.finding_type] || 0) + 1; });

  return {
    entity: {
      cse_id: cse.cse_id, cse_name: cse.cse_name, sector: cse.sector, criticality: cse.criticality,
      reporting_period: cse.reporting_period, attention_score: cse.attention_score, review_status: cse.review_status
    },
    metrics,
    peer_medians: PEER_MEDIANS,
    assets_count: Math.round((metrics.total_alerts || 500) / 14),
    alerts_count: metrics.total_alerts || 0,
    cases_count: metrics.total_cases || 0,
    category_distribution: Object.entries(categoryCounts).map(([category, count]) => ({ category, count })),
    findings,
    remediations: remediations.map(r => ({ action_id: r.action_id, title: r.title, status: r.status, priority: r.priority, due_date: r.due_date, verification_metric: r.verification_metric }))
  };
}

function buildFindingsList() {
  return FINDINGS;
}

function buildFindingDetail(findingId) {
  const f = FINDINGS.find(x => x.finding_id === findingId);
  if (!f) return null;
  const metrics = ENTITY_METRICS[f.cse_id] || {};
  return {
    ...f,
    entity_metrics: metrics,
    peer_medians: PEER_MEDIANS,
    related_findings: relatedFindingsFor(f.cse_id, f.finding_id)
  };
}

function buildReviewQueue() {
  return [...FINDINGS].sort((a, b) => b.risk_score - a.risk_score).map(f => ({
    finding_id: f.finding_id, cse_id: f.cse_id, title: f.title, finding_type: f.finding_type,
    severity: f.severity, confidence: f.confidence, risk_score: f.risk_score,
    evidence_count: (f.evidence || []).length,
    primary_action: (f.recommended_actions && f.recommended_actions[0]) || 'Review operational evidence',
    review_status: f.review_status,
    priority: f.risk_score >= 80 ? 'P1' : (f.risk_score >= 65 ? 'P2' : 'P3')
  }));
}

const SAMPLES = [
  { sample_id: 'SMP-ALT-70231', alert_id: 'ALT-70231', cse_id: 'CSE-07', asset_id: 'AST-014', asset_name: 'RTU-Northgate-1', timestamp: '2026-08-14 03:12:00', severity: 'Critical', category: 'SCADA Protocol Deviation', source: 'OT-Inspector', duration_minutes: 6.5, escalated: false, case_id: 'CASE-3391', evidence_count: 0, investigation_notes: 'Closed - no anomaly confirmed after review.', score: 95, priority: 'Critical', selection_reasons: ['Critical severity operational threat', 'Closure time (6.5m) is 88.6% below peer median (57.2m)', 'No Tier-2 / Incident Response escalation record found', 'Zero forensic evidence artifacts attached to investigation'] },
  { sample_id: 'SMP-ALT-70298', alert_id: 'ALT-70298', cse_id: 'CSE-07', asset_id: 'AST-017', asset_name: 'RTU-Northgate-2', timestamp: '2026-08-19 21:44:00', severity: 'Critical', category: 'Unauthorized Config Change', source: 'OT-Inspector', duration_minutes: 4.1, escalated: false, case_id: 'CASE-3402', evidence_count: 0, investigation_notes: 'Closed - no anomaly confirmed after review.', score: 90, priority: 'Critical', selection_reasons: ['Critical severity operational threat', 'Closure time (4.1m) is 92.8% below peer median (57.2m)', 'No Tier-2 / Incident Response escalation record found'] },
  { sample_id: 'SMP-ALT-55901', alert_id: 'ALT-55901', cse_id: 'CSE-05', asset_id: 'AST-055', asset_name: 'Refinery-Control-Node-3', timestamp: '2026-08-22 12:05:00', severity: 'Critical', category: 'Telemetry Dropout', source: 'OT-Inspector', duration_minutes: 41.0, escalated: true, case_id: 'CASE-4410', evidence_count: 1, investigation_notes: 'Investigated; sensor firmware fault suspected.', score: 70, priority: 'High', selection_reasons: ['Critical severity operational threat', 'Same asset generated 11 recurring \'Telemetry Dropout\' alerts', 'Zero forensic evidence artifacts attached to investigation'] },
  { sample_id: 'SMP-ALT-91120', alert_id: 'ALT-91120', cse_id: 'CSE-09', asset_id: 'AST-201', asset_name: 'Plant-Historian-Server', timestamp: '2026-08-25 07:50:00', severity: 'High', category: 'Anomalous Login Pattern', source: 'SIEM - Sentinel', duration_minutes: 88.0, escalated: true, case_id: 'CASE-6021', evidence_count: 2, investigation_notes: 'Investigated; confirmed benign maintenance login outside window.', score: 68, priority: 'High', selection_reasons: ['Originates from Critical Tier-1 infrastructure asset (Plant-Historian-Server)', 'No root-cause determination documented in case file', 'No engineering remediation recorded'] }
];

function buildValidation() {
  const evaluations = [
    { ground_truth_id: 'GT-001', cse_id: 'CSE-07', category: 'fast_closure_critical', title: 'CSE-07 exhibits anomalously fast critical closures', expected_flag: true, detected: true, status: 'True Positive (Correct Detection)', confidence: 0.94, finding_id: 'CSE07-FAST-01', rationale: 'Synthetic ground truth: closure times were deliberately compressed for this entity in the generator.' },
    { ground_truth_id: 'GT-002', cse_id: 'CSE-07', category: 'unescalated_critical', title: 'CSE-07 exhibits unescalated critical alerts', expected_flag: true, detected: true, status: 'True Positive (Correct Detection)', confidence: 0.91, finding_id: 'CSE07-ESC-01', rationale: 'Synthetic ground truth: escalation flag was deliberately suppressed for this entity in the generator.' },
    { ground_truth_id: 'GT-003', cse_id: 'CSE-07', category: 'telemetry_gap', title: 'CSE-07 exhibits critical telemetry gaps', expected_flag: true, detected: true, status: 'True Positive (Correct Detection)', confidence: 0.88, finding_id: 'CSE07-TEL-01', rationale: 'Synthetic ground truth: 3 RTUs were deliberately starved of telemetry in the generator.' },
    { ground_truth_id: 'GT-004', cse_id: 'CSE-01', category: 'fast_closure_critical', title: 'CSE-01 should NOT trigger a fast-closure flag', expected_flag: false, detected: false, status: 'True Negative (Correct Clean Rejection)', confidence: 0.0, finding_id: null, rationale: 'Control entity: closure durations left at healthy peer-typical levels.' },
    { ground_truth_id: 'GT-005', cse_id: 'CSE-08', category: 'unescalated_critical', title: 'CSE-08 should NOT trigger an escalation-gap flag', expected_flag: false, detected: false, status: 'True Negative (Correct Clean Rejection)', confidence: 0.0, finding_id: null, rationale: 'Control entity: escalation rate left at exemplary levels.' },
    { ground_truth_id: 'GT-006', cse_id: 'CSE-05', category: 'telemetry_gap', title: 'CSE-05 should trigger a partial (not full) telemetry flag', expected_flag: true, detected: true, status: 'True Positive (Correct Detection)', confidence: 0.81, finding_id: 'CSE05-TEL-01', rationale: 'Synthetic ground truth: telemetry deliberately set to a partial-coverage band for this entity.' },
    { ground_truth_id: 'GT-007', cse_id: 'CSE-09', category: 'unusually_low_activity', title: 'CSE-09 exhibits unusually low monitoring activity', expected_flag: true, detected: true, status: 'True Positive (Correct Detection)', confidence: 0.79, finding_id: 'CSE09-LOWACT-01', rationale: 'Synthetic ground truth: alert volume deliberately suppressed for this entity in the generator.' },
    { ground_truth_id: 'GT-008', cse_id: 'CSE-03', category: 'fast_closure_critical', title: 'CSE-03 should NOT trigger a fast-closure flag', expected_flag: false, detected: false, status: 'True Negative (Correct Clean Rejection)', confidence: 0.0, finding_id: null, rationale: 'Control entity: closure durations left at healthy peer-typical levels.' }
  ];

  const tp = evaluations.filter(e => e.status.includes('True Positive')).length;
  const tn = evaluations.filter(e => e.status.includes('True Negative')).length;
  const fp = evaluations.filter(e => e.status.includes('False Positive')).length;
  const fn = evaluations.filter(e => e.status.includes('False Negative')).length;
  const precision = Math.round((tp / Math.max(1, tp + fp)) * 100) / 100;
  const recall = Math.round((tp / Math.max(1, tp + fn)) * 100) / 100;
  const f1 = Math.round(((2 * precision * recall) / Math.max(0.001, precision + recall)) * 100) / 100;

  return {
    overall: { precision, recall, f1_score: f1, true_positives: tp, false_positives: fp, false_negatives: fn, true_negatives: tn, total_ground_truth_items: evaluations.length },
    by_category: {
      fast_closure_critical: { precision: 1.0, recall: 1.0, f1_score: 1.0, tp: 1, fp: 0, fn: 0 },
      unescalated_critical: { precision: 1.0, recall: 1.0, f1_score: 1.0, tp: 1, fp: 0, fn: 0 },
      telemetry_gap: { precision: 1.0, recall: 1.0, f1_score: 1.0, tp: 2, fp: 0, fn: 0 },
      unusually_low_activity: { precision: 1.0, recall: 1.0, f1_score: 1.0, tp: 1, fp: 0, fn: 0 }
    },
    evaluations,
    human_validation: { confirmed_by_expert: 1, dismissed_by_expert: 1, under_active_review: 1, requires_clarification: 1, total_reviewed: 4 }
  };
}

function buildBenchmarks() {
  return { entity_metrics: ENTITY_METRICS, global_medians: PEER_MEDIANS };
}

function buildNegativeSpaceMatrix() {
  return CSES.map(c => ({
    cse_id: c.cse_id, cse_name: c.cse_name, sector: c.sector, attention_score: c.attention_score,
    pillars: NEGATIVE_SPACE_PILLARS[c.cse_id]
  }));
}

// Everything below is computed FRESH on every call by reading the live
// FINDINGS / REMEDIATIONS / AUDIT_LOGS arrays, so a write action (confirming
// a finding, creating a remediation, ingesting a file) is immediately
// reflected everywhere else in the app for the rest of the session.
export const demo = {
  getDashboard: () => buildDashboard(),
  getCSEsList: () => buildCSEsList(),
  getCSEProfile: (cseId) => buildCSEProfile(cseId),
  getFindingsList: () => buildFindingsList(),
  getFindingDetail: (findingId) => buildFindingDetail(findingId),
  getReviewQueue: () => buildReviewQueue(),
  getSamples: () => SAMPLES,
  getNegativeSpaceMatrix: () => buildNegativeSpaceMatrix(),
  getBenchmarks: () => buildBenchmarks(),
  getRemediations: () => [...REMEDIATIONS],
  getValidation: () => buildValidation(),
  getAuditLogs: () => [...AUDIT_LOGS],
  getGenerateResult: () => ({
    generator_result: { alerts_count: CSES.reduce((s, c) => s + (ENTITY_METRICS[c.cse_id]?.total_alerts || 0), 0), cses_count: CSES.length },
    analysis_result: { total_findings: FINDINGS.length }
  }),
  getAnalysisResult: () => ({ total_findings: FINDINGS.length }),

  // Mutations — these change the in-memory demo state for the rest of the session.
  updateFindingStatus: (findingId, status, notes) => applyFindingStatus(findingId, status, notes),
  createRemediation: (data) => addRemediationAction(data),
  updateRemediation: (actionId, data) => applyRemediationUpdate(actionId, data),
  logAudit: (user, action, details) => pushAuditLog(user, action, details),
  reset: () => resetDemoState()
};
