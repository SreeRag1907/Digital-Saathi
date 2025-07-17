import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Camera, Sparkles, FileText, Scan } from 'lucide-react-native';

interface CropDiagnosisResult {
  disease_name: string;
  confidence_score: number;
  organic_treatments: string[];
  chemical_treatments: string[];
  prevention_tips: string[];
}

interface AIFeaturesProps {
  onCropDiagnosis: (imageUri: string, location: string, cropType: string) => Promise<CropDiagnosisResult>;
  onSchemeSimplification: (schemeText: string) => Promise<{ summary_en: string; summary_hi: string }>;
  onOCRInterpretation: (extractedText: string) => Promise<string>;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({
  onCropDiagnosis,
  onSchemeSimplification,
  onOCRInterpretation
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const handleCropDiagnosis = async () => {
    setIsProcessing(true);
    try {
      // In a real implementation, this would open camera
      const mockImageUri = 'mock_image_uri';
      const result = await onCropDiagnosis(mockImageUri, 'Maharashtra, Pune', 'धान');
      setLastResult(result);
      Alert.alert('निदान पूरा', `रोग: ${result.disease_name}\nविश्वसनीयता: ${result.confidence_score}%`);
    } catch (error) {
      Alert.alert('त्रुटि', 'कृपया दोबारा कोशिश करें');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 AI सुविधाएं</Text>
      
      <TouchableOpacity 
        style={styles.featureCard} 
        onPress={handleCropDiagnosis}
        disabled={isProcessing}
      >
        <View style={styles.featureHeader}>
          <Camera size={24} color="#22c55e" />
          <Text style={styles.featureTitle}>फसल रोग निदान</Text>
        </View>
        <Text style={styles.featureDescription}>
          फसल की फोटो खींचकर रोग की पहचान करें
        </Text>
        {isProcessing && <ActivityIndicator size="small" color="#22c55e" />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureCard}>
        <View style={styles.featureHeader}>
          <FileText size={24} color="#3b82f6" />
          <Text style={styles.featureTitle}>योजना सरलीकरण</Text>
        </View>
        <Text style={styles.featureDescription}>
          सरकारी योजनाओं को सरल भाषा में समझें
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureCard}>
        <View style={styles.featureHeader}>
          <Scan size={24} color="#8b5cf6" />
          <Text style={styles.featureTitle}>उत्पाद स्कैनर</Text>
        </View>
        <Text style={styles.featureDescription}>
          बीज/खाद के पैकेट की जानकारी पाएं
        </Text>
      </TouchableOpacity>

      {lastResult && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>अंतिम परिणाम:</Text>
          <Text style={styles.resultText}>{JSON.stringify(lastResult, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  resultCard: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 12,
    color: '#166534',
    fontFamily: 'monospace',
  },
});