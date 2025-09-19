import { User, Palette, Mail, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function SimpleIconGuide() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Icon Guide 🎨</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold">Step 1: Import</h3>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              import &#123; User, Palette, Mail &#125; from 'lucide-react';
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Step 2: Use</h3>
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-blue-500" />
              <div className="bg-gray-100 p-2 rounded font-mono text-sm flex-1">
                <User className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Palette className="w-6 h-6 text-purple-500" />
              <div className="bg-gray-100 p-2 rounded font-mono text-sm flex-1">
                <Palette className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-green-500" />
              <div className="bg-gray-100 p-2 rounded font-mono text-sm flex-1">
                <Mail className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Common Sizes</h3>
            <div className="flex items-center gap-4">
              <Heart className="w-4 h-4 text-red-500" />
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">w-4 h-4</code>
              <Heart className="w-6 h-6 text-red-500" />
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">w-6 h-6</code>
              <Heart className="w-8 h-8 text-red-500" />
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">w-8 h-8</code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}