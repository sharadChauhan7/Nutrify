from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from mistralai import Mistral
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

CORS(app)


api_key = os.environ["MISTRAL_API_KEY"]
client = Mistral(api_key=api_key)
nutrifyai = 'ag:21be9d5a:20250128:nutrify-ai:984c158b'

def run_python_agent(agent_id, query):
    try:
        response = client.agents.complete(
            agent_id=agent_id,
            messages=[
                {
                    "role": "user",
                    "content": query
                },
            ]
        )
        result = response.choices[0].message.content
        return result
    except Exception as e:
        return f"Request failed: {e}. Please check your request."

@app.route('/analyze_query', methods=['POST'])
def analyze_query():
    data = request.get_json()
    query = data.get('query')
    if not query:
        return jsonify({"error": "No query provided"}), 400

    response = run_python_agent(nutrifyai, query)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)