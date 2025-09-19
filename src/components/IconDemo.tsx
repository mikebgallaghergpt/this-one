import { User, Palette, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function IconDemo() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Three Signup Icons</CardTitle>
          <CardDescription>
            These are the exact three icons you asked about - they're already working in your signup form!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {/* Person Icon */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Person Icon</h3>
                <p className="text-sm text-gray-600">Used for "Personal Info" step</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">User</code>
              </div>
            </div>

            {/* Palette Icon */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Palette Icon</h3>
                <p className="text-sm text-gray-600">Used for "Art Preferences" step</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">Palette</code>
              </div>
            </div>

            {/* Mail Icon */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Mail Icon</h3>
                <p className="text-sm text-gray-600">Used for "Create Account" step</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">Mail</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Import & Use These Icons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">1. Import Statement</h4>
            <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`import { User, Palette, Mail } from 'lucide-react';`}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">2. Usage Examples</h4>
            <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`// Basic usage
<User className="w-4 h-4" />
<Palette className="w-5 h-5" />
<Mail className="w-6 h-6" />

// With colors
<User className="w-5 h-5 text-blue-500" />
<Palette className="w-5 h-5 text-purple-500" />
<Mail className="w-5 h-5 text-green-500" />

// In buttons
<Button className="flex items-center gap-2">
  <User className="w-4 h-4" />
  Profile
</Button>`}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">3. Size Classes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-2">Common sizes:</p>
                <div className="space-y-1 text-xs">
                  <div><code>w-3 h-3</code> - Extra small (12px)</div>
                  <div><code>w-4 h-4</code> - Small (16px)</div>
                  <div><code>w-5 h-5</code> - Medium (20px)</div>
                  <div><code>w-6 h-6</code> - Large (24px)</div>
                  <div><code>w-8 h-8</code> - Extra large (32px)</div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Live examples:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" /> <span className="text-xs">w-3 h-3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" /> <span className="text-xs">w-4 h-4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" /> <span className="text-xs">w-5 h-5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-6 h-6" /> <span className="text-xs">w-6 h-6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Where These Icons Appear</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Step 1: Personal Info</p>
                <p className="text-sm text-gray-600">Name, email, phone, birth date</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Step 2: Art Preferences</p>
                <p className="text-sm text-gray-600">Experience level and interests</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Step 3: Create Account</p>
                <p className="text-sm text-gray-600">Password and newsletter preferences</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}