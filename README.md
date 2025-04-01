# Kidney Health Prediction App

A React application for predicting kidney health risks based on clinical measurements.

## Features

- Input form for HbA1c, urine albumin, urine creatinine, and serum creatinine
- Real-time risk prediction using machine learning API
- Animated risk level visualization
- PDF report generation
- Responsive design for mobile and desktop

## Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager
- Access to the kidney health prediction API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kidney-health-app.git
   cd kidney-health-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update the `REACT_APP_API_URL` with your API endpoint.

## Development

Start the development server:
```bash
npm start
```

The app will be available at http://localhost:3000

## Building for Production

Create a production build:
```bash
npm run build
```

## Usage

1. Enter the patient's measurements:
   - HbA1c percentage
   - Urine albumin level
   - Urine creatinine level
   - Serum creatinine level

2. Click "Calculate Risk" to get the prediction

3. View the risk assessment and animated risk bar

4. Download a PDF report of the results

## API Integration

The app expects the following API endpoint:

- POST `/predict-kidney-health`
  - Request body: `{ hba1c, urineAlbumin, urineCreatinine, serumCreatinine }`
  - Response: `{ riskScore: number }` (0-100)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
