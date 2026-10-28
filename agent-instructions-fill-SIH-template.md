# Instructions for the agent: refill the SIH 2026 template for AICTE PS 26261

## Task

`SMART_INDIA_HACKATHON_2026.pptx` is currently filled with a different project (a rural healthcare app called "SehatSetu"). Replace every piece of that content with the AICTE project below. Work on a copy and save it as `SIH2026_AICTE_PS26261.pptx`. Do not overwrite the template.

The project is **PS 26261: AI-Powered Application Validation, Document Authentication and Regulatory Compliance Verification (AICTE, Ministry of Education)**. Source doc: "AICTE Application Validation (PS 26261): Problem and Solution" (https://claude.ai/artifact/Dv1wYuz9Mso8QrBe1XUfSE). The exact text to use is given below, so the doc is a reference, not something to re-summarise.

## Global rules

1. **Edit text in place.** Change run text inside the existing text boxes (python-pptx). Keep each box's paragraph structure, bold heading runs, fonts, colours and sizes. Do not create new text boxes except where this file says to.
2. **Do not touch:** the "Conquerors" ovals, the footer "@SIH Idea submission", slide-number placeholders (they are fields), the SIH logo pictures, the blue footer band, the red frame pictures on slide 3 (Picture 7 and Picture 12), and slide titles unless stated.
3. **No invented facts.** Use only the text given here. Do not add statistics, percentages, counts or time-savings figures. No healthcare numbers may remain.
4. **Fit.** After editing, render every slide to an image and look at it. Nothing may overflow into the blue footer band (starts at 6.95 in), overlap a logo, or be cut off. You may reduce a font by at most 2 pt or trim wording slightly. Never shrink below 10 pt.
5. **Tone.** AI output is decision support. Flags are "preliminary indicators". The system never approves or rejects an application.
6. **Stale numbering.** On slide 2 the "Supporting data" block inherits auto-numbering (5, 6) from the list above it. Use bullets, or restart numbering.
7. **Hyperlinks.** Remove the old hyperlinks (mohfw.gov.in, trai.gov.in) on slide 7. Write new URLs as plain text.

---

## Slide 1: Title

- **Subtitle 3** (second paragraph, 32 pt bold): `AI-Assisted Application Validation & Compliance Screening`
- **TextBox 9**, paragraph by paragraph:
  - `Problem Statement ID: SIH26261`
  - `Problem Statement Title: AI-Powered Application Validation, Document Authentication and Regulatory Compliance Verification`
  - `Theme: [CONFIRM FROM SIH PORTAL]` and `PS Category: Software` (keep the existing line break between them)
  - `Team ID: [INSERT TEAM ID]` (leave as is)
  - `Team Name: Conquerors` (leave as is)
  - `Idea Title: AI-Assisted Application Validation & Compliance Screening for AICTE Approvals`
  - 14 pt, two lines: `A first-pass screening layer that reads application documents, cross-checks them against institutional records and flags deficiencies with evidence` / `so AICTE officials review only the cases that need attention. AI assists, officials decide.`

## Slide 2: Problem Statement

**TextBox 8**:

- `Problem Statement Title:  AI-Powered Application Validation, Document Authentication and Regulatory Compliance Verification`
- (blank)
- `The Real Problem, Broken Down:` (bold)
- Numbered 1 to 4, bold lead sentence then normal text:
  1. **Missing, incomplete or expired documents.** Affidavits, NOCs and certificates may be absent or past validity, and each gap has to be found by manual scrutiny.
  2. **Inconsistent information across records.** Names, certificate IDs, dates or claimed intake may not match other documents or the institution's previous approval record.
  3. **Possible alteration or duplication.** Altered dates, duplicated documents, inconsistent metadata and mismatched identifiers are hard to spot by eye. They are preliminary signs that need human verification, not proof of misconduct.
  4. **Slow confirmation from issuing authorities.** Verifying a certificate with its original issuer is time-consuming, which delays processing and adds administrative effort.
- (blank)
- `Why It Matters (from the brief):` (bold; this replaces "Supporting Data:")
- Three bullets, not numbered:
  - The volume and variety of applications and supporting documents makes manual checking time-consuming.
  - Evidence spans affidavits, NOCs, accreditation details, previous EoA and approval status, approved intake, faculty records, deficiency status and TER payment status.
  - AI output must stay decision support: statutory scrutiny, inspections and final decisions remain with the competent AICTE authorities.

**TextBox 3** (the quote line): `"The bottleneck is not the officers' judgement. It is the first-pass checking that comes before it."`

## Slide 3: Proposed Solution

- **Title 1**: `PROPOSED SOLUTION` (replaces "SehatSetu")
- **TextBox 8** (left top):
  - 16 pt bold: `Proposed Solution: First-Pass Screening Layer`
  - 14.5 pt bold: `Decision support for officials: it flags, it never decides`
  - (blank)
  - 11 pt: `A screening layer in front of AICTE officers: it reads each application's documents, checks them against the category checklist and institutional records, and flags deficiencies with evidence. It never approves or rejects. Final decisions stay with AICTE.`
- **TextBox 1** (large, right). Keep the heading/item/blank-line structure:
  - `TIER 1 — Built for This Submission` (14 pt bold), then seven items at 11 pt, each prefixed `✔  `:
    1. Smart document intelligence — OCR and vision-LLM classification and field extraction (names, certificate numbers, issue and expiry dates)
    2. Completeness and validity checks — configurable checklists by application category flag missing documents and expired certificates
    3. Cross-document contradiction detector — value found, value expected, source document and discrepancy side by side, including claimed vs previously approved intake
    4. Metadata anomaly flags — creation date after issue date, edited after signing, duplicate documents; each labelled a preliminary indicator
    5. Review-priority queue — rule-based high / medium / low with the reason shown; officers review, resolve or dismiss flags
    6. Validation dashboard and audit trail — status, deficiencies and open flags per application; append-only log of rules run and officer actions
    7. Role-based access — officer, senior officer and admin roles
  - (blank)
  - `TIER 2 — Simulated or Scoped Down (Designed In, Not Fully Built)` (14 pt bold), then three items at 11 pt, each prefixed `◎  `:
    1. Issuing-authority verification — simulated: a mock verify action with seeded responses and status chips (verified, mismatch, expired, pending, source unavailable, manual review) plus timestamps; designed for authorised APIs, QR codes and digital signatures
    2. Infrastructure compliance assistance — scoped down to light vision-LLM observations on uploaded photographs; trained computer-vision floor-plan analysis is out of scope
    3. Portal and records integration — designed for integration with the AICTE application portal; demonstrated against seeded synthetic institutional records
  - (blank)
  - 11 pt: `Every simulated component is labelled as simulated. All AI findings are explainable, evidence-linked decision-support outputs. Final regulatory decisions remain with the competent AICTE authorities.`
- **TextBox 2** (left bottom): heading `Design Approach & Differentiators` (14.5 pt bold), then six bullets at 10.5 pt, each prefixed `•  `:
  - Evidence-linked by design: every flag shows the field, value found, value expected and source document
  - Human in the loop: flags are preliminary indicators; the system never auto-approves or rejects
  - Explainable review priority: a rule-based high / medium / low queue with the reason shown, not an opaque risk score
  - Configurable, not hard-coded: checklists and rules are editable per application category
  - Traceable: append-only audit trail of rules applied, records checked, source responses and officer actions
  - Honest scope: simulated parts are labelled; demonstrated on synthetic or anonymised data as the brief requires

## Slide 4: Technical Approach

**TextBox 8**: heading `Technologies Used` (16 pt bold), then 13 pt bullets. Keep each line under about 70 characters, because the diagram sits to the right and covers anything that runs under it.

- `•  Frontend:  Next.js / React (officer dashboard, evidence view)`
- `•  Backend:   Express.js + TypeScript (pipeline, rules engine, audit log)`
- `•  Database:  PostgreSQL (applications, documents, flags, audit log)`
- `•  AI / OCR:  Vision-capable LLM API (Claude or GPT): classify, extract, cross-check`
- `•  Metadata:  PDF / image metadata libraries (e.g. pdf-lib, exiftool)`
- `•  Verification:  Mock issuing-authority service (simulated)`
- `•  Deployment: Render or AWS (backend) / Vercel (frontend), Docker for CI/CD`

**Pictures on this slide:**

- **Keep** these logos (they match the stack): TypeScript (Picture 2), Node.js (Picture 4), PostgreSQL (Picture 8), Next.js (Picture 17), React (Picture 29), render (Picture 16), AWS (Picture 31), Docker (Picture 32), Claude starburst (Picture 15).
- **Delete** these (wrong for this project): Twilio (Picture 13), TensorFlow (Picture 21), React Native (Picture 28), Python (Picture 20).
- **Re-space** the remaining logos into a tidy grid in the lower-left area, with no overlaps.
- **Delete** the old architecture diagram (Picture 27). Replace it, in the same area (about x 6.7 in, y 1.5 in, 6.5 in wide, 4.3 in tall), with a native-shape diagram, or with an image if one is supplied:
  - Flow of eight boxes, wrapped over two rows, numbered: ① Intake and checklist (category selects required documents and rules) → ② Read documents (OCR + vision LLM: classify, extract fields) → ③ Validity rules (missing, expired, empty fields) → ④ Cross-check (other documents and institutional records) → ⑤ Anomaly flags (metadata, duplicates, mismatched IDs) → ⑥ Source verification (simulated issuing-authority check) → ⑦ Dashboard and audit trail → ⑧ Officer review and decision (human).
  - A PostgreSQL cylinder beside the flow, labelled `Applications · documents · flags · audit log`, connected to steps ③ to ⑦.
  - Box ⑥ has a dashed outline and the label `simulated`; box ⑧ uses the accent colour. Add a tiny legend: `dashed = simulated`.
  - Text 10 pt or larger, neutral fills, no shadows.

## Slide 5: Feasibility and Viability

**TextBox 8** (12 pt; bold lines are phase headings, the following indented line is plain text):

- `Analysis of Feasibility` (bold)
- **Core pipeline — HIGH feasibility**
  - `  Document upload, vision-LLM / OCR extraction and classification, category checklists, missing / expired / empty-field rules`
- **Consistency and anomaly checks — HIGH to MEDIUM**
  - `  Cross-document and institutional-record comparison on seeded data (HIGH); metadata anomaly flags and duplicate detection (MEDIUM, preliminary indicators only)`
- **Dashboard, review queue and audit trail — HIGH**
  - `  Standard web CRUD, rule-based priority, append-only log; role-based access kept small (officer / senior officer / admin)`
- **Issuing-authority verification — LOW to build for real, so SIMULATED**
  - `  No authorised sandbox access in a hackathon; mock source with seeded responses and clearly labelled status chips`
- **Infrastructure compliance (computer vision) — LOW, scoped down**
  - `  Light vision-LLM observations on uploaded photos only; trained floor-plan analysis is not attempted`
- (blank)
- `Risks and Mitigations` (13.5 pt bold; replaces "Feasibility of Extended Components (Tier 2)")
- 11.5 pt intro: `Each risk is named specifically, with how we reduce it.`
- Five items at 11.5 pt, `Risk — mitigation`:
  - Overclaiming forgery detection — lead with explainable metadata and consistency checks; label every flag a preliminary indicator requiring human verification
  - No real institutional or issuing-authority data — seed realistic synthetic records, label them as such, and demonstrate verification as simulated
  - Extraction accuracy on messy scans — test early on varied skewed and low-quality documents; extractions that fail validation (date will not parse, ID format wrong) go to manual review, never silent acceptance
  - Explainability — every flag stores the field, value found, value expected, source document and the rule that fired, so evidence is built in, not retrofitted
  - Scope creep — the core pipeline is demo-stable first; simulated and scoped-down parts are not expanded until it is

**UI Prototype:- (TextBox 18):** keep the label. **Delete** the two healthcare screenshots (Picture 15, Picture 17). In their place add one dashed-outline rectangle, same area, with centred text `INSERT SCREENSHOT: application with flags, side-by-side evidence view`. Do not leave any healthcare screenshot. Tell the user this placeholder needs a real screenshot.

## Slide 6: Impact and Benefits

**TextBox 8** (left). Keep the heading/bold-lead/plain-description structure:

- `Expected Outcomes — Supported by What Is Built` (15.5 pt bold), blank
- **Earlier identification of missing, expired or inconsistent information** (13 pt bold)
  - `  Checklist, validity and cross-document checks run at the application stage, so gaps are visible before detailed scrutiny starts.`
- **Designed to reduce repetitive manual scrutiny**
  - `  Officers open a review queue ordered by priority, with each flag already showing its evidence, instead of reading every page of every application.`
- (blank)
- **Transparency, accountability and auditability**
  - `  Evidence-linked flags and an append-only audit trail of rules applied, records checked and officer actions make every outcome traceable.`
- (blank)
- `Stakeholder Impact` (15.5 pt bold), then three lines with a bold label:
  - `Scrutiny officers:  First-pass checking is automated; they review flagged cases with evidence side by side`
  - `Senior officers / competent authority:  Consistent, configurable checks and a traceable record support decisions that remain theirs`
  - `Institutions:  Missing or expired items surface earlier, so they can be rectified where the approval process permits`
- (blank)
- 11 pt: `Not claimed: measured accuracy or time savings (the prototype is demonstrated on synthetic data only), verified authenticity through live issuing-authority sources (simulated), and fewer physical inspections through infrastructure analysis (not built).`
- (blank)
- 11 pt: `Note: AI output is decision support only; statutory scrutiny, inspections and final regulatory decisions remain with the competent AICTE authorities.`

**Picture 4 (the rural internet chart):** delete. Replace with a native graphic in the same area (about x 7.1 in, y 1.5 in, 6.2 in wide, 4.8 in tall), titled `Review-priority queue: why each application is ranked`:

- Three stacked cards: **HIGH** (red tint): `Expired mandatory certificate · Major intake discrepancy`. **MEDIUM** (amber tint): `Conflicting information needing clarification`. **LOW** (green or blue tint): `Minor missing fields · Routine verification pending`.
- Caption under the cards, 11 pt: `Priority only orders the review queue. It never approves or rejects an application.`

## Slide 7: Research and References

**TextBox 8** (left): heading `Evidence Base — What the Brief Establishes` (16 pt bold). Four bullets at 13 pt, each followed by a 12 pt `Source:` line. The text must fit inside the rectangle frame behind it, so trim wording slightly if needed.

- `•  Manual checking of the volume and variety of applications and documents is time-consuming; missing or expired documents, inconsistencies and suspected alterations delay processing`
  - `   Source: SIH 2026 Problem Statement 26261 (AICTE, Ministry of Education)`
- `•  Records to validate against: affidavits, accreditation details, NOCs, previous EoA and approval status, approved intake, faculty records, deficiency status, TER payment status`
  - `   Source: SIH 2026 Problem Statement 26261`
- `•  Required safeguards: configurable rules, role-based access, explainable evidence-linked flags, decision support only`
  - `   Source: SIH 2026 Problem Statement 26261 (Essential Safeguards)`
- `•  Evaluation metrics named: extraction accuracy, validation accuracy, anomaly-detection performance, source-verification rate, verification time, alert timeliness, reduction in manual effort`
  - `   Source: SIH 2026 Problem Statement 26261 (Prototype Demonstration and Evaluation)`

**TextBox 17** (right): heading `References` (16 pt bold), then numbered 13 pt lines:

1. `SIH 2026 Problem Statement 26261: AI-Powered Application Validation, Document Authentication and Regulatory Compliance Verification (AICTE, Ministry of Education) — sih.gov.in`
2. `AICTE Approval Process Handbook (edition in force; confirm the year) — aicte-india.org`

Delete references 3 to 7. Do not pad the list. You may add a reference only if you have opened it and confirmed it exists, and you must list any addition in your report.

---

## Final checks (do all of them)

1. Extract all text from the saved file and confirm **none** of these appear anywhere, including notes: `SehatSetu`, `healthcare`, `PHC`, `ASHA`, `Twilio`, `SMS`, `triage`, `rural`, `TRAI`, `MoHFW`, `Marathi`, `ABDM`, `QR`, `patient`, `Maharashtra`, `TensorFlow`, `React Native`.
2. Render all seven slides to images and inspect each for overflow, overlap with logos or the footer band, and missing characters (✔ and ◎ must display).
3. Confirm the deleted pictures are gone and the remaining logos do not overlap.

## Report back to the user

- Anything left as a placeholder: `Team ID`, `Theme`, the slide 5 screenshot placeholder.
- Anything you shortened or whose font you reduced, and by how much.
- Content in this file that is a recommendation and not confirmed by the team: the tech stack on slide 4 (especially the deployment line carried over from the old deck), the risk list on slide 5, and the stakeholder wording on slide 6.
- Whether the Problem Statement ID is correct as `SIH26261` (the user only gave `26261`).
