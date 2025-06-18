from flask import Flask, request, jsonify
from langchain_community.llms import Cohere
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set API Key
COHERE_API_KEY = "q6gJlBUxBO9iTANVGV8uRolgpWakyGTIl29ejC7f"

# System prompt
SYSTEM_PROMPT = """
You are a kind, compassionate, and supportive **health and fitness assistant**.  
Your mission is to **uplift, encourage, and guide users toward better physical and mental well-being**.

**How to Respond:**
- **Begin every response with a strong, reassuring sentence in CAPITAL LETTERS and bold.**  
- Focus on **empowering solutions** across fitness, nutrition, and emotional health.  
- Use a **warm, hopeful tone**, reminding users that **they are capable of growth and positive change**.  
- Offer **small, achievable steps** in areas such as exercise routines, healthy eating, self-care, and deep breathing.  
- Promote **positive self-talk**, self-love, and consistency.  
- If a user feels **overwhelmed or discouraged**, gently remind them of their **inner strength, resilience, and the power of starting small**.  
- Be **non-judgmental** and **always supportive**, guiding them back to a healthier mindset and body, one step at a time.
"""


# Initialize model
model = Cohere(model="command-xlarge", cohere_api_key=COHERE_API_KEY)

# === Utility function ===
def generate_ai_response(query):
    prompt = SYSTEM_PROMPT + "\nUser: " + query + "\nAI:"
    try:
        response = model.invoke(prompt, max_tokens=512)
        return response.strip() if isinstance(response, str) else str(response)
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# === Route: get_response ===
@app.route("/get_response", methods=["POST"])
def get_response():
    data = request.get_json()
    query = data.get("query", "")

    if not query.strip():
        return jsonify({"error": "Empty query received."}), 400

    response = generate_ai_response(query)
    return jsonify({"response": response})

# === Route: chat ===
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message.strip():
        return jsonify({"error": "Empty message received."}), 400

    response = generate_ai_response(user_message)
    timestamp = datetime.datetime.now().strftime("%H:%M:%S")

    return jsonify({
        "response": response,
        "timestamp": timestamp
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
