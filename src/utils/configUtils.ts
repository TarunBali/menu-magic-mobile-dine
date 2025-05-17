
/**
 * Configuration utilities to handle API keys and environment settings
 */

// Default configuration for demo mode
const defaultConfig = {
  isDemo: true,
  apiKeys: {
    payments: 'demo_key',
    analytics: 'demo_key',
    notifications: 'demo_key'
  },
  apiEndpoints: {
    orders: '/api/orders',
    auth: '/api/auth',
    payments: '/api/payments'
  },
  features: {
    liveOrderTracking: false,
    realTimeChat: false,
    advancedAnalytics: false
  }
};

// Storage key for configuration
const CONFIG_STORAGE_KEY = 'restaurant_app_config';

/**
 * Gets the current configuration, either from local storage or default
 */
export const getConfig = () => {
  try {
    const storedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
    
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
    
    return defaultConfig;
  } catch (error) {
    console.error('Error reading configuration:', error);
    return defaultConfig;
  }
};

/**
 * Updates the configuration with new values
 * @param newConfig - New configuration object or partial configuration
 */
export const updateConfig = (newConfig: Partial<typeof defaultConfig>) => {
  try {
    const currentConfig = getConfig();
    const updatedConfig = { 
      ...currentConfig, 
      ...newConfig,
      // Ensure nested objects are properly merged
      apiKeys: { ...currentConfig.apiKeys, ...newConfig.apiKeys },
      apiEndpoints: { ...currentConfig.apiEndpoints, ...newConfig.apiEndpoints },
      features: { ...currentConfig.features, ...newConfig.features }
    };
    
    // Save to local storage
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updatedConfig));
    
    return updatedConfig;
  } catch (error) {
    console.error('Error updating configuration:', error);
    return getConfig();
  }
};

/**
 * Load configuration from a file
 * @param fileContent - The content of the configuration file
 */
export const loadConfigFromFile = (fileContent: string) => {
  try {
    const configData = JSON.parse(fileContent);
    
    // Update config with new data
    const newConfig = {
      isDemo: false,
      ...configData
    };
    
    updateConfig(newConfig);
    
    return {
      success: true,
      message: 'Configuration loaded successfully!'
    };
  } catch (error) {
    console.error('Error parsing configuration file:', error);
    return {
      success: false,
      message: 'Failed to parse configuration file. Please check the format.'
    };
  }
};

/**
 * Resets the configuration to demo mode
 */
export const resetToDemo = () => {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  return defaultConfig;
};
