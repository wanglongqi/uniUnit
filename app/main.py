from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os

app = FastAPI(
    title="uniUnit Web",
    description="Unit Conversion Web Application",
    version="1.0.0"
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

from app.routes import router
app.include_router(router)

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("app/templates/index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "uniUnit API is running"}
