// api/internships.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { skills } = req.body || { skills: [] };

    // Aapke internships ka dummy data
    const internships = [
      { category: "Technology", title: "Software Engineering Intern", company: "Google India", location: "Bangalore", match: 94 },
      { category: "Product", title: "Product Management Intern", company: "Flipkart", location: "Bangalore", match: 87 },
      { category: "Data", title: "Data Science Intern", company: "Zomato", location: "Gurugram", match: 82 },
      { category: "Design", title: "UX Research Intern", company: "Swiggy", location: "Hyderabad", match: 79 },
      { category: "Technology", title: "Machine Learning Intern", company: "NVIDIA India", location: "Pune", match: 76 },
      { category: "Finance", title: "Finance & Strategy Intern", company: "HDFC Bank", location: "Mumbai", match: 71 }
    ];

    // Skills ke hisaab se filter
    const matched = internships.filter(i =>
      skills.some(skill => i.title.toLowerCase().includes(skill.toLowerCase()))
    );

    res.status(200).json(matched.length ? matched : internships);
  } else {
    res.status(405).json({ error: 'POST request chahiye' });
  }
}