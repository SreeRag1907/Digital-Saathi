import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, CircleCheck as CheckCircle, Clock, Users, Chrome as Home, Banknote } from 'lucide-react-native';

export default function SchemesScreen() {
  const schemes = [
    {
      id: 1,
      title: 'प्रधानमंत्री किसान सम्मान निधि',
      description: 'किसानों को वार्षिक ₹6000 की सहायता',
      eligibility: '2 हेक्टेयर तक की भूमि वाले किसान',
      amount: '₹6,000/वर्ष',
      status: 'active',
      category: 'farmer',
      documents: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि दस्तावेज'],
    },
    {
      id: 2,
      title: 'मुख्यमंत्री स्वास्थ्य बीमा योजना',
      description: 'परिवार के लिए ₹5 लाख तक का स्वास्थ्य बीमा',
      eligibility: 'BPL परिवार',
      amount: '₹5 लाख/वर्ष',
      status: 'active',
      category: 'health',
      documents: ['आधार कार्ड', 'राशन कार्ड', 'आय प्रमाण पत्र'],
    },
    {
      id: 3,
      title: 'आयुष्मान भारत योजना',
      description: 'गरीब परिवारों के लिए स्वास्थ्य बीमा',
      eligibility: 'SECC 2011 के अनुसार पात्र परिवार',
      amount: '₹5 लाख/वर्ष',
      status: 'active',
      category: 'health',
      documents: ['आधार कार्ड', 'राशन कार्ड'],
    },
    {
      id: 4,
      title: 'मुख्यमंत्री आवास योजना',
      description: 'गरीब परिवारों के लिए पक्का मकान',
      eligibility: 'BPL परिवार, कच्चा मकान',
      amount: '₹2.5 लाख',
      status: 'new',
      category: 'housing',
      documents: ['आधार कार्ड', 'राशन कार्ड', 'आय प्रमाण पत्र'],
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'farmer': return Banknote;
      case 'health': return CheckCircle;
      case 'housing': return Home;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'new': return '#3b82f6';
      case 'deadline': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'सक्रिय';
      case 'new': return 'नई';
      case 'deadline': return 'अंतिम तिथि';
      default: return 'बंद';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📋 सरकारी योजनाएं</Text>
          <Text style={styles.headerSubtitle}>सभी योजनाओं की जानकारी</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>कुल योजनाएं</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>सक्रिय योजनाएं</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>नई योजनाएं</Text>
          </View>
        </View>

        {/* Schemes List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>उपलब्ध योजनाएं</Text>
          
          {schemes.map((scheme) => {
            const IconComponent = getCategoryIcon(scheme.category);
            return (
              <View key={scheme.id} style={styles.schemeCard}>
                <View style={styles.schemeHeader}>
                  <View style={styles.schemeIcon}>
                    <IconComponent size={24} color="#22c55e" />
                  </View>
                  <View style={styles.schemeInfo}>
                    <Text style={styles.schemeTitle}>{scheme.title}</Text>
                    <View style={styles.statusBadge}>
                      <View style={[styles.statusDot, { backgroundColor: getStatusColor(scheme.status) }]} />
                      <Text style={[styles.statusText, { color: getStatusColor(scheme.status) }]}>
                        {getStatusText(scheme.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.schemeAmount}>{scheme.amount}</Text>
                </View>
                
                <Text style={styles.schemeDescription}>{scheme.description}</Text>
                
                <View style={styles.eligibilitySection}>
                  <Text style={styles.eligibilityTitle}>पात्रता:</Text>
                  <Text style={styles.eligibilityText}>{scheme.eligibility}</Text>
                </View>
                
                <View style={styles.documentsSection}>
                  <Text style={styles.documentsTitle}>आवश्यक दस्तावेज:</Text>
                  <View style={styles.documentsList}>
                    {scheme.documents.map((doc, index) => (
                      <View key={index} style={styles.documentItem}>
                        <Text style={styles.documentText}>• {doc}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>आवेदन करें</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* How to Apply */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>आवेदन कैसे करें</Text>
          <View style={styles.howToApplyCard}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>आवश्यक दस्तावेज तैयार करें</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>नजदीकी जन सेवा केंद्र पर जाएं</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>फॉर्म भरें और दस्तावेज जमा करें</Text>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>रसीद लें और ट्रैकिंग करें</Text>
            </View>
          </View>
        </View>

        {/* Helpline */}
        <View style={styles.section}>
          <View style={styles.helplineCard}>
            <Text style={styles.helplineTitle}>योजना हेल्पलाइन</Text>
            <Text style={styles.helplineNumber}>📞 1800-180-1551</Text>
            <Text style={styles.helplineTime}>सुबह 9:00 से शाम 6:00 तक</Text>
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
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  schemeCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schemeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  schemeIcon: {
    marginRight: 12,
  },
  schemeInfo: {
    flex: 1,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  schemeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  eligibilitySection: {
    marginBottom: 12,
  },
  eligibilityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  eligibilityText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  documentsSection: {
    marginBottom: 16,
  },
  documentsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  documentsList: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  documentItem: {
    marginBottom: 4,
  },
  documentText: {
    fontSize: 13,
    color: '#4b5563',
  },
  applyButton: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  howToApplyCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
  helplineCard: {
    backgroundColor: '#3b82f6',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  helplineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  helplineNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  helplineTime: {
    fontSize: 14,
    color: '#dbeafe',
  },
});