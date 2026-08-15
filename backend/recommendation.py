from data import internships


def recommend_internships(
    user_skills,
    user_location=None,
    user_education=None,
    user_interests=None
):
    recommendations = []

    user_skills = [
        skill.lower().strip()
        for skill in user_skills
    ]

    user_interests = [
        interest.lower().strip()
        for interest in (user_interests or [])
    ]

    user_education = (
        user_education.lower().strip()
        if user_education
        else None
    )

    for internship in internships:

        internship_skills = [
            skill.lower()
            for skill in internship["skills"]
        ]

        internship_education = [
            education.lower()
            for education in internship["education"]
        ]

        internship_interests = [
            interest.lower()
            for interest in internship["interests"]
        ]

        matched_skills = (
            set(user_skills) & set(internship_skills)
        )

        matched_interests = (
            set(user_interests) & set(internship_interests)
        )

        score = 0

        # Skills matching
        score += len(matched_skills) * 2

        # Education matching
        if user_education in internship_education:
            score += 2

        # Location matching
        if user_location:
            if user_location.lower() == internship["location"].lower():
                score += 2

        # Interest matching
        score += len(matched_interests) * 2

        if score > 0:
            recommendations.append({
                "id": internship["id"],
                "title": internship["title"],
                "company": internship["company"],
                "location": internship["location"],
                "matched_skills": list(matched_skills),
                "matched_interests": list(matched_interests),
                "score": score
            })

    recommendations.sort(
        key=lambda internship: internship["score"],
        reverse=True
    )

    return recommendations[:5]