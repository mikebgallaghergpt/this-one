import { User, Palette, Mail, Heart, Star, Home, Settings, Camera, Brush, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function IconCheatSheet() {
  const [copied, setCopied] = useState(false);

  const cheatSheetCode = `// 🎯 ICON CHEAT SHEET - Copy this entire block!

// 1. Import icons (put at top of file)
import { User, Palette, Mail, Heart, Star, Home, Settings } from 'lucide-react';

// 2. Use anywhere in your component
<User className="w-5 h-5" />                    // Basic icon
<Heart className="w-5 h-5 text-red-500" />     // Colored icon
<Star className="w-8 h-8 text-yellow-400" />   // Bigger icon

// 3. In buttons
<Button className="flex items-center gap-2">
  <User className="w-4 h-4" />
  Profile
</Button>

// 4. With text
<div className="flex items-center gap-2">
  <Mail className="w-4 h-4 text-blue-500" />
  <span>Email</span>
</div>

// 5. Common sizes:
// w-3 h-3 = tiny     w-4 h-4 = small    w-5 h-5 = medium
// w-6 h-6 = large    w-8 h-8 = big      w-12 h-12 = huge

// 6. Common colors:
// text-red-500    text-blue-500    text-green-500
// text-purple-500 text-yellow-500  text-gray-500`;

  const copyCheatSheet = () => {
    navigator.clipboard.writeText(cheatSheetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Icon Cheat Sheet 📝</h2>
            <p className="text-gray-600">Everything you need in one place!</p>
          </div>
          <Button 
            onClick={copyCheatSheet}
            className="flex items-center gap-2"
            variant={copied ? "default" : "outline"}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy All"}
          </Button>
        </div>
        
        <div className="bg-white rounded-lg p-4 border">
          <pre className="text-sm overflow-x-auto">
            <code>{cheatSheetCode}</code>
          </pre>
        </div>
        
        <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-3 text-center">
          {[
            { icon: User, name: 'User' },
            { icon: Palette, name: 'Palette' },
            { icon: Mail, name: 'Mail' },
            { icon: Heart, name: 'Heart' },
            { icon: Star, name: 'Star' },
            { icon: Home, name: 'Home' },
            { icon: Settings, name: 'Settings' },
            { icon: Camera, name: 'Camera' },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                <IconComponent className="w-6 h-6 mx-auto mb-1 text-gray-700" />
                <p className="text-xs font-medium">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}