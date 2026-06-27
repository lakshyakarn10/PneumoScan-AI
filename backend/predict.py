import torch

from model import device
from utils import preprocess_image


# Class labels
classes = ["NORMAL", "PNEUMONIA"]


def predict_image(file, model):

    # Preprocess image
    image = preprocess_image(file)

    # Move image to device
    image = image.to(device)

    # Disable gradient computation
    with torch.no_grad():

        # Forward pass
        outputs = model(image)

        # Convert logits to probabilities
        probabilities = torch.softmax(outputs, dim=1)

        # Highest probability
        confidence, predicted = torch.max(probabilities, dim=1)

    prediction = classes[predicted.item()]

    confidence = confidence.item() * 100

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "probabilities": {
            "NORMAL": round(probabilities[0][0].item() * 100, 2),
            "PNEUMONIA": round(probabilities[0][1].item() * 100, 2)
        }
    }