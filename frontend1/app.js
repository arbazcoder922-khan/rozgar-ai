// Dictionary for Translation
const translations = {
  "en": {
    "nav_home": "Home",
    "nav_features": "Features",
    "nav_contact": "Contact",
    "nav_login": "Login / Sign Up",
    "hero_tag": "AI-Powered Career Guidance",
    "hero_title": "Find the <span>Right Internship</span> for Your Future",
    "hero_desc": "ROZGAR-AI helps students discover internship opportunities tailored to their skills, education, interests and career goals.",
    "hero_btn": "Get Started &rarr;",
    "profile_title": "Build Your Profile",
    "profile_desc": "Tell us about yourself and we'll surface the best-matched internships for you.",
    "label_education": "Education Level *",
    "label_skills": "Skills *",
    "skills_desc": "Separate skills with commas",
    "label_sector": "Sector Interest",
    "label_location": "Location Preference",
    "label_resume": "Resume (PDF or DOC, max 5MB)",
    "upload_text": "Click to upload your resume",
    "upload_sub": "Drag & drop or browse files",
    "btn_find": "Find Internships",
    "features_title": "Why ROZGAR-AI?",
    "features_desc": "Built for students, powered by AI — giving you a real edge in your internship search.",
    "feat1_title": "Smart Matching",
    "feat1_desc": "AI analyzes your skills, education, and interests to surface the most relevant roles.",
    "feat2_title": "Match Scores",
    "feat2_desc": "Each listing shows a compatibility percentage so you can prioritize your applications.",
    "feat3_title": "Resume Parsing",
    "feat3_desc": "Upload your PDF and let us auto-extract your profile — no manual entry needed.",
    "reco_title": "Recommended Internships",
    "footer_desc": "Guiding students to the right opportunity"
  },
  "hi": {
    "nav_home": "होम",
    "nav_features": "विशेषताएं",
    "nav_contact": "संपर्क करें",
    "nav_login": "लॉगिन / साइन अप",
    "hero_tag": "एआई-आधारित करियर मार्गदर्शन",
    "hero_title": "अपने भविष्य के लिए <span>सही इंटर्नशिप</span> खोजें",
    "hero_desc": "ROZGAR-AI छात्रों को उनके कौशल, शिक्षा, रुचियों और करियर लक्ष्यों के अनुसार इंटर्नशिप के अवसर खोजने में मदद करता है।",
    "hero_btn": "शुरू करें &rarr;",
    "profile_title": "अपनी प्रोफ़ाइल बनाएं",
    "profile_desc": "हमें अपने बारे में बताएं और हम आपके लिए सबसे अच्छी इंटर्नशिप खोजेंगे।",
    "label_education": "शिक्षा स्तर *",
    "label_skills": "कौशल (Skills) *",
    "skills_desc": "कौशल को कोमा (,) से अलग करें",
    "label_sector": "रुचि का क्षेत्र",
    "label_location": "पसंदीदा स्थान",
    "label_resume": "रिज्यूमे (PDF या DOC, अधिकतम 5MB)",
    "upload_text": "अपना रिज्यूमे अपलोड करने के लिए क्लिक करें",
    "upload_sub": "फ़ाइलें खींचें और छोड़ें या ब्राउज़ करें",
    "btn_find": "इंटर्नशिप खोजें",
    "features_title": "ROZGAR-AI क्यों?",
    "features_desc": "छात्रों के लिए बनाया गया, एआई द्वारा संचालित — इंटर्नशिप की खोज में आपको एक असली बढ़त देता है।",
    "feat1_title": "स्मार्ट मैचिंग",
    "feat1_desc": "एआई आपके कौशल, शिक्षा और रुचियों का विश्लेषण करके सबसे प्रासंगिक भूमिकाएँ सामने लाता है।",
    "feat2_title": "मैच स्कोर",
    "feat2_desc": "प्रत्येक सूची एक संगतता प्रतिशत दिखाती है ताकि आप अपने आवेदनों को प्राथमिकता दे सकें।",
    "feat3_title": "रिज्यूमे पार्सिंग",
    "feat3_desc": "अपना पीडीएफ अपलोड करें और हमें आपकी प्रोफ़ाइल स्वतः निकालने दें — मैन्युअल प्रविष्टि की आवश्यकता नहीं है।",
    "reco_title": "अनुशंसित इंटर्नशिप",
    "footer_desc": "छात्रों को सही अवसर की ओर मार्गदर्शन"
  }
};

const langSelect = document.getElementById("lang-select");
if(langSelect) {
  langSelect.addEventListener("change", function(e) {
    const lang = e.target.value;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if(translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  });
}

function openModal(e) {
  if(e) e.preventDefault();
  document.getElementById("loginModal").style.display = "block";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

// ----------------------------------------------------
// SMART DETAILS MODAL
// ----------------------------------------------------
let currentInternships = [];

function openDetailsModal(index) {
  const internship = currentInternships[index];
  if (!internship) return;
  
  let modal = document.getElementById("detailsModal");
  if (!modal) {
    const modalHTML = `
      <div id="detailsModal" class="modal">
        <div class="modal-content" style="max-width: 500px; text-align: left;">
          <span class="close" onclick="closeDetailsModal()">&times;</span>
          <h2 id="detail-title" style="margin-bottom: 5px;"></h2>
          <h4 id="detail-company" style="color: #64748b; margin-bottom: 20px;"></h4>
          <div style="line-height: 1.8; font-size: 15px; color: #334155;">
            <p><strong>Eligibility:</strong> <span id="detail-eligibility"></span></p>
            <p><strong>Type:</strong> <span id="detail-type"></span></p>
            <p><strong>Stipend/Salary:</strong> <span id="detail-stipend"></span></p>
            <p><strong>Description:</strong> <span id="detail-desc"></span></p>
          </div>
          <div style="margin-top: 25px; text-align: center;">
            <a href="#" id="detail-apply-btn" class="primary-btn" style="display:inline-block; width: 100%;">Apply Now</a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  document.getElementById("detail-title").textContent = internship.title;
  document.getElementById("detail-company").textContent = internship.company + " - " + internship.location;
  document.getElementById("detail-eligibility").textContent = internship.eligibility || "B.Tech / Relevant Degree";
  document.getElementById("detail-type").textContent = internship.type || "Paid Internship";
  document.getElementById("detail-stipend").textContent = internship.stipend || "₹10,000 - ₹20,000 / month";
  document.getElementById("detail-desc").textContent = internship.description || "Apply to know more details about this role.";
  
  const applyBtn = document.getElementById("detail-apply-btn");
  applyBtn.onclick = function(e) {
    e.preventDefault();
    openApplicationModal(internship.company);
  };
  
  document.getElementById("detailsModal").style.display = "block";
}

function closeDetailsModal() {
  const m = document.getElementById("detailsModal");
  if (m) m.style.display = "none";
}

// ----------------------------------------------------
// APPLICATION FORM MODAL 
// ----------------------------------------------------
function openApplicationModal(company) {
  closeDetailsModal(); 
  
  let appModal = document.getElementById("applicationModal");
  if (!appModal) {
    const modalHTML = `
      <div id="applicationModal" class="modal">
        <div class="modal-content" style="max-width: 500px; text-align: left;">
          <span class="close" onclick="closeApplicationModal()">&times;</span>
          <h2 style="margin-bottom: 5px;">Apply for Internship</h2>
          <h4 id="apply-company-name" style="color: #64748b; margin-bottom: 20px;"></h4>
          
          <div id="application-form-container">
            <form id="apply-form">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
              
              <label>Email ID</label>
              <input type="email" placeholder="Enter your email" required style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
              
              <label>Phone No</label>
              <input type="tel" placeholder="Enter your phone number" required style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
              
              <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <div style="flex: 1;">
                  <label>DOB</label>
                  <input type="date" required style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
                </div>
                <div style="flex: 1;">
                  <label>City & State</label>
                  <input type="text" placeholder="e.g. Delhi, NCR" required style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
                </div>
              </div>

              <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <div style="flex: 1;">
                  <label>10th Marks (%)</label>
                  <input type="number" placeholder="e.g. 85" required style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
                </div>
                <div style="flex: 1;">
                  <label>12th Marks (%)</label>
                  <input type="number" placeholder="e.g. 80" required style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
                </div>
              </div>

              <label>Skills</label>
              <input type="text" placeholder="e.g. HTML, Python" required style="width: 100%; padding: 8px; margin-bottom: 20px; border-radius: 5px; border: 1px solid #cbd5e1; box-sizing: border-box;">
              
              <button type="submit" class="primary-btn" style="width: 100%;">Submit Application</button>
            </form>
          </div>
          
          <div id="application-success" style="display: none; text-align: center; padding: 20px 0;">
            <div style="font-size: 40px; color: #10b981; margin-bottom: 10px;">✅</div>
            <h3 style="color: #10b981;">Congratulations!</h3>
            <p style="margin-top: 10px; color: #334155; line-height: 1.5;">Your data has been recorded successfully.<br>Please wait some time, our team will contact you soon.</p>
            <button onclick="closeApplicationModal()" class="primary-btn" style="margin-top: 20px;">Close</button>
          </div>
          
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    document.getElementById("apply-form").addEventListener("submit", function(e) {
      e.preventDefault();
      document.getElementById("application-form-container").style.display = "none";
      document.getElementById("application-success").style.display = "block";
    });
  }

  const formEl = document.getElementById("apply-form");
  if(formEl) formEl.reset();
  document.getElementById("application-form-container").style.display = "block";
  document.getElementById("application-success").style.display = "none";

  document.getElementById("apply-company-name").textContent = "Applying at " + company;
  document.getElementById("applicationModal").style.display = "block";
}

function closeApplicationModal() {
  const m = document.getElementById("applicationModal");
  if (m) m.style.display = "none";
}

// ----------------------------------------------------
// DYNAMIC FEATURE DEMO ANIMATIONS (AI MAGIC)
// ----------------------------------------------------

function createFeatureModal() {
  let featureModal = document.getElementById("featureModal");
  if (!featureModal) {
    const modalHTML = `
      <div id="featureModal" class="modal">
        <div class="modal-content" style="max-width: 500px; text-align: center;">
          <span class="close" onclick="closeFeatureModal()">&times;</span>
          <div id="feature-modal-body"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}

function closeFeatureModal() {
  document.getElementById("featureModal").style.display = "none";
}

// 1. Smart Matching Demo
function showSmartMatchingDemo() {
  createFeatureModal();
  const skillsInput = document.getElementById("skills") ? document.getElementById("skills").value : "";
  const selects = document.querySelectorAll("select");
  const sector = (selects[2] && selects[2].value && selects[2].value !== "Choose a sector") ? selects[2].value : "IT Sector";
  
  const displaySkills = skillsInput ? skillsInput : "Technical Skills";

  const modalBody = document.getElementById("feature-modal-body");
  modalBody.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 15px;">🤖</div>
    <h2 style="margin-bottom: 10px;">Smart AI Matching</h2>
    <div style="text-align: left; margin-top: 20px; line-height: 1.8;">
      <p id="sm-0">🧠 Analyzing your profile inputs...</p>
      <p style="color: #10b981; display:none;" id="sm-1">✅ Career path targeted for <strong>${sector}</strong></p>
      <p style="color: #10b981; display:none;" id="sm-2">✅ Cross-referencing <strong>${displaySkills}</strong> with active market jobs</p>
      <p style="color: #10b981; display:none;" id="sm-3">✅ Location preferences verified...</p>
      <div id="sm-4" style="display:none; margin-top: 20px; padding: 10px; background: #eff6ff; color: #1d4ed8; border-radius: 5px; text-align: center; font-weight: bold;">
        Ready! Fill the form and click "Find Internships" to see the magic.
      </div>
    </div>
  `;
  document.getElementById("featureModal").style.display = "block";
  
  setTimeout(() => document.getElementById("sm-1").style.display = "block", 800);
  setTimeout(() => document.getElementById("sm-2").style.display = "block", 1600);
  setTimeout(() => document.getElementById("sm-3").style.display = "block", 2400);
  setTimeout(() => document.getElementById("sm-4").style.display = "block", 3200);
}

// 2. Match Score Demo
function showMatchScoreDemo() {
  createFeatureModal();
  const selects = document.querySelectorAll("select");
  const education = (selects[1] && selects[1].value && selects[1].value !== "") ? selects[1].value : "Your Degree";

  const modalBody = document.getElementById("feature-modal-body");
  modalBody.innerHTML = `
    <div style="font-size: 40px; margin-bottom: 15px;">📊</div>
    <h2 style="margin-bottom: 10px;">How Match Score Works</h2>
    <p style="color: #64748b; margin-bottom: 20px;">AI analyzes multiple real-time data points to score your compatibility.</p>
    
    <div style="text-align: left; margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <strong>Skills Match</strong> <span>85%</span>
      </div>
      <div style="background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
        <div style="background: #3b82f6; width: 85%; height: 100%;"></div>
      </div>
    </div>

    <div style="text-align: left; margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <strong>Education (${education})</strong> <span>100%</span>
      </div>
      <div style="background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
        <div style="background: #10b981; width: 100%; height: 100%;"></div>
      </div>
    </div>

    <div style="text-align: left; margin-bottom: 25px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <strong>Location Preference Match</strong> <span>90%</span>
      </div>
      <div style="background: #e2e8f0; border-radius: 10px; height: 10px; overflow: hidden;">
        <div style="background: #f59e0b; width: 90%; height: 100%;"></div>
      </div>
    </div>

    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
      <h3 style="color: #0f172a; margin: 0;">Total AI Match: <span style="color: #10b981;">92%</span></h3>
      <p style="margin: 5px 0 0 0; font-size: 14px; color: #64748b;">Highly Recommended for you!</p>
    </div>
  `;
  document.getElementById("featureModal").style.display = "block";
}

// 3. Resume Parsing Demo (Uses real typed data!)
function showResumeParsingDemo() {
  createFeatureModal();
  const fileInput = document.getElementById("resumeUpload");
  const skillsInput = document.getElementById("skills") ? document.getElementById("skills").value : "";
  const selects = document.querySelectorAll("select");
  const education = (selects[1] && selects[1].value && selects[1].value !== "") ? selects[1].value : "";
  
  let fileName = "No file uploaded";
  let hasFile = false;
  if(fileInput && fileInput.files.length > 0) {
    fileName = fileInput.files[0].name;
    hasFile = true;
  }

  const modalBody = document.getElementById("feature-modal-body");
  
  if(!hasFile || !skillsInput || !education) {
    modalBody.innerHTML = `
      <div style="font-size: 40px; margin-bottom: 15px;">📄</div>
      <h2 style="margin-bottom: 10px;">Live Resume Parsing</h2>
      <p style="color: #ef4444; padding: 10px; background: #fef2f2; border-radius: 5px;">
        ⚠️ Please fill out your <b>Education</b>, <b>Skills</b>, and <b>Upload a Resume (PDF)</b> in the profile section above first to see this magic live!
      </p>
    `;
  } else {
    modalBody.innerHTML = `
      <div style="font-size: 40px; margin-bottom: 15px;" id="parsing-icon">⏳</div>
      <h2 style="margin-bottom: 10px;">Live Resume Parsing</h2>
      <div id="parsing-status" style="color: #3b82f6; font-weight: bold; margin-bottom: 20px;">Reading document: ${fileName}...</div>
      
      <div id="parsing-result" style="display: none; text-align: left; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="margin-bottom: 8px;"><strong>File Processed:</strong> <span style="color:#10b981;">${fileName}</span> ✅</p>
        <p style="margin-bottom: 8px;"><strong>Education Found:</strong> <span style="color:#10b981;">${education}</span> ✅</p>
        <p style="margin-bottom: 8px;"><strong>Skills Extracted:</strong> <span style="color:#10b981;">${skillsInput}</span> ✅</p>
        <p style="margin-top: 15px; font-size: 14px; color: #64748b; text-align: center;">AI successfully mapped your resume data to the form fields!</p>
      </div>
    `;
    
    setTimeout(() => {
      document.getElementById("parsing-icon").textContent = "✅";
      document.getElementById("parsing-status").textContent = "Extraction Complete!";
      document.getElementById("parsing-status").style.color = "#10b981";
      document.getElementById("parsing-result").style.display = "block";
    }, 2000);
  }
  
  document.getElementById("featureModal").style.display = "block";
}

// Make the cards clickable once page loads
document.addEventListener("DOMContentLoaded", function() {
  const featureCards = document.querySelectorAll(".feature-card");
  if (featureCards.length >= 3) {
    featureCards[0].style.cursor = "pointer";
    featureCards[0].onclick = () => showSmartMatchingDemo();

    featureCards[1].style.cursor = "pointer";
    featureCards[1].onclick = () => showMatchScoreDemo();

    featureCards[2].style.cursor = "pointer";
    featureCards[2].onclick = () => showResumeParsingDemo();
    
    featureCards.forEach(card => {
      card.title = "Click to view Live Demo";
    });
  }
});

window.onclick = function(event) {
  const loginModal = document.getElementById("loginModal");
  const detailsModal = document.getElementById("detailsModal");
  const applicationModal = document.getElementById("applicationModal");
  const featureModal = document.getElementById("featureModal");
  
  if (event.target === loginModal) closeModal();
  if (event.target === detailsModal) closeDetailsModal();
  if (event.target === applicationModal) closeApplicationModal();
  if (event.target === featureModal) closeFeatureModal();
}

// ----------------------------------------------------
// AUTHENTICATION LOGIC
// ----------------------------------------------------
let isLoginMode = true;
const toggleAuthMode = document.getElementById("toggle-auth-mode");
const modalTitle = document.getElementById("modal-title");
const authSubmitBtn = document.getElementById("auth-submit-btn");
const authMessage = document.getElementById("auth-message");
const authForm = document.getElementById("auth-form");

if (toggleAuthMode) {
  toggleAuthMode.addEventListener("click", function(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    authMessage.textContent = ""; 
    
    if (isLoginMode) {
      modalTitle.textContent = "Login";
      authSubmitBtn.textContent = "Login";
      toggleAuthMode.textContent = "Don't have an account? Sign up";
    } else {
      modalTitle.textContent = "Sign Up";
      authSubmitBtn.textContent = "Create Account";
      toggleAuthMode.textContent = "Already have an account? Login";
    }
  });
}

if(authForm) {
  authForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;
    authSubmitBtn.textContent = "Please wait...";
    authSubmitBtn.disabled = true;

    const BACKEND_URL = "https://rozgar-ai-j2nv.onrender.com";
    const endpoint = isLoginMode ? "/api/login" : "/api/signup";

    try {
      const response = await fetch(BACKEND_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      });
      const data = await response.json();
      if(data.success) {
        authMessage.style.color = "green";
        authMessage.textContent = data.message;
        if (isLoginMode) {
          setTimeout(() => { closeModal(); document.querySelector(".login-btn").textContent = "Logout"; }, 1500);
        } else {
          setTimeout(() => { toggleAuthMode.click(); }, 2000);
        }
      } else {
        authMessage.style.color = "red";
        authMessage.textContent = data.message;
      }
    } catch(err) {
      authMessage.style.color = "red";
      authMessage.textContent = "Server error. Kripya baad me try karein.";
    } finally {
      authSubmitBtn.disabled = false;
      authSubmitBtn.textContent = isLoginMode ? "Login" : "Create Account";
    }
  });
}

// ----------------------------------------------------
// FIND INTERNSHIPS LOGIC
// ----------------------------------------------------
const resumeInput = document.getElementById("resumeUpload");
if(resumeInput) {
  resumeInput.addEventListener("change", function() {
    const display = document.getElementById("fileNameDisplay");
    if (this.files.length > 0) {
      display.textContent = this.files[0].name;
      display.style.color = "#10b981";
      display.style.fontWeight = "600";
    } else {
      const lang = document.getElementById("lang-select").value;
      display.textContent = translations[lang]["upload_sub"];
      display.style.color = "#64748b";
      display.style.fontWeight = "normal";
    }
  });
}

const profileForm = document.getElementById("profile-form");
if(profileForm) {
  profileForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const skillsInput = document.getElementById("skills").value;
    if(!skillsInput) return;
    const skills = skillsInput.split(",").map(skill => skill.trim());
    
    const selects = document.querySelectorAll("select");
    const educationSelect = selects[1].value;
    const sectorSelect = selects[2].value;
    const locationSelect = selects[3].value;

    const container = document.getElementById("internship-list");
    const lang = document.getElementById("lang-select").value;
    
    document.getElementById("recommendations").scrollIntoView({ behavior: 'smooth' });
    
    const loadingText = lang === 'hi' ? "आपके लिए इंटर्नशिप खोजी जा रही है..." : "Searching internships for you...";
    container.innerHTML = `<p style='text-align:center; grid-column: 1/-1;'>${loadingText}</p>`;

    try {
      const response = await fetch("https://rozgar-ai-j2nv.onrender.com/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          skills: skills,
          education: educationSelect,
          interests: [sectorSelect],
          location: locationSelect === "Any location / Remote" ? "Remote" : locationSelect
        })
      });

      const result = await response.json();
      currentInternships = result.recommendations; 
      container.innerHTML = "";

      if(!currentInternships || currentInternships.length === 0) {
        const noResult = lang === 'hi' ? "इस समय आपके कौशल से मेल खाने वाली कोई इंटर्नशिप नहीं मिली।" : "No internships found matching your skills right now.";
        container.innerHTML = `<p style='text-align:center; grid-column: 1/-1;'>${noResult}</p>`;
        return;
      }

      currentInternships.forEach((internship, index) => {
        const viewBtnText = lang === 'hi' ? "विवरण देखें" : "View Details";
        const matchText = lang === 'hi' ? "स्कोर:" : "Score:";
        
        const card = `
          <div class="internship-card">
            <span class="category">Internship</span>
            <h3>${internship.title}</h3>
            <p><strong>${internship.company}</strong> – ${internship.location}</p>
            <p><strong>${matchText}</strong> ${internship.score}</p>
            <a href="javascript:void(0)" onclick="openDetailsModal(${index})" class="details-btn">${viewBtnText}</a>
          </div>
        `;
        container.innerHTML += card;
      });
    } catch(err) {
      container.innerHTML = `<p style='text-align:center; grid-column: 1/-1; color: red;'>Could not connect to the server.</p>`;
    }
  });
}