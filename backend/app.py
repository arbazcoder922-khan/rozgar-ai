from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from recommendation import recommend_internships
import os

app = Flask(__name__)
CORS(app)

# ----------------- DATABASE SETUP -----------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User Table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

# Create database file if it doesn't exist
with app.app_context():
    db.create_all()
# --------------------------------------------------

@app.route("/")
def home():
    return "Rozgar AI Backend with Auth is running!"

@app.route("/api/test")
def test_api():
    return {
        "success": True,
        "message": "Rozgar AI API is working!"
    }

# ------------------ AUTHENTICATION ----------------
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email aur password dono dena zaroori hai."}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"success": False, "message": "Ye email pehle se registered hai."}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "message": "Account successfully ban gaya hai!"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"success": False, "message": "Galat email ya password."}), 401

    return jsonify({"success": True, "message": "Login successful!", "email": user.email})
# --------------------------------------------------

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

    return jsonify({
        "success": True,
        "recommendations": recommendations
    })

if __name__ == "__main__":
    # Render deployment pe debug=False rakhna chahiye
    app.run(debug=False)