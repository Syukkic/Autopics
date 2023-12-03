from pydantic import BaseModel


class Description(BaseModel):
	prompt: str
