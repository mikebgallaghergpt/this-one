// AdminDashboard.tsx - Version 3.2.0 (unchanged in v4.2.0)
// Complete admin dashboard for managing student enrollments and data

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Users, Mail, Palette, BarChart3, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Student {
  id: string;
  name: string;
  email: string;
  experience: string;
  createdAt: string;
}

interface Subscriber {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  subscribedAt: string;
}

export function AdminDashboard() {
  const [students, setStudents] = useState<Record<string, Student[]>>({});
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState(false);

  const interests = ['Drawing', 'Painting', 'Digital Art', 'Sculpture', 'Photography', 'Printmaking', 'Mixed Media', 'Ceramics'];

  useEffect(() => {
    // Only check backend availability on mount, don't load data
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      // Check if we're in WordPress environment with dynamic credentials
      const wpProjectId = (window as any).gallagher_config?.supabase_project_id;
      const wpAnonKey = (window as any).gallagher_config?.supabase_anon_key;
      
      // Use WordPress credentials if available, otherwise fallback to hardcoded
      const activeProjectId = wpProjectId || projectId;
      const activeAnonKey = wpAnonKey || publicAnonKey;

      if (!activeProjectId || !activeAnonKey) {
        setConnectionError(true);
        setInitializing(false);
        return;
      }

      const response = await fetch(
        `https://${activeProjectId}.supabase.co/functions/v1/make-server-9c2430a9/health`,
        {
          headers: {
            'Authorization': `Bearer ${activeAnonKey}`,
          },
        }
      );

      if (response.ok) {
        setConnectionError(false);
      } else {
        setConnectionError(true);
      }
    } catch (err) {
      console.log('Backend health check failed:', err);
      setConnectionError(true);
    } finally {
      setInitializing(false);
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // First check if backend is available
      await checkBackendHealth();
      
      if (connectionError) {
        // Load demo data from localStorage
        console.log('Loading demo data from localStorage');
        
        const demoUsers = JSON.parse(localStorage.getItem('gallagher_demo_users') || '[]');
        const demoSubscribers = JSON.parse(localStorage.getItem('gallagher_demo_subscribers') || '[]');
        
        // Organize students by interest
        const studentsData: Record<string, Student[]> = {};
        
        // Initialize all interests with empty arrays
        interests.forEach(interest => {
          studentsData[interest] = [];
        });
        
        // Populate with demo users
        demoUsers.forEach((user: any) => {
          if (user.interests && Array.isArray(user.interests)) {
            user.interests.forEach((interest: string) => {
              if (studentsData[interest]) {
                studentsData[interest].push({
                  id: user.id,
                  name: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                  experience: user.experience,
                  createdAt: user.createdAt
                });
              }
            });
          }
        });
        
        setStudents(studentsData);
        setSubscribers(demoSubscribers);
        
        if (demoUsers.length === 0 && demoSubscribers.length === 0) {
          setError('No demo data found. Create some test accounts using the signup form to see data here.');
        }
        
        setLoading(false);
        return;
      }

      // Get dynamic credentials
      const wpProjectId = (window as any).gallagher_config?.supabase_project_id;
      const wpAnonKey = (window as any).gallagher_config?.supabase_anon_key;
      const activeProjectId = wpProjectId || projectId;
      const activeAnonKey = wpAnonKey || publicAnonKey;

      // Load students by interest with timeout
      const studentsData: Record<string, Student[]> = {};
      
      for (const interest of interests) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

          const response = await fetch(
            `https://${activeProjectId}.supabase.co/functions/v1/make-server-9c2430a9/students/by-interest/${encodeURIComponent(interest)}`,
            {
              headers: {
                'Authorization': `Bearer ${activeAnonKey}`,
              },
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            studentsData[interest] = data.students || [];
          } else {
            console.warn(`Failed to load students for ${interest}:`, response.status);
            studentsData[interest] = [];
          }
        } catch (err) {
          console.warn(`Error loading students for ${interest}:`, err);
          studentsData[interest] = [];
        }
      }

      setStudents(studentsData);

      // Load newsletter subscribers with timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const subscribersResponse = await fetch(
          `https://${activeProjectId}.supabase.co/functions/v1/make-server-9c2430a9/newsletter/subscribers`,
          {
            headers: {
              'Authorization': `Bearer ${activeAnonKey}`,
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (subscribersResponse.ok) {
          const subscribersData = await subscribersResponse.json();
          setSubscribers(subscribersData.subscribers || []);
        }
      } catch (err) {
        console.warn('Error loading newsletter subscribers:', err);
      }

    } catch (err: any) {
      console.error('Dashboard error:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getTotalStudents = () => {
    return Object.values(students).reduce((total, studentList) => total + studentList.length, 0);
  };

  const getUniqueStudents = () => {
    const uniqueIds = new Set();
    Object.values(students).forEach(studentList => {
      studentList.forEach(student => uniqueIds.add(student.id));
    });
    return uniqueIds.size;
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (initializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p>Initializing dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gallagher Art School</h1>
            <p className="text-muted-foreground">Student Management Dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={checkBackendHealth} variant="outline" disabled={loading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Check Connection
            </Button>
            <Button onClick={loadDashboardData} disabled={loading || connectionError}>
              <BarChart3 className="w-4 h-4 mr-2" />
              {loading ? 'Loading...' : 'Load Data'}
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        {connectionError && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Running in Demo Mode</strong> - Backend server not accessible. 
              <br />
              Demo data is stored locally. To enable full functionality, deploy your Supabase edge function.
              <br />
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={checkBackendHealth}
                >
                  Check Connection
                </Button>
                <span className="text-muted-foreground">•</span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto" 
                  onClick={() => {
                    // Clear demo data
                    localStorage.removeItem('gallagher_demo_users');
                    localStorage.removeItem('gallagher_demo_subscribers');
                    // Reload data
                    loadDashboardData();
                  }}
                >
                  Clear Demo Data
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Getting Started Message */}
        {!loading && getTotalStudents() === 0 && !error && !connectionError && (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Dashboard</CardTitle>
              <CardDescription>
                Once students start signing up, their data will appear here. Click "Load Data" to refresh the information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Features available:</strong>
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• View students organized by art interest</li>
                  <li>• Track newsletter subscribers</li>
                  <li>• Export data to CSV files</li>
                  <li>• Monitor enrollment statistics</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalStudents()}</div>
              <p className="text-xs text-muted-foreground">
                Across all art programs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUniqueStudents()}</div>
              <p className="text-xs text-muted-foreground">
                Individual student accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
              <p className="text-xs text-muted-foreground">
                Active email subscribers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="interests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="interests">Students by Interest</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="interests" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Students by Art Interest</h2>
              <Button 
                variant="outline" 
                onClick={() => {
                  const allStudents = Object.values(students).flat();
                  exportToCSV(allStudents, 'students-by-interest.csv');
                }}
                disabled={getTotalStudents() === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {interests.map((interest) => (
                <Card key={interest}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {interest}
                      <Badge variant="secondary">
                        {students[interest]?.length || 0}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {students[interest]?.length > 0 ? (
                        students[interest].slice(0, 3).map((student) => (
                          <div key={student.id} className="text-sm">
                            <div className="font-medium">{student.name}</div>
                            <div className="text-muted-foreground text-xs">
                              {student.experience} • {new Date(student.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No students yet
                        </div>
                      )}
                      {students[interest]?.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{students[interest].length - 3} more students
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="newsletter" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
              <Button 
                variant="outline" 
                onClick={() => exportToCSV(subscribers, 'newsletter-subscribers.csv')}
                disabled={subscribers.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardDescription>
                  Students who opted in to receive updates about classes and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subscribers.length > 0 ? (
                  <div className="space-y-3">
                    {subscribers.map((subscriber, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <div className="font-medium">
                            {subscriber.firstName} {subscriber.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {subscriber.email}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No newsletter subscribers yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}