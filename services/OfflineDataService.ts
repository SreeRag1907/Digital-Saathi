import NetInfo from '@react-native-community/netinfo';

export interface OfflineStatus {
  isOnline: boolean;
  pendingSync: number;
}

export interface SyncableData {
  id: string;
  type: 'farmer' | 'health' | 'weather' | 'scheme';
  data: any;
  timestamp: number;
  synced: boolean;
}

class OfflineDataService {
  private pendingData: SyncableData[] = [];
  private isOnline: boolean = true;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initializeNetworkListener();
  }

  private initializeNetworkListener() {
    // Use NetInfo for React Native
    NetInfo.fetch().then(state => {
      this.isOnline = state.isConnected ?? true;
      this.notifyListeners();
    });

    // Listen for network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasOnline = this.isOnline;
      this.isOnline = state.isConnected ?? true;
      
      if (!wasOnline && this.isOnline) {
        this.syncPendingData();
      }
      
      this.notifyListeners();
    });

    // Store unsubscribe function for cleanup if needed
    (this as any).unsubscribeNetInfo = unsubscribe;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  public getOfflineStatus(): OfflineStatus {
    return {
      isOnline: this.isOnline,
      pendingSync: this.pendingData.filter(item => !item.synced).length
    };
  }

  public async saveData(type: SyncableData['type'], data: any): Promise<void> {
    const item: SyncableData = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
      synced: false
    };

    this.pendingData.push(item);

    if (this.isOnline) {
      await this.syncItem(item);
    }

    this.notifyListeners();
  }

  private async syncItem(item: SyncableData): Promise<boolean> {
    try {
      // Simulate API call based on type
      switch (item.type) {
        case 'farmer':
          await this.syncFarmerData(item.data);
          break;
        case 'health':
          await this.syncHealthData(item.data);
          break;
        case 'weather':
          await this.syncWeatherData(item.data);
          break;
        case 'scheme':
          await this.syncSchemeData(item.data);
          break;
      }

      item.synced = true;
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error(`Failed to sync ${item.type} data:`, error);
      return false;
    }
  }

  private async syncFarmerData(data: any): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Synced farmer data:', data);
  }

  private async syncHealthData(data: any): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Synced health data:', data);
  }

  private async syncWeatherData(data: any): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Synced weather data:', data);
  }

  private async syncSchemeData(data: any): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Synced scheme data:', data);
  }

  public async syncPendingData(): Promise<void> {
    if (!this.isOnline) {
      return;
    }

    const unsyncedItems = this.pendingData.filter(item => !item.synced);
    
    for (const item of unsyncedItems) {
      await this.syncItem(item);
    }
  }

  public addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getPendingDataByType(type: SyncableData['type']): SyncableData[] {
    return this.pendingData.filter(item => item.type === type && !item.synced);
  }

  public clearSyncedData(): void {
    this.pendingData = this.pendingData.filter(item => !item.synced);
    this.notifyListeners();
  }

  // Simulate going offline for testing
  public simulateOffline(): void {
    this.isOnline = false;
    this.notifyListeners();
  }

  // Simulate going online for testing
  public simulateOnline(): void {
    this.isOnline = true;
    this.syncPendingData();
    this.notifyListeners();
  }
}

export const offlineDataService = new OfflineDataService();
