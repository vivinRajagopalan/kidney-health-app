import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  riskSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666666',
  },
});

export const generatePDF = (formData, prediction) => {
  const getRiskLevel = (score) => {
    if (score <= 33) return 'Low';
    if (score <= 66) return 'Medium';
    return 'High';
  };

  const PdfDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Kidney Health Assessment Report</Text>
          
          <Text style={styles.subtitle}>Input Measurements</Text>
          <View style={styles.row}>
            <Text style={styles.label}>HbA1c:</Text>
            <Text style={styles.value}>{formData.hba1c}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Urine Albumin:</Text>
            <Text style={styles.value}>{formData.urineAlbumin} mg/L</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Urine Creatinine:</Text>
            <Text style={styles.value}>{formData.urineCreatinine} mg/dL</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Serum Creatinine:</Text>
            <Text style={styles.value}>{formData.serumCreatinine} mg/dL</Text>
          </View>

          <View style={styles.riskSection}>
            <Text style={styles.subtitle}>Risk Assessment</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Risk Score:</Text>
              <Text style={styles.value}>{prediction.riskScore}%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Risk Level:</Text>
              <Text style={styles.value}>{getRiskLevel(prediction.riskScore)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} | This report is for informational purposes only and should be reviewed by a healthcare professional.
        </Text>
      </Page>
    </Document>
  );

  return PdfDocument;
}; 