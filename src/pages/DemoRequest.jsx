import { useState } from "react";
import API_BASE from "../api/api";

function DemoRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    jobTitle: "",
    email: "",
    phone: "",
    providers: "",
    facilities: "",
    currentEhr: "",
    biggestChallenge: "",
    preferredDate: "",
    preferredTime: "",
    additionalComments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async () => {
  try {
    const response = await fetch(`${API_BASE}/demo-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit demo request");
    }

    alert("Thank you! Your demo request has been submitted.");

    setFormData({
      fullName: "",
      company: "",
      jobTitle: "",
      email: "",
      phone: "",
      providers: "",
      facilities: "",
      currentEhr: "",
      biggestChallenge: "",
      preferredDate: "",
      preferredTime: "",
      additionalComments: "",
    });
  } catch (error) {
    console.error(error);
    alert("Unable to submit your demo request. Please try again.");
  }
};

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "30px" }}>
  <h1>Request a Live Demo</h1>

  <p>
    We'd love to show you how AuthTrack Pro can streamline your prior
    authorization workflow.
  </p>

  <br />

  <label>Full Name</label>
  <input
    type="text"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
  />

  <label>Company</label>
  <input
    type="text"
    name="company"
    value={formData.company}
    onChange={handleChange}
    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
  />

  <label>Job Title</label>
  <input
    type="text"
    name="jobTitle"
    value={formData.jobTitle}
    onChange={handleChange}
    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
  />
  <label>Email</label>
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
/>

<label>Phone</label>
<input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
/>

<label>Number of Providers</label>
<input
  type="number"
  name="providers"
  value={formData.providers}
  onChange={handleChange}
  style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
/>

<label>Number of Facilities</label>
<input
  type="number"
  name="facilities"
  value={formData.facilities}
  onChange={handleChange}
  style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
/>

<label>Current EHR</label>

<select
  name="currentEhr"
  value={formData.currentEhr}
  onChange={handleChange}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  }}
>
  <option value="">Select your EHR</option>
  <option value="Epic">Epic</option>
  <option value="Cerner">Cerner</option>
  <option value="NextGen">NextGen</option>
  <option value="Athenahealth">Athenahealth</option>
  <option value="eClinicalWorks">eClinicalWorks</option>
  <option value="Meditech">Meditech</option>
  <option value="PointClickCare">PointClickCare</option>
  <option value="Allscripts">Allscripts</option>
  <option value="Greenway">Greenway</option>
  <option value="Practice Fusion">Practice Fusion</option>
  <option value="Other">Other</option>
</select>

<label>Biggest Prior Authorization Challenge</label>

<textarea
  name="biggestChallenge"
  value={formData.biggestChallenge}
  onChange={handleChange}
  rows={5}
  placeholder="Tell us about your biggest authorization challenges..."
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    resize: "vertical",
  }}
/>

<label>Preferred Demo Date</label>

<input
  type="date"
  name="preferredDate"
  value={formData.preferredDate}
  onChange={handleChange}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  }}
/>

<label>Preferred Demo Time</label>

<input
  type="time"
  name="preferredTime"
  value={formData.preferredTime}
  onChange={handleChange}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  }}
/>

<label>Additional Comments</label>

<textarea
  name="additionalComments"
  value={formData.additionalComments}
  onChange={handleChange}
  rows={4}
  placeholder="Anything else you'd like us to know before your demo?"
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    resize: "vertical",
  }}
/>

<button
  type="button"
  onClick={handleSubmit}
  style={{
    width: "100%",
    padding: "14px",
    background: "#1E3A8A",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  }}
>
  Submit Demo Request
</button>

</div>
  );
}

export default DemoRequest;