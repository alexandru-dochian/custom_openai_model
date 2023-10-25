import os
import time

import openai
import logging

from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.DEBUG)


class QueryRequest(BaseModel):
    query_string: str


openai.api_key = os.getenv("openai_api_key")

app = FastAPI()

app.mount("/ener_gpt", app)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"health": True}


@app.post("/query")
async def query(query_request: QueryRequest):
    logging.info(f"query_string={query_request.query_string}")
    
    answer = openai.Completion.create(
        model=os.getenv("openai_model_id"),
        prompt=query_request.query_string,
        max_tokens=128,
        temperature=0.5
    )
    response = answer['choices'][0]['text']
    
    logging.info(f"answer= {response}")
    return response
