import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [facilityCount, setFacilityCount] = useState(1);
  const [userCount, setUserCount] = useState(5);
  const [storageNeeded, setStorageNeeded] = useState(10);
  const [monthlyAuthorizations, setMonthlyAuthorizations] = useState(2500);
  const [minutesSavedPerAuth, setMinutesSavedPerAuth] = useState(10);
  const [hourlyLaborCost, setHourlyLaborCost] = useState(30);
  const recommendedPlan =
  facilityCount >= 10 ||
  userCount >= 50 ||
  storageNeeded >= 100 ||
  monthlyAuthorizations >= 25000
    ? "Enterprise"
    : facilityCount >= 3 ||
      userCount >= 15 ||
      storageNeeded >= 50 ||
      monthlyAuthorizations >= 7500
    ? "Professional"
    : "Starter";

    const recommendedPrice =
  recommendedPlan === "Enterprise"
    ? "$4,500+/month"
    : recommendedPlan === "Professional"
    ? billingCycle === "annual"
      ? "$5,092/year"
      : "$499/month"
    : billingCycle === "annual"
    ? "$1,520/year"
    : "$149/month";

    const annualSavings =
  recommendedPlan === "Professional"
    ? "$896/year"
    : recommendedPlan === "Starter"
    ? "$268/year"
    : "Custom savings";

    const monthlyHoursSaved =
  (monthlyAuthorizations * minutesSavedPerAuth) / 60;

const monthlyLaborSavings =
  monthlyHoursSaved * hourlyLaborCost;

  const annualLaborSavings =
  monthlyLaborSavings * 12;

  const annualPlanCost =
  recommendedPlan === "Enterprise"
    ? 54000
    : recommendedPlan === "Professional"
    ? billingCycle === "annual"
      ? 5092
      : 5988
    : billingCycle === "annual"
    ? 1520
    : 1788;

    const estimatedAnnualROI =
  annualLaborSavings - annualPlanCost;

  const monthlyPlanCost = annualPlanCost / 12;

const paybackPeriodMonths =
  monthlyLaborSavings > 0
    ? monthlyPlanCost / monthlyLaborSavings
    : 0;

  const plans = [
    {
      name: "Starter",
      price: "$149",
      annual: "$1520",
      storage: "10 GB",
      auths: "2,500/month",
      users: "Up to 5 users",
      features: [
        "Authorization tracking",
        "Standard dashboard",
        "CSV export",
        "Email support",
      ],
    },
    {
      name: "Professional",
      featured: true,
      price: "$349",
      annual: "$3560",
      storage: "50 GB",
      auths: "15,000/month",
      users: "Up to 25 users",
      features: [
        "Everything in Starter",
        "Manager dashboard",
        "Audit log",
        "Priority support",
      ],
    },
    {
      name: "Business",
      price: "$749",
      annual: "$7640",
      storage: "250 GB",
      auths: "75,000/month",
      users: "Up to 100 users",
      features: [
        "Everything in Professional",
        "Advanced reporting",
        "Multi-location support",
        "Team productivity tracking",
      ],
    },
    {
      name: "Enterprise",
      price: "Starting at $4,500",
      annual: "Custom Contract",
      storage: "1 TB+",
      auths: "Unlimited",
      users: "Unlimited users",
      features: [
        "Executive dashboard",
        "API / EHR integration options",
        "Dedicated implementation",
        "Priority enterprise support",
      ],
    },
  ];

  return (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar />

    <div className="pricing-page" style={{ flex: 1 }}>
      <section className="pricing-hero">
        <h1>Simple, Scalable Pricing for Healthcare Authorization Teams</h1>
        <p>
          AuthTrack Pro pricing is based on the storage, authorization volume,
          and features your organization needs — so your plan grows with your
          team.
        </p>
      </section>

      <section className="billing-toggle">

  <button
    className={billingCycle === "monthly" ? "active" : ""}
    onClick={() => setBillingCycle("monthly")}
  >
    Monthly
  </button>

  <button
    className={billingCycle === "annual" ? "active" : ""}
    onClick={() => setBillingCycle("annual")}
  >
    Annual
    <span className="save-badge">Save 15%</span>
  </button>

</section>

      <section className="trial-box">
        <h2>30-Day Free Trial</h2>
        <p>
          Includes up to <strong>500 authorizations</strong>,{" "}
          <strong>2 GB storage</strong>, <strong>5 users</strong>, standard
          dashboards, and email support.
        </p>
      </section>

      <section className="pricing-grid">
        {plans.map((plan) => (
          <div
            className={`pricing-card ${plan.featured ? "featured" : ""}`}
            key={plan.name}
    >
            <h2>{plan.name}</h2>
            <p className="price">
  {billingCycle === "monthly" ? plan.price : plan.annual}
  {plan.name !== "Enterprise" && (
    <span>{billingCycle === "monthly" ? "/month" : "/year"}</span>
  )}
</p>

            <div className="plan-details">
              <p><strong>Storage:</strong> {plan.storage}</p>
              <p><strong>Authorizations:</strong> {plan.auths}</p>
              <p><strong>Users:</strong> {plan.users}</p>
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button className="pricing-button">
              {plan.name === "Enterprise" ? "Request Quote" : "Start Trial"}
            </button>
          </div>
        ))}
      </section>

      <section className="calculator-box">
  <h2>Pricing Calculator</h2>

  <p>
    Estimate which plan is right for your organization based on your expected
    usage.
  </p>

  <div className="calculator-grid">

    <div className="calculator-item">
      <label>Number of Facilities</label>
      <input
        type="number"
        min="1"
        value={facilityCount}
        onChange={(e) => setFacilityCount(Number(e.target.value))}
     />
    </div>

    <div className="calculator-item">
      <label>Number of Users</label>
      <input
        type="number"
        min="1"
        value={userCount}
        onChange={(e) => setUserCount(Number(e.target.value))}
      />
    </div>

    <div className="calculator-item">
      <label>Monthly Authorizations</label>
      <input
        type="number"
        min="1"
        value={monthlyAuthorizations}
        onChange={(e) => setMonthlyAuthorizations(Number(e.target.value))}
      />
    </div>

    <div className="calculator-item">
      <label>Estimated Storage (GB)</label>
      <input
        type="number"
        min="1"
        value={storageNeeded}
        onChange={(e) => setStorageNeeded(Number(e.target.value))}
      />
    </div>

  </div>

  <button className="pricing-button">
    Calculate My Plan
  </button>

  <div className="calculator-result">
  <h3>Recommended Plan</h3>
  <p>
    Based on your organization's projected usage, AuthTrack Pro recommends the{" "}
    <strong>{recommendedPlan}</strong> plan to provide the best balance of performance, storage capacity, and scalability.
  </p>

  <p>
  Estimated Cost: <strong>{recommendedPrice}</strong>
</p>

{billingCycle === "annual" && (
  <p>
    Annual Savings: <strong>{annualSavings}</strong>
  </p>
)}

  <ul className="recommendation-details">
  <li>Facilities: {facilityCount}</li>
  <li>Users: {userCount}</li>
  <li>Monthly Authorizations: {monthlyAuthorizations.toLocaleString()}</li>
  <li>Estimated Storage: {storageNeeded} GB</li>
</ul>

</div>
      </section>
      <section className="comparison-box">
        <h2>Feature Comparison</h2>
  <p>
    Compare AuthTrack Pro plans by features, usage limits, and support level.
  </p>

<table className="comparison-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Starter</th>
      <th className="most-popular-column">
        Professional ⭐
      </th>
      <th>Enterprise</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Authorization Tracking</td>
      <td>Included</td>
      <td>Included</td>
      <td>Included</td>
    </tr>
    <tr>
  <td>Users Included</td>
  <td>Up to 5</td>
  <td>Up to 25</td>
  <td>Unlimited</td>
</tr>
<tr>
  <td>Monthly Authorizations</td>
  <td>2,500/month</td>
  <td>10,000/month</td>
  <td>Custom volume</td>
</tr>
<tr>
  <td>Storage Included</td>
  <td>10 GB</td>
  <td>50 GB</td>
  <td>1 TB+</td>
</tr>
<tr>
  <td>CSV Import / Export</td>
  <td>✓</td>
  <td>✓</td>
  <td>✓</td>
</tr>

<tr>
  <td>Audit Log</td>
  <td>—</td>
  <td>✓</td>
  <td>✓</td>
</tr>

<tr>
  <td>Manager Dashboard</td>
  <td>—</td>
  <td>✓</td>
  <td>✓</td>
</tr>

<tr>
  <td>Executive Dashboard</td>
  <td>—</td>
  <td>—</td>
  <td>✓</td>
</tr>

<tr>
  <td>AI Insights</td>
  <td>—</td>
  <td>Coming Soon</td>
  <td>Included</td>
</tr>
<tr>
  <td>Support Level</td>
  <td>Email Support</td>
  <td>Priority Support</td>
  <td>Dedicated Account Support</td>
</tr>

<tr>
  <td>Implementation Support</td>
  <td>Self-Guided</td>
  <td>Guided Setup</td>
  <td>Custom Implementation</td>
</tr>

<tr>
  <td>BAA Available</td>
  <td>—</td>
  <td>✓</td>
  <td>✓</td>
</tr>
  </tbody>
</table>

</section>

<section className="roi-box">
  <h2>ROI Calculator</h2>
  <p>
    Estimate how much time and cost AuthTrack Pro can help your organization save.
  </p>

  <div className="calculator-item">
  <label>Average Authorizations Per Month</label>
  <input
    type="number"
    min="0"
    value={monthlyAuthorizations}
    onChange={(e) => setMonthlyAuthorizations(Number(e.target.value))}
  />
</div>

<div className="calculator-item">
  <label>Minutes Saved Per Authorization</label>
  <input
    type="number" 
    min="0"
    value={minutesSavedPerAuth}
    onChange={(e) => setMinutesSavedPerAuth(Number(e.target.value))}
  />
</div>

<div className="calculator-item">
  <label>Average Hourly Labor Cost</label>
  <input
    type="number"
    min="0"
    value={hourlyLaborCost}
    onChange={(e) => setHourlyLaborCost(Number(e.target.value))}
  />
</div>

<div className="calculator-result">
  <h3>Estimated ROI</h3>
  <p>
    Monthly Hours Saved: <strong>{monthlyHoursSaved.toFixed(1)}</strong>
  </p>
  <p>
    Estimated Monthly Labor Savings:{" "}
    <strong>${monthlyLaborSavings.toLocaleString()}</strong>
  </p>
  <p>
  Estimated Annual Labor Savings:{" "}
  <strong>${annualLaborSavings.toLocaleString()}</strong>
</p>

<p>
  Estimated Annual ROI After Plan Cost:{" "}
  <strong>${estimatedAnnualROI.toLocaleString()}</strong>
</p>

<p>
  Estimated Payback Period:{" "}
  <strong>{paybackPeriodMonths.toFixed(1)} months</strong>
</p>

</div>

<p className="roi-disclaimer">
  *ROI estimates are based on the information entered and are provided for
  planning purposes only. Actual savings may vary based on staffing,
  workflows, payer requirements, and authorization volume.
</p>

</section>

      <section className="usage-box">
        <h2>Usage-Based Storage</h2>
        <p>
          Additional storage is available at <strong>$10 per 10 GB/month</strong>.
          Enterprise archive storage and large data retention needs can be quoted
          separately.
        </p>
      </section>

      <section className="enterprise-box">
        <h2>Enterprise Organizations</h2>
        <p>
          For large healthcare groups, skilled nursing organizations, and
          multi-location teams, enterprise pricing starts at{" "}
          <strong>$4,500/month</strong> and includes 1 TB storage, unlimited
          users, audit logs, executive dashboards, API access, and priority
          support.
        </p>
      </section>
    </div>
  </div>
  );
}

export default Pricing;