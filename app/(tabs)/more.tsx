import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, Globe, Newspaper, Camera, Bell, Settings, CircleHelp as HelpCircle, Share2, Languages, Phone } from 'lucide-react-native';

export default function MoreScreen() {
  const handleLanguageChange = () => {
    Alert.alert(
      'भाषा बदलें',
      'कृपया अपनी भाषा चुनें:',
      [
        { text: 'हिंदी', onPress: () => Alert.alert('भाषा', 'हिंदी चुनी गई') },
        { text: 'English', onPress: () => Alert.alert('Language', 'English selected') },
        { text: 'मराठी', onPress: () => Alert.alert('भाषा', 'मराठी चुनी गई') },
        { text: 'रद्द करें', style: 'cancel' },
      ]
    );
  };

  const videoTutorials = [
    { title: 'UPI से पैसे भेजना', duration: '3:45', views: '25K' },
    { title: 'ATM का उपयोग', duration: '5:20', views: '18K' },
    { title: 'मोबाइल रिचार्ज', duration: '2:30', views: '12K' },
    { title: 'QR कोड स्कैन करना', duration: '4:15', views: '8K' },
  ];

  const villageNews = [
    { title: 'पंचायत बैठक कल', time: '2 घंटे पहले', type: 'meeting' },
    { title: 'स्वास्थ्य शिविर आयोजन', time: '5 घंटे पहले', type: 'health' },
    { title: 'खो गया: काला कुत्ता', time: '1 दिन पहले', type: 'lost' },
    { title: 'मेला आयोजन अगले सप्ताह', time: '2 दिन पहले', type: 'event' },
  ];

  const menuItems = [
    { icon: Video, title: 'वीडियो ट्यूटोरियल', subtitle: 'डिजिटल साक्षरता', onPress: () => {} },
    { icon: Newspaper, title: 'गांव समाचार', subtitle: 'स्थानीय अपडेट', onPress: () => {} },
    { icon: Camera, title: 'QR स्कैनर', subtitle: 'जानकारी पाएं', onPress: () => {} },
    { icon: Bell, title: 'नोटिफिकेशन', subtitle: 'अलर्ट सेटिंग', onPress: () => {} },
    { icon: Languages, title: 'भाषा बदलें', subtitle: 'Language Settings', onPress: handleLanguageChange },
    { icon: Share2, title: 'ऐप साझा करें', subtitle: 'दोस्तों के साथ', onPress: () => {} },
    { icon: HelpCircle, title: 'सहायता', subtitle: 'Help & Support', onPress: () => {} },
    { icon: Settings, title: 'सेटिंग्स', subtitle: 'App Settings', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⚙️ अधिक सेवाएं</Text>
          <Text style={styles.headerSubtitle}>सभी सुविधाएं एक जगह</Text>
        </View>

        {/* Video Tutorials */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Video size={24} color="#3b82f6" />
            <Text style={styles.sectionTitle}>वीडियो ट्यूटोरियल</Text>
          </View>
          
          {videoTutorials.map((video, index) => (
            <TouchableOpacity key={index} style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Video size={24} color="#ffffff" />
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <View style={styles.videoMeta}>
                  <Text style={styles.videoDuration}>{video.duration}</Text>
                  <Text style={styles.videoViews}>{video.views} views</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Village News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Newspaper size={24} color="#22c55e" />
            <Text style={styles.sectionTitle}>गांव समाचार</Text>
          </View>
          
          {villageNews.map((news, index) => (
            <TouchableOpacity key={index} style={styles.newsCard}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{news.title}</Text>
                <Text style={styles.newsTime}>{news.time}</Text>
              </View>
              <View style={[styles.newsType, { backgroundColor: getNewsTypeColor(news.type) }]}>
                <Text style={styles.newsTypeText}>{getNewsTypeText(news.type)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>अन्य सेवाएं</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                <item.icon size={24} color="#22c55e" />
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <View style={styles.supportCard}>
            <Text style={styles.supportTitle}>सहायता चाहिए?</Text>
            <Text style={styles.supportText}>
              यदि आपको कोई समस्या है या सहायता चाहिए, तो हमसे संपर्क करें
            </Text>
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={20} color="#ffffff" />
              <Text style={styles.contactButtonText}>संपर्क करें</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Text style={styles.appVersion}>ग्रामसेतु v1.0.0</Text>
            <Text style={styles.appDescription}>
              ग्रामीण जीवन के लिए बनाया गया। सरकार द्वारा समर्थित।
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getNewsTypeColor = (type: string) => {
  switch (type) {
    case 'meeting': return '#3b82f6';
    case 'health': return '#22c55e';
    case 'lost': return '#f59e0b';
    case 'event': return '#8b5cf6';
    default: return '#6b7280';
  }
};

const getNewsTypeText = (type: string) => {
  switch (type) {
    case 'meeting': return 'बैठक';
    case 'health': return 'स्वास्थ्य';
    case 'lost': return 'खो गया';
    case 'event': return 'कार्यक्रम';
    default: return 'समाचार';
  }
};

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
  videoCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    width: 60,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoDuration: {
    fontSize: 12,
    color: '#6b7280',
  },
  videoViews: {
    fontSize: 12,
    color: '#6b7280',
  },
  newsCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  newsTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  newsType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newsTypeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
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
  menuItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  supportCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  appVersion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});