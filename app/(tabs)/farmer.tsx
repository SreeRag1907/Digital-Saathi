import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sprout, TrendingUp, Bug, Droplets, Calendar, Camera } from 'lucide-react-native';

export default function FarmerScreen() {
  const marketPrices = [
    { crop: 'धान', price: '₹2,100', change: '+50', unit: 'प्रति क्विंटल' },
    { crop: 'गेहूं', price: '₹2,350', change: '+25', unit: 'प्रति क्विंटल' },
    { crop: 'प्याज', price: '₹3,200', change: '-100', unit: 'प्रति क्विंटल' },
    { crop: 'आलू', price: '₹1,800', change: '+75', unit: 'प्रति क्विंटल' },
  ];

  const cropTips = [
    { title: 'धान की खेती', tip: 'मानसून से पहले बुआई की तैयारी करें' },
    { title: 'उर्वरक उपयोग', tip: 'मिट्टी जांच के बाद ही उर्वरक डालें' },
    { title: 'कीट नियंत्रण', tip: 'नीम तेल का प्राकृतिक छिड़काव करें' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🧑‍🌾 किसान सेवा</Text>
          <Text style={styles.headerSubtitle}>खेती की पूरी जानकारी</Text>
        </View>

        {/* Market Prices */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color="#22c55e" />
            <Text style={styles.sectionTitle}>आज के मंडी भाव</Text>
          </View>
          
          {marketPrices.map((item, index) => (
            <View key={index} style={styles.priceCard}>
              <View style={styles.priceInfo}>
                <Text style={styles.cropName}>{item.crop}</Text>
                <Text style={styles.priceUnit}>{item.unit}</Text>
              </View>
              <View style={styles.priceValue}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={[
                  styles.change,
                  { color: item.change.startsWith('+') ? '#22c55e' : '#ef4444' }
                ]}>
                  {item.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>त्वरित सेवाएं</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Camera size={32} color="#3b82f6" />
              <Text style={styles.actionTitle}>फसल रोग पहचान</Text>
              <Text style={styles.actionSubtitle}>फोटो खींचकर जांचें</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Droplets size={32} color="#06b6d4" />
              <Text style={styles.actionTitle}>सिंचाई सलाह</Text>
              <Text style={styles.actionSubtitle}>पानी की जरूरत</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Bug size={32} color="#f59e0b" />
              <Text style={styles.actionTitle}>कीट नियंत्रण</Text>
              <Text style={styles.actionSubtitle}>प्राकृतिक उपाय</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={32} color="#8b5cf6" />
              <Text style={styles.actionTitle}>बुआई कैलेंडर</Text>
              <Text style={styles.actionSubtitle}>मौसम अनुसार</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Farming Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sprout size={24} color="#22c55e" />
            <Text style={styles.sectionTitle}>खेती की सलाह</Text>
          </View>
          
          {cropTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.tip}</Text>
            </View>
          ))}
        </View>

        {/* Expert Helpline */}
        <View style={styles.section}>
          <View style={styles.helplineCard}>
            <Text style={styles.helplineTitle}>कृषि विशेषज्ञ से बात करें</Text>
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
  priceCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  priceValue: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
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
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
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
  helplineCard: {
    backgroundColor: '#22c55e',
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
    color: '#dcfce7',
  },
});