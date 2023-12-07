from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .models import Description
from .utils import image_generate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.post('/')
async def index():
    return {'message': 'hello world'}


@app.post('/api/generate')
async def generate_image(description: Description):
    return JSONResponse(content=jsonable_encoder(image_generate(description.prompt)))
