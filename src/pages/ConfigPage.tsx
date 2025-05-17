
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { loadConfigFromFile, resetToDemo, getConfig } from '@/utils/configUtils';
import { Shield, Upload, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ConfigPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const config = getConfig();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setMessage(null);
    
    const file = e.target.files?.[0];
    if (!file) {
      setMessage({ type: 'error', text: 'No file selected' });
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const result = loadConfigFromFile(content);
        
        if (result.success) {
          setMessage({ type: 'success', text: result.message });
          toast({
            title: "Configuration Updated",
            description: "Your application is now running in production mode."
          });
          // Reset the file input
          e.target.value = '';
          // Refresh config
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          setMessage({ type: 'error', text: result.message });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to read configuration file' });
      } finally {
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Error reading file' });
      setLoading(false);
    };
    
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetToDemo();
    toast({
      title: "Reset to Demo Mode",
      description: "Your application is now running in demo mode."
    });
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const downloadSampleConfig = () => {
    const sampleConfig = {
      apiKeys: {
        payments: "YOUR_PAYMENT_API_KEY",
        analytics: "YOUR_ANALYTICS_API_KEY",
        notifications: "YOUR_NOTIFICATIONS_API_KEY"
      },
      apiEndpoints: {
        orders: "https://your-api.com/orders",
        auth: "https://your-api.com/auth",
        payments: "https://your-api.com/payments"
      },
      features: {
        liveOrderTracking: true,
        realTimeChat: true,
        advancedAnalytics: true
      }
    };
    
    const blob = new Blob([JSON.stringify(sampleConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'restaurant-app-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="h-6 w-6" /> 
              Application Configuration
            </CardTitle>
            <CardDescription>
              Manage your application mode and API configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert className={`mb-6 ${message.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
                <AlertTitle>
                  {message.type === 'error' ? 'Error' : 'Success'}
                </AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Switch id="demo-mode" checked={config.isDemo} disabled />
                <Label htmlFor="demo-mode">
                  <span className="font-medium">
                    {config.isDemo ? 'Demo Mode' : 'Production Mode'}
                  </span>
                </Label>
              </div>
              <p className="text-sm text-gray-600">
                {config.isDemo 
                  ? 'Currently running in demo mode with mock data. All features requiring API keys are simulated.' 
                  : 'Currently running in production mode with real API connections.'}
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Upload Configuration</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload a JSON configuration file with your API keys to switch to production mode.
                  Make sure to keep this file secure and never commit it to a public repository.
                </p>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    disabled={loading}
                    className="max-w-sm"
                  />
                  <Button variant="outline" onClick={downloadSampleConfig}>
                    <Download className="h-4 w-4 mr-2" />
                    Sample Config
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-2">Reset to Demo Mode</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Reset to demo mode, removing any stored API keys and configuration.
                </p>
                <Button variant="destructive" onClick={handleReset}>
                  Reset to Demo Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <Button variant="link" onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
