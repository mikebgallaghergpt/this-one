import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, User, Palette, CheckCircle, AlertCircle, Loader2, ChevronDown, Check, Settings } from 'lucide-react';

type Step = 'personal' | 'preferences' | 'account';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  interests: string[];
  hearAboutUs: string;
  hearAboutUsOther: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
}

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function OriginalCheckbox({ id, checked, onChange, disabled = false, children }: CheckboxProps) {
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
        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
          checked
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'bg-white border-gray-300'
          }`}
        >
          {checked && <Check className="w-3 h-3" />}
        </div>
        <span className="text-sm font-medium text-gray-700">{children}</span>
      </label>
    </div>
  );
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
}

function OriginalSelect({ value, onChange, placeholder, disabled = false, options }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-12 px-4 pr-12 bg-white border-2 border-gray-300 rounded-lg text-gray-900 text-sm font-medium appearance-none cursor-pointer focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
    </div>
  );
}

export function GallagherStandaloneSignup() {
  const [currentView, setCurrentView] = useState<'signup' | 'admin'>('signup');
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [componentReady, setComponentReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    interests: [],
    hearAboutUs: '',
    hearAboutUsOther: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  });

  const carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1200&fit=crop&q=80',
      title: 'Discover Your Artistic Voice',
      subtitle: 'Join our community of passionate artists and explore various mediums under expert guidance.',
      cta: 'Learn More'
    },
    {
      src: 'https://images.unsplash.com/photo-1502780402662-acc01917477e?w=800&h=1200&fit=crop&q=80',
      title: 'Professional Art Instruction',
      subtitle: 'Learn from Yale MFA graduate with years of teaching experience and artistic expertise.',
      cta: 'View Portfolio'
    },
    {
      src: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?w=800&h=1200&fit=crop&q=80',
      title: 'All Ages Welcome',
      subtitle: 'From children to adults, our classes are designed to inspire creativity at every level.',
      cta: 'Class Schedule'
    }
  ];

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
    'Drawing', 'Painting', 'Sculpture', 'Mixed Media AI & Collage', 'Color Theory'
  ];

  // Initialize component
  useEffect(() => {
    const timer = setTimeout(() => {
      setComponentReady(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

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
        return true;
        
      case 'account':
        if (!formData.hearAboutUs) {
          setError('Please select how you heard about us');
          return false;
        }
        if (formData.hearAboutUs === 'other' && !formData.hearAboutUsOther.trim()) {
          setError('Please specify how you heard about us');
          return false;
        }
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login requires additional setup. This is a demo version.`);
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const demoUser = {
        id: `demo_${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
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

    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep('personal');
    setSuccess(false);
    setError(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      interests: [],
      hearAboutUs: '',
      hearAboutUsOther: '',
      password: '',
      confirmPassword: '',
      newsletter: false,
    });
  };

  // Admin Dashboard Component
  const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
      const loadData = () => {
        const studentsData = JSON.parse(localStorage.getItem('gallagher_demo_users') || '[]');
        const subscribersData = JSON.parse(localStorage.getItem('gallagher_demo_subscribers') || '[]');
        setStudents(studentsData);
        setSubscribers(subscribersData);
      };
      
      loadData();
      // Refresh every 2 seconds to catch updates
      const interval = setInterval(loadData, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Newsletter Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
                </div>
                <Mail className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unique Students</p>
                  <p className="text-2xl font-bold text-gray-900">{new Set(students.map((s: any) => s.email)).size}</p>
                </div>
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
            </div>
            <div className="p-6">
              {students.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No students enrolled yet.</p>
              ) : (
                <div className="space-y-4">
                  {students.slice(0, 10).map((student: any) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{student.firstName} {student.lastName}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-xs text-gray-500">Experience: {student.experience}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{new Date(student.createdAt).toLocaleDateString()}</p>
                        {student.newsletter && (
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Newsletter</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (!componentReady) {
    return (
      <Card className="w-full max-w-md mx-auto border-0 shadow-none">
        <CardContent className="py-8">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Admin view
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80">
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="outline"
            onClick={() => setCurrentView('signup')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Signup
          </Button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:flex min-h-screen">
          {/* Left: Carousel */}
          <div className="w-1/2 h-screen relative overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={carouselImages[currentSlide].src} 
                alt={carouselImages[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{carouselImages[currentSlide].title}</h3>
                  <p className="text-lg opacity-90">{carouselImages[currentSlide].subtitle}</p>
                  <Button className="mt-4 bg-white text-black hover:bg-gray-100">
                    {carouselImages[currentSlide].cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right: Success Message */}
          <div className="w-1/2 h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80 flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-0 shadow-lg">
              <CardContent className="space-y-6 py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-green-700">Demo Account Created!</h2>
                  <p className="text-sm text-gray-600">Your demo account has been created and stored locally.</p>
                  
                  <Button onClick={resetForm} className="mt-6">
                    Try Demo Again
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen">
          <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100/80 min-h-[60vh] flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-0 shadow-lg">
              <CardContent className="space-y-6 py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-green-700">Demo Account Created!</h2>
                  <p className="text-sm text-gray-600">Your demo account has been created and stored locally.</p>
                  
                  <Button onClick={resetForm} className="mt-6">
                    Try Demo Again
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-64 relative overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={carouselImages[currentSlide].src} 
                alt={carouselImages[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Main signup form
  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left: Carousel */}
        <div className="w-1/2 h-screen relative overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={carouselImages[currentSlide].src} 
              alt={carouselImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{carouselImages[currentSlide].title}</h3>
                <p className="text-lg opacity-90">{carouselImages[currentSlide].subtitle}</p>
                <Button className="mt-4 bg-white text-black hover:bg-gray-100">
                  {carouselImages[currentSlide].cta}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right: Form */}
        <div className="w-1/2 h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80 flex items-center justify-center p-6 relative">
          {/* Admin button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4" />
              Admin
            </Button>
          </div>
          
          {/* Form */}
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center space-y-4 pb-6">
                {/* Progress Icons */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.key === currentStep;
                    const isCompleted = index < currentStepIndex;
                    
                    return (
                      <div key={step.key} className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-black text-white'
                              : isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-xl font-bold">Join Gallagher Art School</h1>
                  <p className="text-sm text-gray-600">{steps[currentStepIndex].description}</p>
                </div>
                
                <Progress value={progress} className="w-full h-2" />
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Social Login - Only on first step */}
                {currentStep === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full h-12 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 text-sm font-medium"
                        onClick={() => handleSocialLogin('google')}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        )}
                        <span>Google</span>
                      </Button>
                      
                      <Button 
                        type="button"
                        className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-medium"
                        onClick={() => handleSocialLogin('apple')}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                        )}
                        <span>Apple</span>
                      </Button>
                    </div>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-sm uppercase">
                        <span className="bg-background px-4 text-muted-foreground font-medium">
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
                    className="space-y-4"
                  >
                    {currentStep === 'personal' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              placeholder="John"
                              disabled={isLoading}
                              className="h-10 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              placeholder="Doe"
                              disabled={isLoading}
                              className="h-10 text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 'preferences' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Art Experience Level *</Label>
                          <OriginalSelect
                            value={formData.experience}
                            onChange={(value) => setFormData({...formData, experience: value})}
                            placeholder="Select your experience level"
                            disabled={isLoading}
                            options={experienceOptions}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Areas of Interest (select all that apply)</Label>
                          <div className="grid grid-cols-1 gap-2">
                            {interestOptions.map((interest) => (
                              <OriginalCheckbox
                                key={interest}
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onChange={() => handleInterestToggle(interest)}
                                disabled={isLoading}
                              >
                                {interest}
                              </OriginalCheckbox>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 'account' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">How did you hear about us? *</Label>
                          <OriginalSelect
                            value={formData.hearAboutUs}
                            onChange={(value) => setFormData({...formData, hearAboutUs: value, hearAboutUsOther: value === 'other' ? formData.hearAboutUsOther : ''})}
                            placeholder="Select how you heard about us"
                            disabled={isLoading}
                            options={hearAboutOptions}
                          />
                        </div>

                        {formData.hearAboutUs === 'other' && (
                          <div className="space-y-2">
                            <Label htmlFor="hearAboutUsOther" className="text-sm font-medium">Please specify</Label>
                            <Input
                              id="hearAboutUsOther"
                              value={formData.hearAboutUsOther}
                              onChange={(e) => setFormData({...formData, hearAboutUsOther: e.target.value})}
                              placeholder="How did you hear about us?"
                              disabled={isLoading}
                              className="h-10 text-sm"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Enter your password"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="newsletter"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                            disabled={isLoading}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <Label htmlFor="newsletter" className="text-sm text-gray-700">
                            I'd like to receive updates about classes and events
                          </Label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  {currentStepIndex > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    type="button"
                    onClick={currentStepIndex === steps.length - 1 ? handleSubmit : handleNext}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {currentStepIndex === steps.length - 1 ? 'Create Account' : 'Next'}
                        {currentStepIndex < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen">
        {/* Top: Form */}
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100/80 min-h-[60vh] flex items-center justify-center p-6 relative">
          {/* Admin button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-sm"
            >
              <Settings className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </div>
          
          {/* Form (same as desktop, but in mobile container) */}
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center space-y-4 pb-6">
                {/* Progress Icons */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.key === currentStep;
                    const isCompleted = index < currentStepIndex;
                    
                    return (
                      <div key={step.key} className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-black text-white'
                              : isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-xl font-bold">Join Gallagher Art School</h1>
                  <p className="text-sm text-gray-600">{steps[currentStepIndex].description}</p>
                </div>
                
                <Progress value={progress} className="w-full h-2" />
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Social Login - Only on first step */}
                {currentStep === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full h-12 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 text-sm font-medium"
                        onClick={() => handleSocialLogin('google')}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        )}
                        <span>Google</span>
                      </Button>
                      
                      <Button 
                        type="button"
                        className="w-full h-12 bg-black hover:bg-gray-900 text-white text-sm font-medium"
                        onClick={() => handleSocialLogin('apple')}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                        )}
                        <span>Apple</span>
                      </Button>
                    </div>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-sm uppercase">
                        <span className="bg-background px-4 text-muted-foreground font-medium">
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
                    className="space-y-4"
                  >
                    {currentStep === 'personal' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="firstName-mobile" className="text-sm font-medium">First Name *</Label>
                            <Input
                              id="firstName-mobile"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              placeholder="John"
                              disabled={isLoading}
                              className="h-10 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName-mobile" className="text-sm font-medium">Last Name *</Label>
                            <Input
                              id="lastName-mobile"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              placeholder="Doe"
                              disabled={isLoading}
                              className="h-10 text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-mobile" className="text-sm font-medium">Email *</Label>
                          <Input
                            id="email-mobile"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone-mobile" className="text-sm font-medium">Phone Number</Label>
                          <Input
                            id="phone-mobile"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 'preferences' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Art Experience Level *</Label>
                          <OriginalSelect
                            value={formData.experience}
                            onChange={(value) => setFormData({...formData, experience: value})}
                            placeholder="Select your experience level"
                            disabled={isLoading}
                            options={experienceOptions}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Areas of Interest (select all that apply)</Label>
                          <div className="grid grid-cols-1 gap-2">
                            {interestOptions.map((interest) => (
                              <OriginalCheckbox
                                key={interest}
                                id={`${interest}-mobile`}
                                checked={formData.interests.includes(interest)}
                                onChange={() => handleInterestToggle(interest)}
                                disabled={isLoading}
                              >
                                {interest}
                              </OriginalCheckbox>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 'account' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">How did you hear about us? *</Label>
                          <OriginalSelect
                            value={formData.hearAboutUs}
                            onChange={(value) => setFormData({...formData, hearAboutUs: value, hearAboutUsOther: value === 'other' ? formData.hearAboutUsOther : ''})}
                            placeholder="Select how you heard about us"
                            disabled={isLoading}
                            options={hearAboutOptions}
                          />
                        </div>

                        {formData.hearAboutUs === 'other' && (
                          <div className="space-y-2">
                            <Label htmlFor="hearAboutUsOther-mobile" className="text-sm font-medium">Please specify</Label>
                            <Input
                              id="hearAboutUsOther-mobile"
                              value={formData.hearAboutUsOther}
                              onChange={(e) => setFormData({...formData, hearAboutUsOther: e.target.value})}
                              placeholder="How did you hear about us?"
                              disabled={isLoading}
                              className="h-10 text-sm"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="password-mobile" className="text-sm font-medium">Password *</Label>
                          <Input
                            id="password-mobile"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="Enter your password"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword-mobile" className="text-sm font-medium">Confirm Password *</Label>
                          <Input
                            id="confirmPassword-mobile"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                            className="h-10 text-sm"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="newsletter-mobile"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                            disabled={isLoading}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <Label htmlFor="newsletter-mobile" className="text-sm text-gray-700">
                            I'd like to receive updates about classes and events
                          </Label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  {currentStepIndex > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    type="button"
                    onClick={currentStepIndex === steps.length - 1 ? handleSubmit : handleNext}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {currentStepIndex === steps.length - 1 ? 'Create Account' : 'Next'}
                        {currentStepIndex < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Bottom: Carousel */}
        <div className="h-64 relative overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img 
              src={carouselImages[currentSlide].src} 
              alt={carouselImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}