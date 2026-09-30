import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db, SessionLocal, CSE
from .api.routes import router
from .data.generator import generate_synthetic_dataset
from .analytics.pipeline import run_full_supervisory_analysis
import time
import logging

app = FastAPI(
    title="NCIIPC SAT-SA: Supervisory Analytics Tool for SOC Assessment",
    description="Supervisory analytics platform for evaluating periodic SOC submissions from Critical Sector Entities (CSEs).",
    version="1.0.0"
)

# Enable CORS for local Vite frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables on startup
@app.on_event("startup")
def on_startup():
    init_db()
    if os.getenv("VERCEL"):
        db = SessionLocal()
        try:
            if db.query(CSE).first() is None:
                logging.warning("Cold start on Vercel: DB is empty. Generating synthetic dataset...")
                start_time = time.time()
                generate_synthetic_dataset(db)
                run_full_supervisory_analysis(db)
                duration = time.time() - start_time
                logging.warning(f"Synthetic dataset generation and analysis took {duration:.2f} seconds.")
        finally:
            db.close()

# Mount API routes
app.include_router(router)

# Mount compiled static frontend for standalone single-process operation
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    from fastapi.staticfiles import StaticFiles
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="static_frontend")
else:
    @app.get("/")
    def root():
        return {
            "system": "NCIIPC SAT-SA",
            "role": "Supervisory Analytics Tool for SOC Assessment",
            "mandate": "National Critical Information Infrastructure Protection Centre",
            "status": "Operational (Offline Local Mode)",
            "docs_url": "/docs"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
