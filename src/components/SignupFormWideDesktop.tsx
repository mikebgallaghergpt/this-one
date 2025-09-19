// SignupFormWideDesktop.tsx - Version 4.1.0
// Extremely wide desktop layout to match Figma design exactly

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Mail, User, Palette, CheckCircle, AlertCircle, Loader2, Wifi, WifiOff, ChevronDown, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

type Step = 'personal' | 'preferences' | 'account';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  experience: string;
  interests: string[];
  hearAboutUs: string;
  hearAboutUsOther: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
}

// Wide Desktop Checkbox Component
interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function WideDesktopCheckbox({ id, checked, onChange, disabled = false, children }: CheckboxProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer min-h-[64px] ${
          checked
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'bg-white border-gray-300'
          }`}
        >
          {checked && <Check className="w-4 h-4" />}
        </div>
        <span className="text-lg font-medium text-gray-700">{children}</span>
      </label>
    </div>
  );
}

// Wide Desktop Select Component  
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
}

function WideDesktopSelect({ value, onChange, placeholder, disabled = false, options }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-16 px-6 pr-16 bg-white border-2 border-gray-300 rounded-xl text-gray-900 text-lg font-medium appearance-none cursor-pointer focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled className="text-gray-500">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />
    </div>
  );
}

export function SignupFormWideDesktop() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    experience: '',
    interests: [],
    hearAboutUs: '',
    hearAboutUsOther: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  });

  const steps: { key: Step; title: string; description: string; icon: any }[] = [
    {
      key: 'personal',
      title: 'Personal Info',
      description: 'Tell us about yourself',
      icon: User,
    },
    {
      key: 'preferences',
      title: 'Art Preferences', 
      description: 'What interests you?',
      icon: Palette,
    },
    {
      key: 'account',
      title: 'Create Account',
      description: 'Set up your login',
      icon: Mail,
    },
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const experienceOptions = [
    { value: 'beginner', label: 'Complete Beginner' },
    { value: 'some', label: 'Some Experience' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'professional', label: 'Professional' },
  ];

  const hearAboutOptions = [
    { value: 'google', label: 'Google Search' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'friend', label: 'Friend/Family' },
    { value: 'flyer', label: 'Flyer/Advertisement' },
    { value: 'other', label: 'Other' },
  ];

  const interestOptions = [
    'Drawing', 'Painting', 'Digital Art', 'Sculpture', 'Mixed Media', 'Color Theory'
  ];

  const checkBackendHealth = async () => {
    try {
      const wpProjectId = (window as any).gallagher_config?.supabase_project_id;
      const wpAnonKey = (window as any).gallagher_config?.supabase_anon_key;
      const activeProjectId = wpProjectId || projectId;
      const activeAnonKey = wpAnonKey || publicAnonKey;

      if (!activeProjectId || !activeAnonKey) {
        setBackendAvailable(false);
        return false;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `https://${activeProjectId}.supabase.co/functions/v1/make-server-9c2430a9/health`,
        {
          headers: { 'Authorization': `Bearer ${activeAnonKey}` },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      setBackendAvailable(response.ok);
      return response.ok;
    } catch (err) {
      console.log('Backend health check failed:', err);
      setBackendAvailable(false);
      return false;
    }
  };

  const validateStep = (step: Step): boolean => {
    setError(null);
    
    switch (step) {
      case 'personal':
        if (!formData.firstName.trim()) {
          setError('First name is required');
          return false;
        }
        if (!formData.lastName.trim()) {
          setError('Last name is required');
          return false;
        }
        if (!formData.email.trim()) {
          setError('Email is required');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;
        
      case 'preferences':
        if (!formData.experience) {
          setError('Please select your experience level');
          return false;
        }
        if (!formData.hearAboutUs) {
          setError('Please select how you heard about us');
          return false;
        }
        if (formData.hearAboutUs === 'other' && !formData.hearAboutUsOther.trim()) {
          setError('Please specify how you heard about us');
          return false;
        }
        return true;
        
      case 'account':
        if (!formData.password) {
          setError('Password is required');
          return false;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const wpProjectId = (window as any).gallagher_config?.supabase_project_id;
      const wpAnonKey = (window as any).gallagher_config?.supabase_anon_key;
      const activeProjectId = wpProjectId || projectId;
      const activeAnonKey = wpAnonKey || publicAnonKey;

      if (!activeProjectId || !activeAnonKey) {
        setError('Social login is not configured. Please contact support.');
        setIsLoading(false);
        return;
      }

      alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login requires additional setup in your Supabase dashboard. Please visit https://supabase.com/docs/guides/auth/social-login/auth-${provider} for setup instructions.`);
      
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(err instanceof Error ? err.message : `Failed to sign in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('account')) return;

    setIsLoading(true);
    setError(null);

    try {
      const isBackendHealthy = await checkBackendHealth();
      
      if (!isBackendHealthy) {
        console.log('Running in demo mode - backend not available');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const demoUser = {
          id: `demo_${Date.now()}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          experience: formData.experience,
          interests: formData.interests,
          hearAboutUs: formData.hearAboutUs,
          hearAboutUsOther: formData.hearAboutUsOther,
          newsletter: formData.newsletter,
          createdAt: new Date().toISOString(),
          demoMode: true
        };
        
        const existingUsers = JSON.parse(localStorage.getItem('gallagher_demo_users') || '[]');
        existingUsers.push(demoUser);
        localStorage.setItem('gallagher_demo_users', JSON.stringify(existingUsers));
        
        if (formData.newsletter) {
          const existingSubscribers = JSON.parse(localStorage.getItem('gallagher_demo_subscribers') || '[]');
          existingSubscribers.push({
            userId: demoUser.id,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            subscribedAt: new Date().toISOString()
          });
          localStorage.setItem('gallagher_demo_subscribers', JSON.stringify(existingSubscribers));
        }
        
        setSuccess(true);
        console.log('Demo account created successfully:', demoUser);
        return;
      }

      const wpProjectId = (window as any).gallagher_config?.supabase_project_id;
      const wpAnonKey = (window as any).gallagher_config?.supabase_anon_key;
      const activeProjectId = wpProjectId || projectId;
      const activeAnonKey = wpAnonKey || publicAnonKey;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(`https://${activeProjectId}.supabase.co/functions/v1/make-server-9c2430a9/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeAnonKey}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          experience: formData.experience,
          interests: formData.interests,
          hearAboutUs: formData.hearAboutUs,
          hearAboutUsOther: formData.hearAboutUsOther,
          password: formData.password,
          newsletter: formData.newsletter,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      setSuccess(true);
      console.log('Account created successfully:', data);

    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    const isDemoMode = backendAvailable === false;
    
    return (
      <Card className="w-full h-full border-0 shadow-none flex items-center justify-center">
        <CardContent className="space-y-8 py-12 text-center max-w-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-green-700">
              {isDemoMode ? 'Demo Account Created!' : 'Welcome to Gallagher Art School!'}
            </h2>
            <p className="text-lg text-gray-600">
              {isDemoMode 
                ? 'Your demo account has been created and stored locally. This demonstrates the signup flow - deploy the backend for full functionality.'
                : 'Your account has been created successfully. You can now access your student dashboard and explore our art classes.'
              }
            </p>
            
            {isDemoMode ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <p className="text-blue-800">
                  <strong>Running in Demo Mode</strong>
                  <br />
                  • Data is stored locally in your browser
                  <br />
                  • Deploy the Supabase backend for full functionality
                  <br />
                  • Check the Admin Dashboard to see your demo data
                  <br />
                  • Refresh the page to create more test accounts
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <p className="text-green-800">
                  <strong>What's next?</strong>
                  <br />
                  • Check your email for a welcome message
                  <br />
                  • Browse our available art classes
                  <br />
                  • Complete your profile for personalized recommendations
                </p>
              </div>
            )}

            <Button 
              onClick={() => window.location.reload()} 
              className="mt-8 text-lg px-8 py-4 h-auto"
            >
              {isDemoMode ? 'Try Demo Again' : 'Continue to Dashboard'}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full border-0 shadow-none overflow-auto">
      <CardHeader className="text-center space-y-6 px-12 pt-12 pb-8">
        <div className="flex items-center justify-center space-x-8 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.key === currentStep;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.key} className="flex items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-black text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Icon size={32} />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="space-y-3">
          <CardTitle className="text-4xl">Join Gallagher Art School</CardTitle>
          <CardDescription className="text-xl">
            {steps[currentStepIndex].description}
          </CardDescription>
        </div>
        
        <Progress value={progress} className="w-full h-3" />

        {backendAvailable !== null && (
          <div className="flex items-center justify-center space-x-2 text-sm">
            {backendAvailable ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-red-600">Backend Unavailable</span>
              </>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-10 px-12 pb-12">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription className="text-lg">{error}</AlertDescription>
          </Alert>
        )}

        {/* Social Login Options */}
        {currentStep === 'personal' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <Button 
                type="button"
                variant="outline" 
                className="w-full h-16 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 text-lg font-medium transition-all duration-200 ease-in-out hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                ) : (
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span>Continue with Google</span>
              </Button>
              
              <Button 
                type="button"
                className="w-full h-16 bg-black hover:bg-gray-900 text-white text-lg font-medium border-0 transition-all duration-200 ease-in-out hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                ) : (
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                )}
                <span>Continue with Apple</span>
              </Button>
            </div>
            
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-lg uppercase">
                <span className="bg-background px-8 text-muted-foreground font-medium">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'personal' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-lg font-medium">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="John"
                      disabled={isLoading}
                      className="h-16 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      disabled={isLoading}
                      className="h-16 text-lg"
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-lg font-medium">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe"
                      disabled={isLoading}
                      className="h-16 text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-lg font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                      disabled={isLoading}
                      className="h-16 text-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'preferences' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label className="text-lg font-medium">Experience Level *</Label>
                    <WideDesktopSelect
                      value={formData.experience}
                      onChange={(value) => setFormData({...formData, experience: value})}
                      placeholder="Select your experience level"
                      disabled={isLoading}
                      options={experienceOptions}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-lg font-medium">How did you hear about us? *</Label>
                    <WideDesktopSelect
                      value={formData.hearAboutUs}
                      onChange={(value) => setFormData({...formData, hearAboutUs: value, hearAboutUsOther: value === 'other' ? formData.hearAboutUsOther : ''})}
                      placeholder="Select how you heard about us"
                      disabled={isLoading}
                      options={hearAboutOptions}
                    />
                  </div>

                  {formData.hearAboutUs === 'other' && (
                    <div className="space-y-3">
                      <Label htmlFor="hearAboutUsOther" className="text-lg font-medium">Please specify</Label>
                      <Input
                        id="hearAboutUsOther"
                        value={formData.hearAboutUsOther}
                        onChange={(e) => setFormData({...formData, hearAboutUsOther: e.target.value})}
                        placeholder="How did you hear about us?"
                        disabled={isLoading}
                        className="h-16 text-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Areas of Interest (select all that apply)</Label>
                    <div className="grid grid-cols-1 gap-4">
                      {interestOptions.map((interest) => (
                        <WideDesktopCheckbox
                          key={interest}
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          disabled={isLoading}
                        >
                          {interest}
                        </WideDesktopCheckbox>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'account' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-lg font-medium">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="h-16 text-lg"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <WideDesktopCheckbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={() => setFormData({...formData, newsletter: !formData.newsletter})}
                      disabled={isLoading}
                    >
                      Subscribe to our newsletter for art tips and class updates
                    </WideDesktopCheckbox>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-lg font-medium">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      className="h-16 text-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-10">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStepIndex === 0 || isLoading}
            className="flex items-center space-x-3 h-16 px-8 text-lg"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>

          {currentStepIndex === steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center space-x-3 bg-black hover:bg-gray-800 h-16 px-8 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <CheckCircle size={20} />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-3 bg-black hover:bg-gray-800 h-16 px-8 text-lg"
            >
              <span>Next</span>
              <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}