import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { geminiService } from '../services/GeminiService';

// Simple test component to verify Gemini API integration
export const TestGeminiAPI = () => {
  const testAPI = async () => {
    try {
      console.log('Testing Gemini API...');
      Alert.alert('परीक्षण शुरू', 'API का परीक्षण कर रहे हैं...');
      
      // Test scheme simplification
      const testSchemeText = `
        प्रधानमंत्री किसान सम्मान निधि योजना के तहत छोटे और सीमांत किसानों को 
        सालाना 6000 रुपये की सहायता दी जाती है। यह राशि तीन बराबर किस्तों में 
        सीधे बैंक खाते में ट्रांसफर की जाती है।
      `;
      
      const result = await geminiService.simplifyScheme(testSchemeText);
      console.log('API Test Result:', result);
      
      Alert.alert(
        'API परीक्षण सफल! 🎉', 
        `✅ अंग्रेजी सारांश: ${Object.values(result.summary_en)[0]}\n\n✅ हिंदी सारांश: ${Object.values(result.summary_hi)[0]}`
      );
      
      return result;
    } catch (error) {
      console.error('API Test Failed:', error);
      Alert.alert('API त्रुटि', `समस्या: ${(error as Error).message}`);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.testButton} onPress={testAPI}>
        <Text style={styles.testButtonText}>AI API परीक्षण</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  testButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  testButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TestGeminiAPI;
