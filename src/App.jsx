import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PredictionForm from './components/PredictionForm';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [predictionData, setPredictionData] = React.useState(null);
  const [formData, setFormData] = React.useState(null);

  const handlePredictionResult = (data, inputs) => {
    setPredictionData(data);
    setFormData(inputs);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PredictionForm onPredictionResult={handlePredictionResult} />
        
        {predictionData && formData && (
          <div className="mt-6 text-center">
            <PDFDownloadLink
              document={generatePDF(formData, predictionData)()}
              fileName="kidney-health-report.pdf"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Generating PDF...' : 'Download Report'
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 