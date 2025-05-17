
import React, { useState } from 'react';
import { Calendar, Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import StaffLayout from '@/components/layout/StaffLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { exportOrdersToSheet } from '@/services/api';

const ReportsPage = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  
  const handleExport = async () => {
    setIsExporting(true);
    setExportError(null);
    setSheetUrl(null);
    
    try {
      const result = await exportOrdersToSheet(date);
      
      if (result.success) {
        setSheetUrl(result.url || null);
        toast({
          title: "Export Successful",
          description: "Orders have been exported to Google Sheets successfully.",
        });
      } else {
        throw new Error(result.error || 'Export failed');
      }
    } catch (err) {
      console.error('Export failed:', err);
      setExportError('Failed to export orders. Please try again.');
      toast({
        title: "Export Failed",
        description: "There was an error exporting the orders to Google Sheets.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <StaffLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-gray-600 mb-8">Generate and export order reports</p>
        
        {/* Daily Order Export */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Daily Order Report</CardTitle>
            <CardDescription>
              Export a detailed report of all orders for a specific date to Google Sheets
            </CardDescription>
          </CardHeader>
          <CardContent>
            {exportError && (
              <div className="bg-red-50 p-4 rounded-md text-red-800 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{exportError}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <Label htmlFor="date">Select Date</Label>
                <div className="flex mt-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex items-end">
                <Button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export to Google Sheets"}
                </Button>
              </div>
            </div>
            
            {sheetUrl && (
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Report ready!</h3>
                    <div className="mt-1 text-sm text-blue-700 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span>Your report has been generated and is ready to view.</span>
                      <a 
                        href={sheetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-800 hover:text-blue-600 font-semibold"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Open Report
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                <strong>Note:</strong> Reports will include the following details:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Order ID</li>
                <li>Customer name and contact information</li>
                <li>Order items and quantities</li>
                <li>Total amount</li>
                <li>Payment method</li>
                <li>Order status</li>
                <li>Date and time</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {/* Additional Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>Weekly Sales Report</CardTitle>
              <CardDescription>
                View and export weekly sales trends and summaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Export detailed sales data aggregated by week.
              </p>
              <Button variant="outline" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>Menu Performance Analysis</CardTitle>
              <CardDescription>
                Analyze which menu items are most popular and profitable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                See which dishes are your bestsellers and which need attention.
              </p>
              <Button variant="outline" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </StaffLayout>
  );
};

export default ReportsPage;
