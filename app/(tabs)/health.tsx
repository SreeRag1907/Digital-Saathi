import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Phone, CircleAlert as AlertCircle, Stethoscope, Pill, Users } from 'lucide-react-native';

export default function HealthScreen() {
  const emergencyNumbers = [
    { title: 'एम्बुलेंस', number: '108', icon: Phone, color: '#dc2626' },
    { title: 'डॉक्टर हेल्पलाइन', number: '14416', icon: Stethoscope, color: '#3b82f6' },
    { title: 'महिला हेल्पलाइन', number: '1091', icon: Users, color: '#8b5cf6' },
  ];

  const healthTips = [
    { title: 'पानी की सफाई', tip: 'पानी को उबालकर या फिल्टर करके पिएं' },
    { title: 'हाथ धोना', tip: 'खाना खाने से पहले और बाद में हाथ धोएं' },
    { title: 'मच्छर से बचाव', tip: 'मच्छरदानी का इस्तेमाल करें' },
    { title: 'टीकाकरण', tip: 'बच्चों का समय पर टीकाकरण कराएं' },
  ];

  const firstAidTips = [
    { title: 'चोट लगने पर', tip: 'पहले साफ पानी से धोएं, फिर पट्टी बांधें' },
    { title: 'बुखार में', tip: 'ज्यादा पानी पिएं, आराम करें' },
    { title: 'पेट दर्द', tip: 'हल्का खाना खाएं, पानी पिएं' },
    { title: 'सांस की तकलीफ', tip: 'तुरंत डॉक्टर से मिलें' },
  ];

  const handleEmergencyCall = (number: string, title: string) => {
    Alert.alert(
      title,
      `क्या आप ${number} पर कॉल करना चाहते हैं?`,
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'कॉल करें', onPress: () => Alert.alert('कॉल कर रहे हैं...', number) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>❤️ स्वास्थ्य सेवा</Text>
          <Text style={styles.headerSubtitle}>आपके स्वास्थ्य की देखभाल</Text>
        </View>

        {/* Emergency Numbers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertCircle size={24} color="#dc2626" />
            <Text style={styles.sectionTitle}>आपातकालीन नंबर</Text>
          </View>
          
          {emergencyNumbers.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.emergencyCard, { borderLeftColor: item.color }]}
              onPress={() => handleEmergencyCall(item.number, item.title)}
            >
              <View style={styles.emergencyInfo}>
                <item.icon size={24} color={item.color} />
                <Text style={styles.emergencyTitle}>{item.title}</Text>
              </View>
              <Text style={[styles.emergencyNumber, { color: item.color }]}>{item.number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color="#22c55e" />
            <Text style={styles.sectionTitle}>स्वास्थ्य सुझाव</Text>
          </View>
          
          {healthTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.tip}</Text>
            </View>
          ))}
        </View>

        {/* First Aid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Pill size={24} color="#3b82f6" />
            <Text style={styles.sectionTitle}>प्राथमिक चिकित्सा</Text>
          </View>
          
          {firstAidTips.map((tip, index) => (
            <View key={index} style={styles.firstAidCard}>
              <Text style={styles.firstAidTitle}>{tip.title}</Text>
              <Text style={styles.firstAidText}>{tip.tip}</Text>
            </View>
          ))}
        </View>

        {/* Health Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>स्वास्थ्य सेवाएं</Text>
          
          <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>🏥 नजदीकी अस्पताल</Text>
            <Text style={styles.serviceInfo}>सरकारी अस्पताल - 2 किमी</Text>
            <Text style={styles.serviceInfo}>प्राइवेट क्लिनिक - 1 किमी</Text>
          </View>
          
          <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>💊 दवाखाना</Text>
            <Text style={styles.serviceInfo}>जन औषधि केंद्र - 1.5 किमी</Text>
            <Text style={styles.serviceInfo}>खुले समय: सुबह 9 से शाम 8 तक</Text>
          </View>
          
          <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>🩺 डॉक्टर विजिट</Text>
            <Text style={styles.serviceInfo}>डॉ. राम शर्मा - मंगलवार, शुक्रवार</Text>
            <Text style={styles.serviceInfo}>समय: दोपहर 2 से शाम 5 तक</Text>
          </View>
        </View>

        {/* Health Checkup Reminder */}
        <View style={styles.section}>
          <View style={styles.reminderCard}>
            <Text style={styles.reminderTitle}>स्वास्थ्य जांच याददाश्त</Text>
            <Text style={styles.reminderText}>
              नियमित स्वास्थ्य जांच कराएं। महिलाओं को 6 महीने में एक बार जांच कराना चाहिए।
            </Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  emergencyCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  emergencyNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipCard: {
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
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  firstAidCard: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  firstAidTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  firstAidText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  serviceCard: {
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
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  serviceInfo: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  reminderCard: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
});