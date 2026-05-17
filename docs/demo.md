## Web Demo

uniUnit comes with a client-side unit transformation engine and a FastAPI-based backend.

### Browser Engine (Static)

The browser-based tool allows for zero-latency unit conversion using a lightweight engine. It is located in the `demo/` directory.

#### Features

- **Quick Tool**: Fast conversion between common units.
- **Mapping**: Define and visualize unit mappings.
- **Presets**: Access built-in unit systems like SI, CGS, and more.

### FastAPI Web Application (Backend)

The project also includes a comprehensive FastAPI application located in the `app/` directory.

#### API Endpoints

- `GET /api/units/presets`: List all available unit system presets.
- `POST /api/convert`: Perform simple unit conversions.
- `POST /api/unit-system`: Convert using custom unit systems.
- `POST /api/quick-convert`: Rapidly switch between presets.
- `GET /api/unit-info`: Retrieve detailed unit dimensionality.

#### Running the App

To run the FastAPI application:

```bash
pip install -r app/requirements.txt
uvicorn app.main:app --reload
```

### Screenshots

![uniUnit Browser Engine](uniUnit.png)

*Note: The static web demo is available in the `demo/` directory, while the dynamic backend is in the `app/` directory.*
