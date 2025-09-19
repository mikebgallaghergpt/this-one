import { useState } from 'react';
import { User, Palette, Mail, Heart, Star, Home, Settings, Camera, Brush, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function IconTutorial() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, id, title }: { code: string; id: string; title: string }) => (
    <div className="bg-gray-50 rounded-lg p-4 relative">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-sm">{title}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="h-8 px-2"
        >
          {copiedCode === id ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Icons for 5-Year-Olds! 🎨</h1>
        <p className="text-xl text-gray-600">
          Super simple steps to get and use icons in your art school website
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary">Step by Step</Badge>
          <Badge variant="secondary">Copy & Paste Ready</Badge>
          <Badge variant="secondary">No Confusion</Badge>
        </div>
      </div>

      {/* Step 1 */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            Your Icons Are Already Here! 🎉
          </CardTitle>
          <CardDescription>
            Good news! Your project already has thousands of beautiful icons ready to use. 
            They come from a library called "lucide-react" and they're already installed!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">✅ Already Working!</p>
            <p className="text-green-700 text-sm">Look at your signup form - those three icons at the top? That's lucide-react in action!</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <User className="w-12 h-12 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">Person</p>
              <code className="text-xs bg-white px-2 py-1 rounded">User</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Palette className="w-12 h-12 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Palette</p>
              <code className="text-xs bg-white px-2 py-1 rounded">Palette</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Mail className="w-12 h-12 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Mail</p>
              <code className="text-xs bg-white px-2 py-1 rounded">Mail</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2 */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-purple-50">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            How to Import Icons (The Magic Words) ✨
          </CardTitle>
          <CardDescription>
            To use an icon, you need to "import" it first. Think of this like asking the computer "Hey, can I borrow this icon please?"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-medium">🧙‍♂️ The Magic Import Spell</p>
            <p className="text-yellow-700 text-sm">This line goes at the TOP of your React file, before everything else!</p>
          </div>

          <CodeBlock
            id="import-basic"
            title="Basic Import (Copy this!)"
            code={`import { User, Palette, Mail } from 'lucide-react';`}
          />

          <CodeBlock
            id="import-many"
            title="Import Many Icons at Once"
            code={`import { 
  User, 
  Palette, 
  Mail, 
  Heart, 
  Star, 
  Home, 
  Settings,
  Camera,
  Brush 
} from 'lucide-react';`}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">💡 Pro Tip</p>
            <p className="text-blue-700 text-sm">You can import as many icons as you want in one line! Just separate them with commas.</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 3 */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            How to Use Icons (Put Them on Your Page) 🎨
          </CardTitle>
          <CardDescription>
            Once you've imported an icon, you can use it anywhere in your component. It's just like using a picture!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Usage */}
            <div className="space-y-3">
              <h4 className="font-medium">Basic Usage</h4>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <User className="w-6 h-6" />
                <span>This is a User icon!</span>
              </div>
              <CodeBlock
                id="basic-usage"
                title="The Code"
                code={`<User className="w-6 h-6" />`}
              />
            </div>

            {/* With Colors */}
            <div className="space-y-3">
              <h4 className="font-medium">With Colors</h4>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <Heart className="w-6 h-6 text-red-500" />
                <span>A red heart!</span>
              </div>
              <CodeBlock
                id="colored-usage"
                title="The Code"
                code={`<Heart className="w-6 h-6 text-red-500" />`}
              />
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 font-medium">🎯 Important Parts</p>
            <ul className="text-orange-700 text-sm mt-2 space-y-1">
              <li>• <code>w-6 h-6</code> = Size (w = width, h = height)</li>
              <li>• <code>text-red-500</code> = Color (optional)</li>
              <li>• Always use <code>className</code> not <code>class</code> in React!</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Step 4 */}
      <Card className="border-2 border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
            Icon Sizes (Make Them Big or Small) 📏
          </CardTitle>
          <CardDescription>
            You can make icons any size you want! Here are the most common sizes with live examples.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { size: 'w-3 h-3', label: 'Tiny', example: <Star className="w-3 h-3 text-yellow-500" /> },
              { size: 'w-4 h-4', label: 'Small', example: <Star className="w-4 h-4 text-yellow-500" /> },
              { size: 'w-5 h-5', label: 'Medium', example: <Star className="w-5 h-5 text-yellow-500" /> },
              { size: 'w-6 h-6', label: 'Large', example: <Star className="w-6 h-6 text-yellow-500" /> },
              { size: 'w-8 h-8', label: 'Big', example: <Star className="w-8 h-8 text-yellow-500" /> },
              { size: 'w-12 h-12', label: 'Huge', example: <Star className="w-12 h-12 text-yellow-500" /> },
            ].map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-2 h-12 items-center">
                  {item.example}
                </div>
                <p className="font-medium text-sm">{item.label}</p>
                <code className="text-xs bg-white px-2 py-1 rounded">{item.size}</code>
              </div>
            ))}
          </div>

          <CodeBlock
            id="size-examples"
            title="Size Examples (Copy any line!)"
            code={`<Star className="w-3 h-3" />   {/* Tiny */}
<Star className="w-4 h-4" />   {/* Small */}
<Star className="w-5 h-5" />   {/* Medium */}
<Star className="w-6 h-6" />   {/* Large */}
<Star className="w-8 h-8" />   {/* Big */}
<Star className="w-12 h-12" /> {/* Huge */}`}
          />
        </CardContent>
      </Card>

      {/* Step 5 */}
      <Card className="border-2 border-indigo-200">
        <CardHeader className="bg-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
            Colors (Make Them Pretty!) 🌈
          </CardTitle>
          <CardDescription>
            You can make your icons any color you want using Tailwind CSS color classes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { color: 'text-red-500', label: 'Red', example: <Heart className="w-6 h-6 text-red-500" /> },
              { color: 'text-blue-500', label: 'Blue', example: <Heart className="w-6 h-6 text-blue-500" /> },
              { color: 'text-green-500', label: 'Green', example: <Heart className="w-6 h-6 text-green-500" /> },
              { color: 'text-purple-500', label: 'Purple', example: <Heart className="w-6 h-6 text-purple-500" /> },
              { color: 'text-yellow-500', label: 'Yellow', example: <Heart className="w-6 h-6 text-yellow-500" /> },
              { color: 'text-pink-500', label: 'Pink', example: <Heart className="w-6 h-6 text-pink-500" /> },
              { color: 'text-orange-500', label: 'Orange', example: <Heart className="w-6 h-6 text-orange-500" /> },
              { color: 'text-gray-500', label: 'Gray', example: <Heart className="w-6 h-6 text-gray-500" /> },
            ].map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-2">
                  {item.example}
                </div>
                <p className="font-medium text-sm">{item.label}</p>
                <code className="text-xs bg-white px-1 py-1 rounded block mt-1">{item.color}</code>
              </div>
            ))}
          </div>

          <CodeBlock
            id="color-examples"
            title="Color Examples"
            code={`<Heart className="w-6 h-6 text-red-500" />    {/* Red */}
<Heart className="w-6 h-6 text-blue-500" />   {/* Blue */}
<Heart className="w-6 h-6 text-green-500" />  {/* Green */}
<Heart className="w-6 h-6 text-purple-500" /> {/* Purple */}`}
          />
        </CardContent>
      </Card>

      {/* Step 6 */}
      <Card className="border-2 border-teal-200">
        <CardHeader className="bg-teal-50">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
            Real Examples You Can Copy! 📋
          </CardTitle>
          <CardDescription>
            Here are complete, working examples you can copy and paste into your components right now.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Button with Icon */}
          <div className="space-y-3">
            <h4 className="font-medium">Button with Icon</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Button className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Profile
              </Button>
            </div>
            <CodeBlock
              id="button-example"
              title="Button Code"
              code={`<Button className="flex items-center gap-2">
  <User className="w-4 h-4" />
  Student Profile
</Button>`}
            />
          </div>

          {/* Icon with Text */}
          <div className="space-y-3">
            <h4 className="font-medium">Icon with Text</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-purple-500" />
                <span>Art Preferences</span>
              </div>
            </div>
            <CodeBlock
              id="text-example"
              title="Icon + Text Code"
              code={`<div className="flex items-center gap-3">
  <Palette className="w-5 h-5 text-purple-500" />
  <span>Art Preferences</span>
</div>`}
            />
          </div>

          {/* Grid of Icons */}
          <div className="space-y-3">
            <h4 className="font-medium">Grid of Icons</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <Home className="w-8 h-8 mx-auto mb-1 text-blue-500" />
                  <p className="text-sm">Home</p>
                </div>
                <div>
                  <Settings className="w-8 h-8 mx-auto mb-1 text-gray-500" />
                  <p className="text-sm">Settings</p>
                </div>
                <div>
                  <Camera className="w-8 h-8 mx-auto mb-1 text-green-500" />
                  <p className="text-sm">Photo</p>
                </div>
                <div>
                  <Brush className="w-8 h-8 mx-auto mb-1 text-purple-500" />
                  <p className="text-sm">Art</p>
                </div>
              </div>
            </div>
            <CodeBlock
              id="grid-example"
              title="Icon Grid Code"
              code={`<div className="grid grid-cols-4 gap-4 text-center">
  <div>
    <Home className="w-8 h-8 mx-auto mb-1 text-blue-500" />
    <p className="text-sm">Home</p>
  </div>
  <div>
    <Settings className="w-8 h-8 mx-auto mb-1 text-gray-500" />
    <p className="text-sm">Settings</p>
  </div>
  <div>
    <Camera className="w-8 h-8 mx-auto mb-1 text-green-500" />
    <p className="text-sm">Photo</p>
  </div>
  <div>
    <Brush className="w-8 h-8 mx-auto mb-1 text-purple-500" />
    <p className="text-sm">Art</p>
  </div>
</div>`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-2 border-green-300 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">✓</div>
            You're Ready! 🎉
          </CardTitle>
          <CardDescription>
            Now you know everything you need to add beautiful icons to your art school website!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-4 space-y-2">
            <p className="font-medium">Quick Recap:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Import icons: <code>import &#123; IconName &#125; from 'lucide-react';</code></li>
              <li>Use them: <code>&lt;IconName className="w-5 h-5" /&gt;</code></li>
              <li>Add colors: <code>text-blue-500</code></li>
              <li>Change sizes: <code>w-4 h-4</code> to <code>w-12 h-12</code></li>
              <li>Copy the examples above!</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}