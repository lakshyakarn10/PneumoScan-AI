from PIL import Image


from torchvision import transforms


# Image preprocessing pipeline
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


def preprocess_image(file):

    """
    Reads an uploaded image and converts it into
    a tensor suitable for the model.
    """

    image = Image.open(file).convert("RGB")

    image = transform(image)

    # Add batch dimension
    image = image.unsqueeze(0)

    return image