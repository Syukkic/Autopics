import os
from os.path import dirname, join
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import AzureOpenAI

from .models import Prompt

dotenv_path = join(dirname(Path(__file__).parent), ".env")
load_dotenv(dotenv_path)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def image_generate(prompt: str, size="1024x1024"):
    client = AzureOpenAI(
        api_version=os.environ["API_VERSION"],
        azure_endpoint=os.environ["AZURE_API_ENDPOINT"],
        api_key=os.environ["AZURE_API_KEY"],
    )

    # size options: ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792']
    response = client.images.generate(model="AutoPic", prompt=prompt, n=1, size=size)

    print(response.model_dump_json())

    return response.model_dump_json()


@app.get("/")
async def index():
    return {"message": "hello world"}


@app.post("/api/generate")
async def generate_image(prompt: Prompt):
    return image_generate(prompt.input)
