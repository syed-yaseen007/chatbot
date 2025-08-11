from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
import os

# OPTIONAL: Set API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY", "AIzaSyAqqy7RsgrgXssSxrDNV_7cQS6COhtE4ok")

app = FastAPI()

# Allow frontend to call backend from different domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatInput(BaseModel):
    user_message: str

@app.post("/chat")
async def chat_endpoint(input: ChatInput):
    try:
        # Send prompt to OpenAI's GPT model
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",   # or another model
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": input.user_message}
            ],
            max_tokens=250,
        )

        bot_reply = completion['choices'][0]['message']['content'].strip()
        return {"bot_response": bot_reply}

    except Exception as e:
        return {"bot_response": f"Error: {str(e)}"}
