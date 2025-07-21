import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { AIFeatures } from '@/components/AIFeatures';
import { geminiService } from '@/services/GeminiService';
import { Phone, Thermometer, Sprout, Heart, FileText, TriangleAlert as AlertTriangle, Newspaper, Video, Globe } from 'lucide-react-native';

export default function HomeScreen() {
  const [userName] = useState('किसान जी'); // In real app, get from user profile
  const [currentLanguage, setCurrentLanguage] = useState('हिंदी');
  const [currentTime] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'सुप्रभात';
    if (hour < 17) return 'नमस्कार';
    return 'शुभ सायंकाल';
  });

  // Translation object
  const translations = {
    'हिंदी': {
      greeting: currentTime,
      userName: 'किसान जी',
      appName: '🌾 GramSetu',
      subtitle: 'ग्रामीण भारत का डिजिटल सेतु',
      tagline: 'Bridging India\'s Rural Digital Divide',
      languageIndicator: 'भाषा',
      emergencyService: 'आपातकालीन सेवा',
      quickServices: 'त्वरित सेवाएं',
      todayInfo: 'आज की जानकारी',
      otherServices: 'अन्य सेवाएं',
      videoTutorials: 'वीडियो ट्यूटोरियल',
      languageChange: 'भाषा बदलें',
      moreServices: 'अधिक सेवाएं',
      weather: 'मौसम चेतावनी',
      news: 'गांव समाचार',
      scheme: 'नई योजना',
      clickHint: 'विस्तार से जानने के लिए टैप करें',
      quickActions: {
        farmer: { title: 'मंडी भाव', subtitle: 'आज की कीमतें' },
        weather: { title: 'मौसम', subtitle: 'आज का मौसम' },
        health: { title: 'स्वास्थ्य', subtitle: 'पहली सहायता' },
        schemes: { title: 'सरकारी योजना', subtitle: 'नई योजनाएं' }
      }
    },
    'English': {
      greeting: new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening',
      userName: 'Farmer Ji',
      appName: '🌾 GramSetu',
      subtitle: 'Digital Bridge for Rural India',
      tagline: 'Bridging India\'s Rural Digital Divide',
      languageIndicator: 'Language',
      emergencyService: 'Emergency Services',
      quickServices: 'Quick Services',
      todayInfo: 'Today\'s Information',
      otherServices: 'Other Services',
      videoTutorials: 'Video Tutorials',
      languageChange: 'Change Language',
      moreServices: 'More Services',
      weather: 'Weather Alert',
      news: 'Village News',
      scheme: 'New Scheme',
      clickHint: 'Tap for more details',
      quickActions: {
        farmer: { title: 'Market Prices', subtitle: 'Today\'s Rates' },
        weather: { title: 'Weather', subtitle: 'Today\'s Weather' },
        health: { title: 'Health', subtitle: 'First Aid' },
        schemes: { title: 'Gov Schemes', subtitle: 'New Schemes' }
      }
    },
    'मराठी': {
      greeting: new Date().getHours() < 12 ? 'सुप्रभात' : new Date().getHours() < 17 ? 'नमस्कार' : 'शुभ संध्या',
      userName: 'शेतकरी जी',
      appName: '🌾 GramSetu',
      subtitle: 'ग्रामीण भारताचा डिजिटल पूल',
      tagline: 'Bridging India\'s Rural Digital Divide',
      languageIndicator: 'भाषा',
      emergencyService: 'आपत्कालीन सेवा',
      quickServices: 'त्वरित सेवा',
      todayInfo: 'आजची माहिती',
      otherServices: 'इतर सेवा',
      videoTutorials: 'व्हिडिओ ट्यूटोरियल',
      languageChange: 'भाषा बदला',
      moreServices: 'अधिक सेवा',
      weather: 'हवामान चेतावणी',
      news: 'गावातील बातम्या',
      scheme: 'नवीन योजना',
      clickHint: 'अधिक माहितीसाठी टॅप करा',
      quickActions: {
        farmer: { title: 'मंडई भाव', subtitle: 'आजचे दर' },
        weather: { title: 'हवामान', subtitle: 'आजचे हवामान' },
        health: { title: 'आरोग्य', subtitle: 'प्राथमिक उपचार' },
        schemes: { title: 'सरकारी योजना', subtitle: 'नवीन योजना' }
      }
    }
  };

  const t = translations[currentLanguage as keyof typeof translations] || translations['हिंदी'];

  const handleEmergencyCall = () => {
    Alert.alert(
      'आपातकालीन सेवा',
      'कृपया आपातकालीन सेवा चुनें:',
      [
        { 
          text: 'एम्बुलेंस (108)', 
          onPress: () => {
            try {
              Linking.openURL('tel:108');
            } catch (error) {
              Alert.alert('कॉल कर रहे हैं...', '108 - एम्बुलेंस सेवा');
            }
          }
        },
        { 
          text: 'पुलिस (100)', 
          onPress: () => {
            try {
              Linking.openURL('tel:100');
            } catch (error) {
              Alert.alert('कॉल कर रहे हैं...', '100 - पुलिस सेवा');
            }
          }
        },
        { 
          text: 'महिला हेल्पलाइन (1091)', 
          onPress: () => {
            try {
              Linking.openURL('tel:1091');
            } catch (error) {
              Alert.alert('कॉल कर रहे हैं...', '1091 - महिला हेल्पलाइन');
            }
          }
        },
        { 
          text: 'किसान हेल्पलाइन (1800-180-1551)', 
          onPress: () => {
            try {
              Linking.openURL('tel:18001801551');
            } catch (error) {
              Alert.alert('कॉल कर रहे हैं...', '1800-180-1551 - किसान हेल्पलाइन');
            }
          }
        },
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

  // Additional service handlers
  const handleVideoTutorials = () => {
    Alert.alert(
      'वीडियो ट्यूटोरियल',
      'उपलब्ध ट्यूटोरियल:',
      [
        { 
          text: 'फसल की देखभाल', 
          onPress: () => {
            try {
              Linking.openURL('https://www.youtube.com/results?search_query=crop+care+hindi');
            } catch (error) {
              Alert.alert('वीडियो', 'फसल की देखभाल वीडियो खोली जा रही है...');
            }
          }
        },
        { 
          text: 'जैविक खेती', 
          onPress: () => {
            try {
              Linking.openURL('https://www.youtube.com/results?search_query=organic+farming+hindi');
            } catch (error) {
              Alert.alert('वीडियो', 'जैविक खेती वीडियो खोली जा रही है...');
            }
          }
        },
        { 
          text: 'मंडी भाव जांचना', 
          onPress: () => {
            try {
              Linking.openURL('https://www.youtube.com/results?search_query=mandi+bhav+check+hindi');
            } catch (error) {
              Alert.alert('वीडियो', 'मंडी भाव वीडियो खोली जा रही है...');
            }
          }
        },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'भाषा बदलें / Change Language',
      'कृपया अपनी भाषा चुनें / Please select your language:',
      [
        { 
          text: 'हिंदी', 
          onPress: () => {
            setCurrentLanguage('हिंदी');
            Alert.alert('भाषा परिवर्तित', 'आपकी भाषा हिंदी में सेट कर दी गई है।');
          }
        },
        { 
          text: 'English', 
          onPress: () => {
            setCurrentLanguage('English');
            Alert.alert('Language Changed', 'Your language has been set to English.');
          }
        },
        { 
          text: 'मराठी', 
          onPress: () => {
            setCurrentLanguage('मराठी');
            Alert.alert('भाषा बदललेली', 'तुमची भाषा मराठीत सेट केली गेली आहे.');
          }
        },
        { 
          text: 'गुजराती', 
          onPress: () => {
            setCurrentLanguage('गुजराती');
            Alert.alert('ભાષા બદલાઈ', 'તમારી ભાષા ગુજરાતીમાં સેટ કરવામાં આવી છે.');
          }
        },
        { text: 'रद्द करें / Cancel', style: 'cancel' },
      ]
    );
  };

  // Weather and news update handlers
  const handleWeatherUpdate = () => {
    Alert.alert(
      'मौसम अपडेट',
      '🌦️ आज का मौसम:\n\n• तापमान: 28°C\n• आर्द्रता: 75%\n• हवा: 15 km/h\n• बारिश की संभावना: 60%\n\n⚠️ चेतावनी: शाम 4 बजे के बाद तेज बारिश हो सकती है।'
    );
  };

  const handleNewsUpdate = () => {
    Alert.alert(
      'गांव समाचार',
      '📰 आज की मुख्य खबरें:\n\n• स्वास्थ्य शिविर: कल सुबह 10 बजे\n• नई योजना: PM-KISAN की किस्त जारी\n• कृषि प्रशिक्षण: इस सप्ताह शुक्रवार को\n• मंडी भाव: गेहूं ₹2100/क्विंटल'
    );
  };

  const handleSchemeUpdate = () => {
    router.push('/(tabs)/schemes');
  };

  return (
    <SafeAreaView style={styles.container}>
      <OfflineIndicator />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{t.greeting}, {t.userName}!</Text>
          <Text style={styles.appName}>{t.appName}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
          <Text style={styles.tagline}>{t.tagline}</Text>
          <Text style={styles.languageIndicator}>{t.languageIndicator}: {currentLanguage}</Text>
        </View>

        {/* Emergency Button */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
          <Phone size={24} color="#ffffff" />
          <Text style={styles.emergencyText}>{t.emergencyService}</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.quickServices}</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)/farmer')}
            >
              <Sprout size={32} color="#22c55e" />
              <Text style={styles.quickActionTitle}>{t.quickActions.farmer.title}</Text>
              <Text style={styles.quickActionSubtitle}>{t.quickActions.farmer.subtitle}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)/weather')}
            >
              <Thermometer size={32} color="#22c55e" />
              <Text style={styles.quickActionTitle}>{t.quickActions.weather.title}</Text>
              <Text style={styles.quickActionSubtitle}>{t.quickActions.weather.subtitle}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)/health')}
            >
              <Heart size={32} color="#22c55e" />
              <Text style={styles.quickActionTitle}>{t.quickActions.health.title}</Text>
              <Text style={styles.quickActionSubtitle}>{t.quickActions.health.subtitle}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)/schemes')}
            >
              <FileText size={32} color="#22c55e" />
              <Text style={styles.quickActionTitle}>{t.quickActions.schemes.title}</Text>
              <Text style={styles.quickActionSubtitle}>{t.quickActions.schemes.subtitle}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.todayInfo}</Text>
          
          <TouchableOpacity style={styles.updateCard} onPress={handleWeatherUpdate}>
            <View style={styles.updateHeader}>
              <AlertTriangle size={20} color="#f59e0b" />
              <Text style={styles.updateTitle}>{t.weather}</Text>
            </View>
            <Text style={styles.updateText}>आज शाम बारिश की संभावना है। फसल की सुरक्षा करें।</Text>
            <Text style={styles.clickHint}>{t.clickHint}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.updateCard} onPress={handleNewsUpdate}>
            <View style={styles.updateHeader}>
              <Newspaper size={20} color="#3b82f6" />
              <Text style={styles.updateTitle}>{t.news}</Text>
            </View>
            <Text style={styles.updateText}>कल स्वास्थ्य शिविर का आयोजन पंचायत भवन में होगा।</Text>
            <Text style={styles.clickHint}>{t.clickHint}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.updateCard} onPress={handleSchemeUpdate}>
            <View style={styles.updateHeader}>
              <FileText size={20} color="#8b5cf6" />
              <Text style={styles.updateTitle}>{t.scheme}</Text>
            </View>
            <Text style={styles.updateText}>किसान सम्मान निधि की नई किस्त जारी हो गई है।</Text>
            <Text style={styles.clickHint}>{t.clickHint}</Text>
          </TouchableOpacity>
        </View>

        {/* AI Features Section */}
        <AIFeatures
          onCropDiagnosis={handleCropDiagnosis}
          onSchemeSimplification={handleSchemeSimplification}
          onOCRInterpretation={handleOCRInterpretation}
        />

        {/* Additional Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.otherServices}</Text>
          <View style={styles.servicesList}>
            <TouchableOpacity style={styles.serviceItem} onPress={handleVideoTutorials}>
              <Video size={24} color="#22c55e" />
              <Text style={styles.serviceText}>{t.videoTutorials}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem} onPress={handleLanguageChange}>
              <Globe size={24} color="#22c55e" />
              <Text style={styles.serviceText}>{t.languageChange} ({currentLanguage})</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.serviceItem} 
              onPress={() => router.push('/(tabs)/more')}
            >
              <Heart size={24} color="#22c55e" />
              <Text style={styles.serviceText}>{t.moreServices}</Text>
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
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22c55e',
    textAlign: 'center',
    marginBottom: 8,
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
  languageIndicator: {
    fontSize: 12,
    color: '#22c55e',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
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
  clickHint: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
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
});