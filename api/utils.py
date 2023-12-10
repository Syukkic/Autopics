import ast
import json
import os
from os.path import dirname, join
from pathlib import Path

from dotenv import load_dotenv
from openai import APIConnectionError, APITimeoutError, AzureOpenAI, BadRequestError, RateLimitError

dotenv_path = join(dirname(Path(__file__).parent), '.env')
load_dotenv(dotenv_path)


def image_generate(prompt: str, size='1024x1024'):
    client = AzureOpenAI(
        api_version=os.environ['API_VERSION'],
        azure_endpoint=os.environ['AZURE_API_ENDPOINT'],
        api_key=os.environ['AZURE_API_KEY'],
    )

    try:
        # size options: ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792']
        response = client.images.generate(model='AutoPic', prompt=prompt, n=1, size=size)
        result = {'status': 'success', 'response': json.loads(response.model_dump_json())}
    except (BadRequestError, APITimeoutError, RateLimitError, APIConnectionError) as e:
        error_message = ast.literal_eval(str(e).split('- ')[-1])
        result = {'status': 'error', 'response': error_message['error']['message']}
    finally:
        print(result)
        return result
