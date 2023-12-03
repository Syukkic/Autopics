import os
from os.path import dirname, join
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import AzureOpenAI, BadRequestError

from .models import Description

dotenv_path = join(dirname(Path(__file__).parent), '.env')
load_dotenv(dotenv_path)
app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=['*'],
	allow_credentials=True,
	allow_methods=['*'],
	allow_headers=['*'],
)


def image_generate(prompt: str, size='1024x1024'):
	client = AzureOpenAI(
		api_version=os.environ['API_VERSION'],
		azure_endpoint=os.environ['AZURE_API_ENDPOINT'],
		api_key=os.environ['AZURE_API_KEY'],
	)

	# size options: ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792']
	response = client.images.generate(model='AutoPic', prompt=prompt, n=1, size=size)

	print(response.model_dump_json())

	return response.model_dump_json()


@app.post('/')
async def index():
	return {'message': 'hello world'}


@app.post('/api/generate')
async def generate_image(description: Description):
	try:
		return image_generate(description.prompt)
	except BadRequestError as e:
		print(e)
		return HTTPException(
			status_code=400,
			code='contentFilter',
			message='Your task failed as a result of our safety system.',
		)
