from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.predict import predict_image
from backend.model import load_model


app = FastAPI(
    title="Pneumonia Classifier API",
    description="Chest X-ray Pneumonia Detection using ResNet18",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pneumono-scan.lakshyakarn.com.np", "http://localhost:5174","https://pneumo-scan-ai-phi.vercel.app"],      # Change this after deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = load_model()


@app.get("/")
def home():
    return {
        "message": "Pneumonia Classifier API is running."
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload an image file."
        )

    result = predict_image(file.file, model)

    return result