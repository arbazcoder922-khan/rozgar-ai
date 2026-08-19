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

window.onclick = function(event) {
  const modal = document.getElementById("loginModal");
  if (event.target === modal) {
    closeModal();
  }
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
          setTimeout(() => {
            closeModal();
            document.querySelector(".login-btn").textContent = "Logout";
          }, 1500);
        } else {
          setTimeout(() => {
             toggleAuthMode.click();
          }, 2000);
        }
      } else {
        authMessage.style.color = "red";
        authMessage.textContent = data.message;
      }
    } catch(err) {
      console.error(err);
      authMessage.style.color = "red";
      authMessage.textContent = "Server se connect nahi ho saka. Kripya baad me try karein.";
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
      const data = result.recommendations; 
      container.innerHTML = "";

      if(!data || data.length === 0) {
        const noResult = lang === 'hi' ? "इस समय आपके कौशल से मेल खाने वाली कोई इंटर्नशिप नहीं मिली।" : "No internships found matching your skills right now.";
        container.innerHTML = `<p style='text-align:center; grid-column: 1/-1;'>${noResult}</p>`;
        return;
      }

      data.forEach(internship => {
        const viewBtnText = lang === 'hi' ? "विवरण देखें" : "View Details";
        const matchText = lang === 'hi' ? "स्कोर:" : "Score:";
        // Nayi line jisme alert lagaya gaya hai
        const alertMsg = lang === 'hi' ? 'इंटर्नशिप विवरण पेज जल्द ही आ रहा है!' : 'Internship details page is coming soon!';
        
        const card = `
          <div class="internship-card">
            <span class="category">Internship</span>
            <h3>${internship.title}</h3>
            <p><strong>${internship.company}</strong> – ${internship.location}</p>
            <p><strong>${matchText}</strong> ${internship.score}</p>
            <a href="javascript:void(0)" onclick="alert('${alertMsg}')" class="details-btn">${viewBtnText}</a>
          </div>
        `;
        container.innerHTML += card;
      });
    } catch(err) {
      console.error(err);
      const errorText = lang === 'hi' ? "सर्वर से कनेक्ट नहीं हो सका।" : "Could not connect to the server.";
      container.innerHTML = `<p style='text-align:center; grid-column: 1/-1; color: red;'>${errorText}</p>`;
    }
  });
}