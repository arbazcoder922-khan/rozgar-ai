from flask import Flask, request
from recommendation import recommend_internships

app = Flask(__name__)


@app.route("/")
def home():
    return "Rozgar AI Backend is running!"


@app.route("/api/test")
def test_api():
    return {
        "success": True,
        "message": "Rozgar AI API is working!"
    }


@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    user_skills = data.get("skills", [])
    user_location = data.get("location")
    user_education = data.get("education")
    user_interests = data.get("interests", [])

    recommendations = recommend_internships(
        user_skills,
        user_location,
        user_education,
        user_interests
    )

    return {
        "success": True,
        "recommendations": recommendations
    }


if __name__ == "__main__":
    app.run(debug=True)