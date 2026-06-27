import torch
import torch.nn as nn

from torchvision.models import (
    resnet18,
    ResNet18_Weights
)

# Select device
device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


def load_model():

    # Load ResNet18 architecture
    model = resnet18(weights=ResNet18_Weights.DEFAULT)

    # Replace final fully connected layer
    model.fc = nn.Linear(
        model.fc.in_features,
        2
    )

    # Load trained weights
    model.load_state_dict(
        torch.load(
            "best_resnet18.pth",
            map_location=device,
            weights_only=True
        )
    )

    # Move model to device
    model.to(device)

    # Set model to evaluation mode
    model.eval()

    return model