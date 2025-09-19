import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PaletteIcon, EnhancedPaletteIcon, SimplePaletteIcon } from './PaletteIcon';
import { Palette } from 'lucide-react';

export function PaletteIconDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Beautiful Palette Icons</h1>
          <p className="text-lg text-gray-600">Custom SVG palette icons for Gallagher Art School</p>
        </div>

        {/* Icon Variations */}
        <Card>
          <CardHeader>
            <CardTitle>Icon Variations</CardTitle>
            <CardDescription>Different styles and sizes of our custom palette icons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Standard PaletteIcon */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Standard Palette Icon</h3>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <PaletteIcon size="sm" variant="default" />
                <PaletteIcon size="md" variant="purple" />
                <PaletteIcon size="lg" variant="gradient" />
                <PaletteIcon size="xl" variant="art" />
              </div>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                {`<PaletteIcon size="md" variant="purple" />`}
              </div>
            </div>

            {/* Enhanced PaletteIcon */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Enhanced Palette Icon (Gradient)</h3>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <EnhancedPaletteIcon size="sm" />
                <EnhancedPaletteIcon size="md" />
                <EnhancedPaletteIcon size="lg" />
                <EnhancedPaletteIcon size="xl" />
              </div>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                {`<EnhancedPaletteIcon size="md" />`}
              </div>
            </div>

            {/* Simple PaletteIcon */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Simple Palette Icon (Lucide Style)</h3>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <SimplePaletteIcon size="sm" />
                <SimplePaletteIcon size="md" />
                <SimplePaletteIcon size="lg" />
                <SimplePaletteIcon size="xl" />
              </div>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                {`<SimplePaletteIcon size="md" />`}
              </div>
            </div>

            {/* Original Lucide Icon for comparison */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Original Lucide Palette Icon</h3>
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                <Palette className="w-4 h-4 text-purple-600" />
                <Palette className="w-6 h-6 text-purple-600" />
                <Palette className="w-8 h-8 text-purple-600" />
                <Palette className="w-12 h-12 text-purple-600" />
              </div>
              <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm font-mono">
                {`<Palette className="w-6 h-6 text-purple-600" />`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
            <CardDescription>How to use these icons in your art school signup forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Progress Indicator */}
            <div className="space-y-3">
              <h4 className="font-medium">Progress Indicator</h4>
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">
                  <EnhancedPaletteIcon size="sm" className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Step 2: Art Preferences</p>
                  <p className="text-sm text-gray-600">Tell us about your artistic interests</p>
                </div>
              </div>
            </div>

            {/* Button with Icon */}
            <div className="space-y-3">
              <h4 className="font-medium">Button with Icon</h4>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <PaletteIcon size="sm" variant="default" className="text-white" />
                Art Preferences
              </button>
            </div>

            {/* Form Section Header */}
            <div className="space-y-3">
              <h4 className="font-medium">Form Section Header</h4>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <SimplePaletteIcon size="md" />
                  <h3 className="text-lg font-semibold">Choose Your Art Focus</h3>
                </div>
                <p className="text-gray-600">Select the artistic disciplines that interest you most.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Code</CardTitle>
            <CardDescription>Copy and paste these code snippets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono space-y-2">
              <div className="text-green-400">// Import the components</div>
              <div>{`import { PaletteIcon, EnhancedPaletteIcon, SimplePaletteIcon } from './components/PaletteIcon';`}</div>
              <br />
              <div className="text-green-400">// Use in your JSX</div>
              <div>{`<PaletteIcon size="md" variant="purple" />`}</div>
              <div>{`<EnhancedPaletteIcon size="lg" />`}</div>
              <div>{`<SimplePaletteIcon size="sm" />`}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}