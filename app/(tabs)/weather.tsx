import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function WeatherScreen() {
  const weatherForecast = [
    { day: 'आज', icon: Sun, temp: '28°C', condition: 'धूप', rain: '0%' },
    { day: 'कल', icon: CloudRain, temp: '25°C', condition: 'बारिश', rain: '80%' },
    { day: 'परसों', icon: Cloud, temp: '26°C', condition: 'बादल', rain: '20%' },
    { day: 'रविवार', icon: Sun, temp: '30°C', condition: 'धूप', rain: '5%' },
    { day: 'सोमवार', icon: CloudRain, temp: '24°C', condition: 'बारिश', rain: '90%' },
  ];

  const farmingAdvice = [
    { title: 'आज की सलाह', advice: 'धूप में सूखी घास का भंडारण करें' },
    { title: 'कल की तैयारी', advice: 'बारिश से पहले फसल को ढक दें' },
    { title: 'सिंचाई सलाह', advice: 'आज सिंचाई न करें, कल बारिश होगी' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🌤️ मौसम जानकारी</Text>
          <Text style={styles.headerSubtitle}>आपके क्षेत्र का मौसम</Text>
        </View>

        {/* Current Weather */}
        <View style={styles.currentWeather}>
          <View style={styles.locationInfo}>
            <Text style={styles.location}>📍 आपका गांव</Text>
            <Text style={styles.lastUpdated}>अपडेट: 2 घंटे पहले</Text>
          </View>
          
          <View style={styles.currentTemp}>
            <Sun size={64} color="#f59e0b" />
            <Text style={styles.temperature}>28°C</Text>
            <Text style={styles.condition}>धूप</Text>
          </View>
          
          <View style={styles.weatherDetails}>
            <View style={styles.detailItem}>
              <Wind size={20} color="#6b7280" />
              <Text style={styles.detailLabel}>हवा</Text>
              <Text style={styles.detailValue}>12 km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Droplets size={20} color="#6b7280" />
              <Text style={styles.detailLabel}>नमी</Text>
              <Text style={styles.detailValue}>65%</Text>
            </View>
            <View style={styles.detailItem}>
              <Thermometer size={20} color="#6b7280" />
              <Text style={styles.detailLabel}>महसूस</Text>
              <Text style={styles.detailValue}>32°C</Text>
            </View>
          </View>
        </View>

        {/* Weather Alert */}
        <View style={styles.section}>
          <View style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <AlertTriangle size={24} color="#f59e0b" />
              <Text style={styles.alertTitle}>मौसम चेतावनी</Text>
            </View>
            <Text style={styles.alertText}>
              कल शाम 4 बजे से तेज बारिश की संभावना है। अपनी फसल की सुरक्षा करें।
            </Text>
          </View>
        </View>

        {/* 5-Day Forecast */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5 दिन का मौसम</Text>
          {weatherForecast.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.dayText}>{day.day}</Text>
              <View style={styles.forecastMiddle}>
                <day.icon size={24} color="#6b7280" />
                <Text style={styles.conditionText}>{day.condition}</Text>
              </View>
              <View style={styles.forecastRight}>
                <Text style={styles.tempText}>{day.temp}</Text>
                <Text style={styles.rainText}>{day.rain}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Farming Advice */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>खेती की सलाह</Text>
          {farmingAdvice.map((item, index) => (
            <View key={index} style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>{item.title}</Text>
              <Text style={styles.adviceText}>{item.advice}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>त्वरित सेवाएं</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Cloud size={32} color="#3b82f6" />
              <Text style={styles.actionTitle}>मौसम रडार</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Droplets size={32} color="#06b6d4" />
              <Text style={styles.actionTitle}>बारिश अलर्ट</Text>
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
  currentWeather: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  currentTemp: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
  },
  condition: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 4,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 2,
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
  alertCard: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400e',
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  forecastCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    width: 60,
  },
  forecastMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  conditionText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  forecastRight: {
    alignItems: 'flex-end',
  },
  tempText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  rainText: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 2,
  },
  adviceCard: {
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
  adviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#ffffff',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
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
});