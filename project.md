Product Requirement Document (PRD): "Apex Financial"
1. Project Overview
Project Name: Apex Financial
Type: Frontend-only Corporate Website & Client Portal
Objective: Create a high-authority web presence for a CPA/Auditing firm. The design must be clean, data-heavy (charts/tables), and inspire absolute confidence. It features a dual-home layout, complex pricing tables, and data-rich dashboards.
Target Audience: CFOs, Small Business Owners, High-Net-Worth Individuals.
2. Technical Stack & Strict Constraints
Core: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript.
Styling: Tailwind CSS (via CDN or CLI).
Constraint: NO Inline CSS. All styling via Tailwind utility classes in style.css.
JavaScript:
js/main.js: UI logic (Calculators, Mobile Menu, Modals).
js/rtl-toggle.js: Exclusive file for LTR/RTL logic and animations.
Assets: FontAwesome (Icons), Unsplash (Images: Skyscrapers, Handshakes, Calculators).
3. Design System & UI Theme
Vibe: "Wall Street Professional." Stable, Mathematical, Precise.
Primary Color: Oxford Blue (#1e3a8a / bg-blue-900) - Represents trust and stability.
Secondary Color: Growth Green (#10b981 / text-emerald-500) - Represents profit and success.
Typography:
Headings: 'Merriweather' or 'Libre Baskerville' (Serif - Traditional).
Body: 'Roboto' or 'Inter' (Sans-serif - for readable data tables).
Visual Style:
Tabular Data: Clean tables with alternating row colors.
Charts: CSS-only bar charts and pie charts for dashboards.
Imagery: Desaturated corporate photography with blue overlays.
4. File Structure
code
Text
/root
  ├── index.html           (Home V1: Corporate/Audit Focus)
  ├── index2.html          (Home V2: Fintech/Advisory Focus)
  ├── about.html           (Partners & History)
  ├── services.html        (Tax, Audit, Payroll)
  ├── pricing.html         (Retainer Packages)
  ├── contact.html         (Map & Proposal Request)
  ├── login.html           (Secure Portal Entry)
  ├── admin-dashboard.html (CPA View - Client Management)
  ├── user-dashboard.html  (Client View - Tax Returns/P&L)
  ├── 404.html             (Error Page)
  ├── coming-soon.html     (Tax Season Countdown)
  ├── assets/              (Images, Icons)
  ├── css/
  │   └── style.css        (Tailwind components)
  └── js/
      ├── main.js          (UI Interactions)
      └── rtl-toggle.js    (RTL Logic)
5. Global Components & RTL Logic
Navigation Bar (Trust & Utility)
Desktop:
LTR Order: [Apex Logo] --- [Home] [Services] [Pricing] [About] --- [Client Login] [Book Consult] [RTL Toggle]
RTL Order: [RTL Toggle] [Book Consult] [Client Login] --- [About] [Pricing] [Services] [Home] --- [Apex Logo]
Design: White background, thin grey bottom border, serif fonts for links.
Mobile:
LTR: Logo Left, Hamburger Right. Sidebar slides from Right.
RTL: Logo Right, Hamburger Left. Sidebar slides from Left.
The "Ledger Flip" Animation (RTL Transition)
Concept: A "page turn" effect.
Implementation in rtl-toggle.js:
User clicks Globe Icon.
body gets class page-turning (CSS perspective transform).
Screen rotates 90 degrees or a white overlay wipes across.
dir="rtl" is applied.
Screen rotates back/wipe clears revealing the new direction.
6. Page-by-Page Requirements
1. index.html (Home V1 - The "Big Four" Style)
Hero: Static image of a glass skyscraper. Center text.
Headline: "Precision in Numbers. Excellence in Strategy."
Trust Strip: "Audited 500+ Companies | $10B+ Assets Managed".
Service Trio: Cards for "Tax Preparation", "Forensic Accounting", "Mergers & Acquisitions".
Calculator: A simple JS widget: "Estimate your Tax Savings" (Input Income -> Show potential savings).
2. index2.html (Home V2 - Modern Advisory)
Hero: Split screen. Left: Text. Right: Abstract 3D Graph illustration.
Features: Grid layout showcasing "Cloud Accounting", "Real-time Payroll", "AI Risk Analysis".
Stats: Animated number counters (e.g., "ROI Increased by 150%").
3. services.html
Layout: Sidebar navigation (Sticky) + Content Area.
Content:
Audit: "Sarbanes-Oxley Compliance", "Internal Controls".
Tax: "Corporate Filing", "International Tax Law".
Advisory: "Cash Flow Optimization", "Business Valuation".
Interaction: Accordion FAQs specific to each service.
4. pricing.html
Concept: "Transparent Retainers".
Tables: 3 Columns.
Startups: $500/mo (Bookkeeping).
SME: $1,500/mo (Payroll + Tax).
Enterprise: Custom (CFO Services).
Toggle: "Monthly" vs "Quarterly" (JS updates numbers).
5. about.html
The Firm: Founded in 1985.
The Board: Profile cards of Senior Partners (Photos in Black & White).
Details: Name, CPA License #, Specialty.
Certifications: Grid of logos (AICPA, ACCA, ISO 9001).
6. contact.html
Layout: "Find an Office".
Map: Placeholder for Google Maps showing locations in NY, London, Dubai.
Form: "Request for Proposal" (Detailed inputs: Company Size, Annual Revenue dropdown).
7. login.html
Design: Professional, highly secure look (Padlock icons).
Fields: Client ID, Password, 2FA Code (Visual placeholder).
Background: Subtle geometric lines (guilloche pattern used on banknotes).
8. user-dashboard.html (Client View)
Objective: Overview of company health.
Sidebar: Documents, Tax Returns, Invoices, Messages.
Widgets:
Profit & Loss: A bar chart (CSS bars) showing monthly revenue.
Tax Liability: A red warning card "Estimated Tax Due: $12,400".
Recent Files: List of PDF downloads ("Q3_Report.pdf").
9. admin-dashboard.html (CPA View)
Objective: Practice Management.
Table: "Pending Returns". Columns: Client Name, Deadline, Status (Processing/Filed), Action.
Stats: "Total Billable Hours", "Outstanding Invoices".
Notifications: "Client X uploaded a document."
10. Utilities
404.html: "404: Balance Sheet Does Not Balance." (Humorous).
coming-soon.html: "Tax Season Countdown" (Timer).
7. JavaScript Logic Specifications (js/main.js)
Tax Calculator (Index):
Simple logic: Input * 0.30 = Estimated Tax. Update DOM on button click.
Pricing Toggle:
Multiply monthly values by 12 or 3 depending on selection.
Dashboards:
CSS Charts: Use JS to set height: XX% on .bar elements based on mock data arrays.
8. Copilot Prompt Instructions
Phase 1: Setup & Design System
"Create the project structure for 'Apex Financial'. Create style.css (Tailwind) and js/main.js.
Define the 'Corporate' theme:
Colors: Oxford Blue (#1e3a8a) and Emerald Green (#10b981).
Fonts: 'Merriweather' (Headings) and 'Inter' (Body).
Create a Navbar that exudes trust. Desktop: Links center. Mobile: Drawer.
RTL Logic: Write js/rtl-toggle.js. Implement a function that toggles dir='rtl' on HTML and physically reorders the Navbar flex items using Tailwind classes (order-1, order-last). Add a 'Page Turn' CSS animation during the switch."
Phase 2: Public Pages
"Create index.html (Corporate Vibe). Hero section with skyscraper image. A 'Tax Savings Calculator' widget (JS logic). A 'Trust Strip' with stats.
Create index2.html (Modern Vibe). Hero with abstract 3D graphics. Grid of services.
Create services.html with a sticky sidebar layout detailing Audit, Tax, and Advisory."
Phase 3: Pricing & Trust
"Create pricing.html. 3-Column Table (Startup, SME, Enterprise). Add a Monthly/Quarterly toggle switch that updates the prices via JS.
Create about.html. Include 'Partner Profiles' (CPA details) and a list of Certifications."
Phase 4: Client Portal (Dashboards)
"Create login.html. Secure, clean design with a banknote pattern background.
Create user-dashboard.html (Client). Include a Sidebar. Main content: A 'Profit & Loss' bar chart built using CSS Flexbox (no libraries), and a list of downloadable PDF tax documents.
Create admin-dashboard.html (CPA). A dense data table showing 'Client Status', 'Deadlines', and 'Billable Hours'."
Phase 5: Utilities
"Create contact.html with a 'Request Proposal' form.
Create 404.html with a financial joke.
Create coming-soon.html with a countdown timer.
Ensure main.js handles the Mobile Menu drawer (sliding from Left in RTL, Right in LTR)."