import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { AIFeatures } from '@/components/AIFeatures';
import { geminiService } from '@/services/GeminiService';
import { Phone, Thermometer, Sprout, Heart, FileText, TriangleAlert as AlertTriangle, Newspaper, Video, Globe } from 'lucide-react-native';

export default function HomeScreen() {
  const handleEmergencyCall = () => {
    Alert.alert(
      'आपातकालीन सेवा',
      'कृपया आपातकालीन सेवा चुनें:',
      [
        { text: 'एम्बुलेंस (108)', onPress: () => Alert.alert('कॉल कर रहे हैं...', '108') },
        { text: 'पुलिस (100)', onPress: () => Alert.alert('कॉल कर रहे हैं...', '100') },
        { text: 'महिला हेल्पलाइन (1091)', onPress: () => Alert.alert('कॉल कर रहे हैं...', '1091') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  // AI Feature handlers
  const handleCropDiagnosis = async (imageUri: string, location: string, cropType: string) => {
    // In real implementation, convert image to base64
    const mockBase64 = 'mock_base64_image_data';
    return await geminiService.diagnoseCrop({
      imageBase64: mockBase64,
      location,
      cropType
    });
  };

  const handleSchemeSimplification = async (schemeText: string) => {
    return await geminiService.simplifyScheme(schemeText);
  };

  const handleOCRInterpretation = async (extractedText: string) => {
    return await geminiService.interpretOCRText(extractedText);
  };

  // Test API function
  const testGeminiAPI = () => {
    console.log('Button pressed!');
    Alert.alert('बटन दबाया गया!', 'परीक्षण फ़ंक्शन काम कर रहा है');
    
    // Simple async test
    setTimeout(async () => {
      try {
        console.log('Starting API test...');
        Alert.alert('परीक्षण शुरू', 'API का परीक्षण कर रहे हैं...');
        
        // Check if API key is loaded
        console.log('API Key exists:', !!process.env.EXPO_PUBLIC_GEMINI_API_KEY);
        
        const testSchemeText = `
          प्रधानमंत्री किसान सम्मान निधि योजना के तहत छोटे और सीमांत किसानों को 
          सालाना 6000 रुपये की सहायता दी जाती है।
        `;
        
        console.log('Calling geminiService.simplifyScheme...');
        const result = await geminiService.simplifyScheme(testSchemeText);
        console.log('API Test Result:', result);
        
        Alert.alert(
          'API परीक्षण सफल! 🎉', 
          `✅ अंग्रेजी सारांश: ${Object.values(result.summary_en)[0]}\n\n✅ हिंदी सारांश: ${Object.values(result.summary_hi)[0]}`
        );
      } catch (error) {
        console.error('API Test Failed:', error);
        Alert.alert('API त्रुटि', `समस्या: ${(error as Error).message}`);
      }
    }, 1000);
  };

  const quickActions = [
    { id: 1, title: 'मंडी भाव', subtitle: 'आज की कीमतें', icon: Sprout, route: 'farmer' },
    { id: 2, title: 'मौसम', subtitle: 'आज का मौसम', icon: Thermometer, route: 'weather' },
    { id: 3, title: 'स्वास्थ्य', subtitle: 'पहली सहायता', icon: Heart, route: 'health' },
    { id: 4, title: 'सरकारी योजना', subtitle: 'नई योजनाएं', icon: FileText, route: 'schemes' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <OfflineIndicator />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>🌾 GramSetu</Text>
          <Text style={styles.subtitle}>ग्रामीण भारत का डिजिटल सेतु</Text>
          <Text style={styles.tagline}>Bridging India's Rural Digital Divide</Text>
        </View>

        {/* Emergency Button */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
          <Phone size={24} color="#ffffff" />
          <Text style={styles.emergencyText}>आपातकालीन सेवा</Text>
        </TouchableOpacity>

        {/* Test API Button */}
        <TouchableOpacity style={styles.testButton} onPress={testGeminiAPI}>
          <Globe size={20} color="#ffffff" />
          <Text style={styles.testButtonText}>AI API परीक्षण</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>त्वरित सेवाएं</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => router.push(action.route as any)}
              >
                <action.icon size={32} color="#22c55e" />
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>आज की जानकारी</Text>
          
          <View style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <AlertTriangle size={20} color="#f59e0b" />
              <Text style={styles.updateTitle}>मौसम चेतावनी</Text>
            </View>
            <Text style={styles.updateText}>आज शाम बारिश की संभावना है। फसल की सुरक्षा करें।</Text>
          </View>

          <View style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <Newspaper size={20} color="#3b82f6" />
              <Text style={styles.updateTitle}>गांव समाचार</Text>
            </View>
            <Text style={styles.updateText}>कल स्वास्थ्य शिविर का आयोजन पंचायत भवन में होगा।</Text>
          </View>

          <View style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <FileText size={20} color="#8b5cf6" />
              <Text style={styles.updateTitle}>नई योजना</Text>
            </View>
            <Text style={styles.updateText}>किसान सम्मान निधि की नई किस्त जारी हो गई है।</Text>
          </View>
        </View>

        {/* AI Features Section */}
        <AIFeatures
          onCropDiagnosis={handleCropDiagnosis}
          onSchemeSimplification={handleSchemeSimplification}
          onOCRInterpretation={handleOCRInterpretation}
        />

        {/* Additional Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>अन्य सेवाएं</Text>
          <View style={styles.servicesList}>
            <TouchableOpacity style={styles.serviceItem}>
              <Video size={24} color="#22c55e" />
              <Text style={styles.serviceText}>वीडियो ट्यूटोरियल</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <Globe size={24} color="#22c55e" />
              <Text style={styles.serviceText}>भाषा बदलें</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  tagline: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 2,
    fontStyle: 'italic',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  updateCard: {
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
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  updateText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  servicesList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  serviceText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
  },
  testButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
});