import Sidebar from "../components/Sidebar";

function About() {
  return (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />

    <div className="about-page" style={{ flex: 1 }}>
      <section className="about-hero">
        <h1>About AuthTrack Pro</h1>
        <p>
          AuthTrack Pro helps healthcare organizations manage, track, and
          audit prior authorizations with greater visibility, accountability,
          and efficiency.
        </p>
      </section>
      <section className="about-section">
  <h2>Built for the Real Prior Authorization Workflow</h2>
  <p>
    AuthTrack Pro was created to help healthcare teams manage the daily
    challenges of prior authorization, including payer follow-up, missing
    information, delayed approvals, authorization tracking, and communication
    gaps between providers, office staff, patients, and insurance companies.
  </p>
</section>
<section className="about-section">
  <h2>The Challenges We Solve</h2>

  <ul className="about-list">
    <li>Repeatedly resubmitting authorization requests because payers report they never received them.</li>
    <li>Manual reports that require hours of filtering and follow-up.</li>
    <li>Long hold times while contacting insurance companies for status updates.</li>
    <li>Authorization denials caused by missing clinical documentation.</li>
    <li>Coordinating peer-to-peer reviews before payer deadlines expire.</li>
    <li>Managing multiple CPT codes that require separate authorizations.</li>
    <li>Correcting diagnosis-to-procedure mismatches before submission.</li>
    <li>Tracking site-of-service requirements across multiple insurance plans.</li>
    <li>Reducing reimbursement delays caused by authorization issues.</li>
    <li>Improving communication between providers, office staff, patients, and insurance companies.</li>
    <li>Providing complete visibility into every authorization from submission through final decision.</li>
  </ul>
</section>
<section className="about-section">
  <h2>Why AuthTrack Pro Exists</h2>
  <p>
    AuthTrack Pro exists because prior authorization should not rely on
    scattered spreadsheets, manual follow-up, unclear ownership, and delayed
    communication. Healthcare teams need a centralized system that helps them
    see what is pending, what is urgent, what is denied, and what needs action
    before it affects patient care or reimbursement.
  </p>
</section>
<section className="about-section">
  <h2>Our Mission</h2>
  <p>
    Our mission is to help healthcare organizations reduce authorization delays,
    improve accountability, protect reimbursement, and give teams the visibility
    they need to manage prior authorizations with confidence.
  </p>
</section>
<section className="about-section">
  <h2>Who We Serve</h2>

  <p>
    AuthTrack Pro is designed for healthcare organizations of all sizes,
    including independent physician practices, specialty clinics, ambulatory
    surgery centers, imaging centers, hospitals, health systems, and skilled
    nursing facilities.
  </p>

  <p>
    Whether your team manages hundreds or thousands of authorizations each
    month, AuthTrack Pro provides the visibility, reporting, accountability,
    and workflow management needed to improve operational efficiency and
    accelerate reimbursement.
  </p>
</section>
<section className="about-section">
  <h2>Meet the Founder</h2>

  <p>
    AuthTrack Pro was founded by a healthcare revenue cycle professional with
    more than a decade of experience working in patient access, insurance
    verification, benefits, referrals, and prior authorizations. After seeing
    firsthand how fragmented authorization workflows delay patient care,
    increase administrative burden, and impact reimbursement, the vision for
    AuthTrack Pro was born.
  </p>

  <p>
    Every feature in AuthTrack Pro is designed with real healthcare workflows
    in mind—helping organizations improve visibility, reduce manual work,
    strengthen accountability, and simplify authorization management from
    submission through final determination.
  </p>
</section>
<section className="about-cta">
  <h2>Ready to Transform Your Prior Authorization Process?</h2>

  <p>
    Whether you're managing a single specialty practice or a multi-facility
    healthcare organization, AuthTrack Pro is built to help your team reduce
    delays, improve visibility, and streamline authorization workflows.
  </p>

  <a href="/#/pricing" className="pricing-button">
    View Plans & Pricing
  </a>
</section>
    </div>
    </div>
  );
}

export default About;