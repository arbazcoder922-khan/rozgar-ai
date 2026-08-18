
const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/internships", (req, res) => {
  const { skills } = req.body;

  const internships = [
    { category: "Technology", title: "Software Engineering Intern", company: "Google India", location: "Bangalore", match: 94 },
    { category: "Product", title: "Product Management Intern", company: "Flipkart", location: "Bangalore", match: 87 },
    { category: "Data", title: "Data Science Intern", company: "Zomato", location: "Gurugram", match: 82 },
    { category: "Design", title: "UX Research Intern", company: "Swiggy", location: "Hyderabad", match: 79 },
    { category: "Technology", title: "Machine Learning Intern", company: "NVIDIA India", location: "Pune", match: 76 },
    { category: "Finance", title: "Finance & Strategy Intern", company: "HDFC Bank", location: "Mumbai", match: 71 }
  ];

  const matched = internships.filter(i =>
    skills.some(skill => i.title.toLowerCase().includes(skill.toLowerCase()))
  );

  res.json(matched.length ? matched : internships);
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
