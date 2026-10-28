export interface ApplicationRecord {
  id: string;
  instituteId: string;
  name: string;
  region: string;
  state: string;
  category: "EoA Renewal" | "New Technical Institute" | "Increase in Intake" | "Addition of Courses" | "NRI Quota";
  submittedDate: string;
  reviewPriority: "HIGH" | "MEDIUM" | "LOW";
  priorityReason: string;
  flagsCount: number;
  unresolvedFlags: number;
  sourceVerificationStatus: "verified" | "mismatch" | "expired" | "pending" | "source_unavailable" | "manual_review";
  scrutinyStatus: "In Review" | "Deficiency Noticed" | "Clarification Requested" | "Ready for Scrutiny Committee";
  claimedIntake: number;
  approvedIntake: number;
  documents: {
    name: string;
    type: string;
    status: "valid" | "flagged" | "missing" | "unverified";
    fileSize: string;
    uploadDate: string;
    issuingAuthority: string;
    verificationResult: "verified" | "mismatch" | "expired" | "pending" | "source_unavailable" | "manual_review";
    metadataAnomaly?: string;
  }[];
  flags: {
    id: string;
    field: string;
    category: "INTAKE_MISMATCH" | "EXPIRED_DOCUMENT" | "METADATA_TAMPERING" | "NAME_MISMATCH" | "CHECKLIST_MISSING";
    severity: "high" | "medium" | "low";
    foundValue: string;
    expectedValue: string;
    sourceDoc: string;
    baselineSource: string;
    ocrConfidence: number;
    reason: string;
    quotedTextSnippet?: string;
    pageNumber?: number;
    isPreliminary: boolean;
    status: "unresolved" | "resolved" | "dismissed" | "clarification_requested";
  }[];
  auditHistory: {
    id: string;
    timestamp: string;
    actor: string;
    role: "System (Rules Engine)" | "AI Vision / OCR" | "Scrutiny Officer" | "Senior Officer" | "External API (Simulated)";
    action: string;
    details: string;
    ruleId?: string;
    hashSnippet?: string;
  }[];
}

export interface CategoryChecklistRule {
  id: string;
  category: string;
  documentName: string;
  isMandatory: boolean;
  validityCheck: string;
  crossCheckRule: string;
  lastUpdated: string;
  isActive: boolean;
}

export const INITIAL_CHECKLIST_RULES: CategoryChecklistRule[] = [
  {
    id: "RULE-EOA-01",
    category: "EoA Renewal",
    documentName: "State Higher Education Department NOC",
    isMandatory: true,
    validityCheck: "Validity date must not precede academic session start (30-Jun-2026)",
    crossCheckRule: "Institution name & affiliated courses must match AICTE Master DB",
    lastUpdated: "2026-09-15 by AICTE Admin",
    isActive: true,
  },
  {
    id: "RULE-EOA-02",
    category: "EoA Renewal",
    documentName: "Land & Infrastructure Affidavit (Notarized)",
    isMandatory: true,
    validityCheck: "Stamp paper e-stamp date must precede signature; PDF creation timestamp within 48h",
    crossCheckRule: "Total built-up carpet area must satisfy min 4.5 sqm/student intake",
    lastUpdated: "2026-09-15 by AICTE Admin",
    isActive: true,
  },
  {
    id: "RULE-EOA-03",
    category: "EoA Renewal",
    documentName: "Previous Year EoA Approval Order",
    isMandatory: true,
    validityCheck: "Must be issued by Member Secretary AICTE for Academic Year 2025-26",
    crossCheckRule: "Claimed intake in Form-A cannot exceed previously sanctioned intake without explicit expansion sanction",
    lastUpdated: "2026-10-01 by AICTE Admin",
    isActive: true,
  },
  {
    id: "RULE-NEW-01",
    category: "New Technical Institute",
    documentName: "Registered Society / Trust Deed & Land Title",
    isMandatory: true,
    validityCheck: "Continuous unencumbered land parcel of min 2.5 acres in Urban / 7.5 acres in Rural",
    crossCheckRule: "Society registration certificate name must match applicant name exactly",
    lastUpdated: "2026-08-20 by AICTE Admin",
    isActive: true,
  },
  {
    id: "RULE-NEW-02",
    category: "New Technical Institute",
    documentName: "State Fire & Life Safety Clearance",
    isMandatory: true,
    validityCheck: "Current valid certificate from Chief Fire Officer of respective district",
    crossCheckRule: "Building plan floor footprint must match Fire NOC cited area",
    lastUpdated: "2026-08-20 by AICTE Admin",
    isActive: true,
  },
  {
    id: "RULE-INT-01",
    category: "Increase in Intake",
    documentName: "NBA Tier-1 / Tier-2 Accreditation Certificate",
    isMandatory: true,
    validityCheck: "Valid on the date of application with minimum 650+ score or 5-year grant",
    crossCheckRule: "Intake increase permissible only in NBA accredited programs",
    lastUpdated: "2026-09-10 by AICTE Admin",
    isActive: true,
  },
];

export const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "AICTE-2026-EOA-98104",
    instituteId: "1-938210411",
    name: "Apex Institute of Technology & Management",
    region: "Western Region",
    state: "Maharashtra (Pune)",
    category: "EoA Renewal",
    submittedDate: "2026-10-24 14:32",
    reviewPriority: "HIGH",
    priorityReason: "Expired mandatory certificate (State NOC) & Claimed intake 240 exceeds approved 180 & PDF edited after signing date",
    flagsCount: 3,
    unresolvedFlags: 3,
    sourceVerificationStatus: "mismatch",
    scrutinyStatus: "Deficiency Noticed",
    claimedIntake: 240,
    approvedIntake: 180,
    documents: [
      {
        name: "Application_Form_A_Renewal_2026.pdf",
        type: "Intake Form",
        status: "flagged",
        fileSize: "2.4 MB",
        uploadDate: "2026-10-24",
        issuingAuthority: "Applicant Institute",
        verificationResult: "mismatch",
      },
      {
        name: "Govt_Higher_Education_NOC.pdf",
        type: "State NOC",
        status: "flagged",
        fileSize: "1.1 MB",
        uploadDate: "2026-10-24",
        issuingAuthority: "DTE Maharashtra (Simulated API)",
        verificationResult: "expired",
      },
      {
        name: "Infrastructure_Notarized_Affidavit.pdf",
        type: "Legal Affidavit",
        status: "flagged",
        fileSize: "3.8 MB",
        uploadDate: "2026-10-24",
        issuingAuthority: "Notary Public / E-Stamping",
        verificationResult: "manual_review",
        metadataAnomaly: "PDF creation date (2026-04-10) post-dates notary signing stamp date (2026-03-01)",
      },
      {
        name: "AICTE_Previous_EoA_2025_26.pdf",
        type: "Regulatory Approval",
        status: "valid",
        fileSize: "1.8 MB",
        uploadDate: "2026-10-24",
        issuingAuthority: "AICTE Member Secretary",
        verificationResult: "verified",
      },
      {
        name: "TER_Fee_Challan_Proof.pdf",
        type: "Payment Receipt",
        status: "valid",
        fileSize: "850 KB",
        uploadDate: "2026-10-24",
        issuingAuthority: "SBI AICTE Fee Portal",
        verificationResult: "verified",
      },
    ],
    flags: [
      {
        id: "FLAG-INTAKE-01",
        field: "Sanctioned Student Intake (Computer Science & Engg)",
        category: "INTAKE_MISMATCH",
        severity: "high",
        foundValue: "240 seats claimed in Form-A Table 3.2",
        expectedValue: "180 seats (Sanctioned in EoA 2025-26 Ref: WRO/1-9382104/2025)",
        sourceDoc: "Application_Form_A_Renewal_2026.pdf",
        baselineSource: "AICTE Institutional Master Database",
        ocrConfidence: 99.4,
        reason: "The application claims an intake of 240, while the last approved intake on record is 180. No formal expansion approval order was detected in supporting uploads.",
        quotedTextSnippet: "Course: B.Tech Computer Science & Engineering - Sanctioned Capacity: 240 Students",
        pageNumber: 3,
        isPreliminary: true,
        status: "unresolved",
      },
      {
        id: "FLAG-EXPIRY-02",
        field: "State Government NOC Validity Period",
        category: "EXPIRED_DOCUMENT",
        severity: "high",
        foundValue: "Valid Until: 31st March 2026",
        expectedValue: "Must be valid for Academic Session 2026-27 (valid through at least 30-June-2026)",
        sourceDoc: "Govt_Higher_Education_NOC.pdf",
        baselineSource: "Handbook Appendix 2.4 - State Regulatory Prerequisites",
        ocrConfidence: 98.1,
        reason: "The State Higher Education Department NOC expired in March 2026. The renewal requires a valid or under-renewal extension receipt from the state authority.",
        quotedTextSnippet: "This No Objection Certificate is valid strictly up to the academic period ending 31/03/2026.",
        pageNumber: 1,
        isPreliminary: true,
        status: "unresolved",
      },
      {
        id: "FLAG-METADATA-03",
        field: "PDF Timestamp & Signature Integrity",
        category: "METADATA_TAMPERING",
        severity: "high",
        foundValue: "PDF Producer: Adobe PDF Library 15.0 | Last Modified: 2026-04-10 18:22:11",
        expectedValue: "Notary Stamp Date: 01-March-2026 (Document modified 40 days after attested signing)",
        sourceDoc: "Infrastructure_Notarized_Affidavit.pdf",
        baselineSource: "PDF XMP Metadata Inspector & Notary Stamp OCR",
        ocrConfidence: 96.7,
        reason: "The affidavit's PDF was last edited after the date printed on the official notary seal. Flagged as a preliminary indicator for scrutiny officer review, not proof of forgery.",
        quotedTextSnippet: "Solemnly affirmed before me at Pune on this 1st day of March 2026",
        pageNumber: 4,
        isPreliminary: true,
        status: "unresolved",
      },
    ],
    auditHistory: [
      {
        id: "AUD-001",
        timestamp: "2026-10-24 14:32:05",
        actor: "Applicant Portal",
        role: "System (Rules Engine)",
        action: "Application Submitted & Intake Pipeline Initialized",
        details: "Application received under category 'EoA Renewal'. Loaded 5 mandatory validation checklists.",
        hashSnippet: "0x8fa1...34b",
      },
      {
        id: "AUD-002",
        timestamp: "2026-10-24 14:32:18",
        actor: "OCR & Vision-LLM Pipeline",
        role: "AI Vision / OCR",
        action: "5 Documents Classified & 68 Structured Fields Extracted",
        details: "Bounding box citations indexed. OCR text confidence average 98.2%.",
        hashSnippet: "0x12c9...e8a",
      },
      {
        id: "AUD-003",
        timestamp: "2026-10-24 14:32:21",
        actor: "AICTE Rules Engine v4.2",
        role: "System (Rules Engine)",
        action: "Cross-Document Discrepancy Flagged",
        details: "Flag INTAKE-01 generated: Claimed intake (240) differs from AICTE seeded record (180). Review priority escalated to HIGH.",
        ruleId: "RULE-EOA-03",
        hashSnippet: "0x44d2...771",
      },
      {
        id: "AUD-004",
        timestamp: "2026-10-24 14:32:22",
        actor: "AICTE Rules Engine v4.2",
        role: "System (Rules Engine)",
        action: "Metadata Anomaly Detected",
        details: "Flag METADATA-03 generated: Creation/modification timestamp post-dates notarization date. Marked as Preliminary Indicator.",
        ruleId: "RULE-EOA-02",
        hashSnippet: "0x9bb7...c33",
      },
      {
        id: "AUD-005",
        timestamp: "2026-10-24 14:33:01",
        actor: "External Verification Service",
        role: "External API (Simulated)",
        action: "State DTE Mock API Ping",
        details: "Issuing authority query executed. Response: Expired (Code 410 - Certificate Past Validity).",
        hashSnippet: "0x66f0...9aa",
      },
    ],
  },
  {
    id: "AICTE-2026-NEW-41092",
    instituteId: "1-NEW-4109200",
    name: "Kalinga Institute of Advance Robotics & AI",
    region: "Eastern Region",
    state: "Odisha (Bhubaneswar)",
    category: "New Technical Institute",
    submittedDate: "2026-10-25 10:15",
    reviewPriority: "MEDIUM",
    priorityReason: "Institution name in Registered Land Title Deed differs from Application Form (Apex Educational Trust vs Kalinga Society)",
    flagsCount: 1,
    unresolvedFlags: 1,
    sourceVerificationStatus: "manual_review",
    scrutinyStatus: "In Review",
    claimedIntake: 120,
    approvedIntake: 0,
    documents: [
      {
        name: "Society_Registration_Deed.pdf",
        type: "Registration",
        status: "flagged",
        fileSize: "4.1 MB",
        uploadDate: "2026-10-25",
        issuingAuthority: "Registrar of Societies Odisha",
        verificationResult: "manual_review",
      },
      {
        name: "Land_Ownership_Title_7.5Acres.pdf",
        type: "Land Title",
        status: "flagged",
        fileSize: "8.3 MB",
        uploadDate: "2026-10-25",
        issuingAuthority: "Revenue & Disaster Mgmt Dept",
        verificationResult: "pending",
      },
      {
        name: "Chief_Fire_Officer_Clearance_NOC.pdf",
        type: "Safety Clearance",
        status: "valid",
        fileSize: "2.1 MB",
        uploadDate: "2026-10-25",
        issuingAuthority: "Odisha Fire Services",
        verificationResult: "verified",
      },
    ],
    flags: [
      {
        id: "FLAG-NAME-01",
        field: "Sponsoring Trust Name Consistency",
        category: "NAME_MISMATCH",
        severity: "medium",
        foundValue: "Deed reads: 'Kalinga Pragati Education Trust'",
        expectedValue: "Application reads: 'Kalinga Institute of Advance Robotics & AI Trust'",
        sourceDoc: "Society_Registration_Deed.pdf",
        baselineSource: "Application Form Section 1 - Sponsoring Body",
        ocrConfidence: 97.5,
        reason: "Mismatch between trust name registered on the land sale deed and the applying trust name. Needs clarification whether it is an alias or parent society.",
        quotedTextSnippet: "Registered under Societies Act XXI of 1860 in the name of Kalinga Pragati Education Trust",
        pageNumber: 2,
        isPreliminary: true,
        status: "unresolved",
      },
    ],
    auditHistory: [
      {
        id: "AUD-NEW-01",
        timestamp: "2026-10-25 10:15:10",
        actor: "Applicant Portal",
        role: "System (Rules Engine)",
        action: "New Institute Application Submitted",
        details: "Loaded 'New Technical Institute' checklist with 12 mandatory land and safety verifications.",
        hashSnippet: "0x77c1...11a",
      },
      {
        id: "AUD-NEW-02",
        timestamp: "2026-10-25 10:15:28",
        actor: "AI Vision / OCR",
        role: "AI Vision / OCR",
        action: "Land Title OCR & Society Deed Cross-Match",
        details: "Discrepancy detected in trust entity nomenclature.",
        hashSnippet: "0x33e8...55b",
      },
    ],
  },
  {
    id: "AICTE-2026-INT-77215",
    instituteId: "1-772159002",
    name: "Vellore Institute of Technology & Research",
    region: "Southern Region",
    state: "Tamil Nadu (Vellore)",
    category: "Increase in Intake",
    submittedDate: "2026-10-26 11:20",
    reviewPriority: "LOW",
    priorityReason: "Minor missing optional field in faculty cadre index; routine Fire Safety verification pending",
    flagsCount: 1,
    unresolvedFlags: 1,
    sourceVerificationStatus: "pending",
    scrutinyStatus: "In Review",
    claimedIntake: 300,
    approvedIntake: 240,
    documents: [
      {
        name: "NBA_Accreditation_Tier1_Grant.pdf",
        type: "Accreditation",
        status: "valid",
        fileSize: "1.5 MB",
        uploadDate: "2026-10-26",
        issuingAuthority: "National Board of Accreditation",
        verificationResult: "verified",
      },
      {
        name: "Fire_Safety_Renewal_2026.pdf",
        type: "Safety",
        status: "valid",
        fileSize: "1.2 MB",
        uploadDate: "2026-10-26",
        issuingAuthority: "Tamil Nadu Fire and Rescue",
        verificationResult: "pending",
      },
    ],
    flags: [
      {
        id: "FLAG-CHECKLIST-01",
        field: "Faculty Cadre Index Matrix",
        category: "CHECKLIST_MISSING",
        severity: "low",
        foundValue: "Table 4.1 submitted without Professor of Practice designation column",
        expectedValue: "Cadre ratio 1:2:6 (Prof : Assoc : Asst) with optional Professor of Practice flag",
        sourceDoc: "Faculty_Cadre_Matrix.pdf",
        baselineSource: "Approval Process Handbook Clause 7.1",
        ocrConfidence: 94.0,
        reason: "Minor formatting omission in newly mandated faculty table. Low priority checklist note.",
        quotedTextSnippet: "Faculty Summary: Total 42 Teaching Staff (All full-time)",
        pageNumber: 2,
        isPreliminary: true,
        status: "unresolved",
      },
    ],
    auditHistory: [
      {
        id: "AUD-INT-01",
        timestamp: "2026-10-26 11:20:00",
        actor: "Applicant Portal",
        role: "System (Rules Engine)",
        action: "Intake Expansion Application Filed",
        details: "Category: Increase in Intake (from 240 to 300 seats). Validated NBA tier-1 status.",
        hashSnippet: "0x55aa...33d",
      },
    ],
  },
  {
    id: "AICTE-2026-EOA-11983",
    instituteId: "1-119830044",
    name: "National Institute of Engineering & Science",
    region: "South-West Region",
    state: "Karnataka (Bengaluru)",
    category: "EoA Renewal",
    submittedDate: "2026-10-27 09:05",
    reviewPriority: "LOW",
    priorityReason: "All checklist documents valid; routine university affiliation renewal under external API sync",
    flagsCount: 0,
    unresolvedFlags: 0,
    sourceVerificationStatus: "verified",
    scrutinyStatus: "Ready for Scrutiny Committee",
    claimedIntake: 180,
    approvedIntake: 180,
    documents: [
      {
        name: "VTU_Affiliation_Extension_Letter.pdf",
        type: "Affiliation Order",
        status: "valid",
        fileSize: "1.4 MB",
        uploadDate: "2026-10-27",
        issuingAuthority: "Visvesvaraya Technological University",
        verificationResult: "verified",
      },
      {
        name: "Notarized_EoA_Affidavit_2026.pdf",
        type: "Legal Affidavit",
        status: "valid",
        fileSize: "2.1 MB",
        uploadDate: "2026-10-27",
        issuingAuthority: "Bengaluru District Notary",
        verificationResult: "verified",
      },
    ],
    flags: [],
    auditHistory: [
      {
        id: "AUD-119-01",
        timestamp: "2026-10-27 09:05:12",
        actor: "Applicant Portal",
        role: "System (Rules Engine)",
        action: "EoA Application Filed & Verified",
        details: "No discrepancies found. 0 flags generated. Marked review priority LOW.",
        hashSnippet: "0x111b...fff",
      },
    ],
  },
  {
    id: "AICTE-2026-NRI-55420",
    instituteId: "1-554209931",
    name: "Sardar Patel College of Technology",
    region: "Central Region",
    state: "Gujarat (Ahmedabad)",
    category: "NRI Quota",
    submittedDate: "2026-10-27 16:40",
    reviewPriority: "HIGH",
    priorityReason: "Accreditation Certificate NBA validity expired on 31-Dec-2025; NRI supernumerary quota requires valid accreditation",
    flagsCount: 2,
    unresolvedFlags: 2,
    sourceVerificationStatus: "expired",
    scrutinyStatus: "Deficiency Noticed",
    claimedIntake: 60,
    approvedIntake: 0,
    documents: [
      {
        name: "NBA_Accreditation_Certificate_Mechanical.pdf",
        type: "Accreditation",
        status: "flagged",
        fileSize: "2.3 MB",
        uploadDate: "2026-10-27",
        issuingAuthority: "NBA Portal API (Simulated)",
        verificationResult: "expired",
      },
    ],
    flags: [
      {
        id: "FLAG-NBA-01",
        field: "NBA Accreditation Validity for Supernumerary Quota",
        category: "EXPIRED_DOCUMENT",
        severity: "high",
        foundValue: "Validity Expired on: 31-Dec-2025",
        expectedValue: "Must be currently valid at time of 2026-27 admission intake sanction",
        sourceDoc: "NBA_Accreditation_Certificate_Mechanical.pdf",
        baselineSource: "Approval Process Handbook Chapter V (Supernumerary Seats)",
        ocrConfidence: 99.1,
        reason: "NRI/PIO/FN quota is strictly restricted to departments with valid NBA accreditation. The uploaded certificate lapsed 10 months prior.",
        quotedTextSnippet: "Valid for Academic Years 2022-23 to 2024-25, i.e., up to 31/12/2025",
        pageNumber: 1,
        isPreliminary: true,
        status: "unresolved",
      },
    ],
    auditHistory: [
      {
        id: "AUD-NRI-01",
        timestamp: "2026-10-27 16:40:22",
        actor: "AICTE Rules Engine v4.2",
        role: "System (Rules Engine)",
        action: "Regulatory Eligibility Failure Flagged",
        details: "Flag NBA-01 generated: Expired NBA validity prohibits NRI quota allocation.",
        ruleId: "RULE-INT-01",
        hashSnippet: "0x99cc...22a",
      },
    ],
  },
];
