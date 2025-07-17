import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wifi, WifiOff, Clock } from 'lucide-react-native';
import { offlineDataService } from '@/services/OfflineDataService';

export const OfflineIndicator: React.FC = () => {
  const [status, setStatus] = useState({ isOnline: true, pendingSync: 0 });

  useEffect(() => {
    const updateStatus = () => {
      const currentStatus = offlineDataService.getOfflineStatus();
      setStatus(currentStatus);
    };

    // Update status immediately
    updateStatus();

    // Set up interval to check status
    const interval = setInterval(updateStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  if (status.isOnline && status.pendingSync === 0) {
    return null; // Don't show indicator when everything is normal
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: status.isOnline ? '#fef3c7' : '#fee2e2' }
    ]}>
      <View style={styles.content}>
        {status.isOnline ? (
          <Wifi size={16} color="#92400e" />
        ) : (
          <WifiOff size={16} color="#dc2626" />
        )}
        
        <Text style={[
          styles.text,
          { color: status.isOnline ? '#92400e' : '#dc2626' }
        ]}>
          {status.isOnline ? 'ऑनलाइन' : 'ऑफलाइन'}
        </Text>

        {status.pendingSync > 0 && (
          <>
            <Clock size={16} color="#92400e" style={styles.clockIcon} />
            <Text style={styles.pendingText}>
              {status.pendingSync} अपडेट बाकी
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  clockIcon: {
    marginLeft: 8,
  },
  pendingText: {
    fontSize: 12,
    color: '#92400e',
    marginLeft: 4,
  },
});