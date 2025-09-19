import { 
  User, 
  Palette, 
  Mail, 
  Brush,
  Paintbrush,
  Camera,
  Scissors,
  Zap,
  Heart,
  Star,
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Globe,
  Award,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Target,
  Layers,
  Image,
  Sparkles,
  Pencil,
  PenTool,
  Eraser,
  Shapes,
  Circle,
  Square,
  Triangle,
  MousePointer,
  Eye,
  Smile,
  ThumbsUp,
  CheckCircle,
  Plus,
  Minus,
  Settings,
  Info,
  HelpCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Download,
  Upload,
  Save,
  Share2,
  Play,
  Pause,
  Home,
  Menu,
  Search,
  Filter,
  SortAsc,
  Grid,
  List,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function IconShowcase() {
  const iconCategories = [
    {
      title: "Art & Creative Icons",
      description: "Perfect for your art school branding",
      icons: [
        { name: "User", component: User, description: "Student/Person profile" },
        { name: "Palette", component: Palette, description: "Art palette/preferences" },
        { name: "Mail", component: Mail, description: "Email/contact" },
        { name: "Brush", component: Brush, description: "Paint brush" },
        { name: "Paintbrush", component: Paintbrush, description: "Alternative brush" },
        { name: "Pencil", component: Pencil, description: "Drawing pencil" },
        { name: "PenTool", component: PenTool, description: "Design tool" },
        { name: "Eraser", component: Eraser, description: "Eraser tool" },
        { name: "Camera", component: Camera, description: "Photography" },
        { name: "Image", component: Image, description: "Image/gallery" },
        { name: "Layers", component: Layers, description: "Design layers" },
        { name: "Shapes", component: Shapes, description: "Geometric shapes" },
      ]
    },
    {
      title: "Education & Achievement", 
      description: "Icons for courses and student progress",
      icons: [
        { name: "GraduationCap", component: GraduationCap, description: "Graduation/courses" },
        { name: "BookOpen", component: BookOpen, description: "Learning/lessons" },
        { name: "Award", component: Award, description: "Achievements" },
        { name: "Star", component: Star, description: "Rating/favorites" },
        { name: "Target", component: Target, description: "Goals/objectives" },
        { name: "Lightbulb", component: Lightbulb, description: "Ideas/inspiration" },
        { name: "CheckCircle", component: CheckCircle, description: "Completed" },
        { name: "Sparkles", component: Sparkles, description: "Special/featured" },
      ]
    },
    {
      title: "User Interface",
      description: "Common UI icons for navigation and actions", 
      icons: [
        { name: "Home", component: Home, description: "Home page" },
        { name: "Menu", component: Menu, description: "Navigation menu" },
        { name: "Search", component: Search, description: "Search function" },
        { name: "Settings", component: Settings, description: "Settings/admin" },
        { name: "Plus", component: Plus, description: "Add/create" },
        { name: "Edit", component: Edit, description: "Edit/modify" },
        { name: "Trash2", component: Trash2, description: "Delete" },
        { name: "Share2", component: Share2, description: "Share" },
        { name: "Download", component: Download, description: "Download" },
        { name: "ExternalLink", component: ExternalLink, description: "External link" },
        { name: "ArrowRight", component: ArrowRight, description: "Next/forward" },
        { name: "ArrowLeft", component: ArrowLeft, description: "Back/previous" },
      ]
    },
    {
      title: "Contact & Communication",
      description: "Icons for contact information and social features",
      icons: [
        { name: "Phone", component: Phone, description: "Phone number" },
        { name: "MapPin", component: MapPin, description: "Location/address" },
        { name: "Globe", component: Globe, description: "Website/online" },
        { name: "Users", component: Users, description: "Community/group" },
        { name: "Calendar", component: Calendar, description: "Schedule/events" },
        { name: "Clock", component: Clock, description: "Time/duration" },
        { name: "Heart", component: Heart, description: "Favorites/likes" },
        { name: "ThumbsUp", component: ThumbsUp, description: "Approval/rating" },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Lucide React Icons</h1>
        <p className="text-lg text-gray-600">
          All the icons you can use in your Gallagher Art School project
        </p>
        <Badge variant="outline" className="mt-2">
          import &#123; IconName &#125; from 'lucide-react'
        </Badge>
      </div>

      {iconCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.icons.map((icon, iconIndex) => {
                const IconComponent = icon.component;
                return (
                  <div 
                    key={iconIndex}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2 bg-gray-100 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm mb-1">{icon.name}</p>
                      <p className="text-xs text-gray-500">{icon.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use These Icons</CardTitle>
          <CardDescription>Copy and paste these examples into your components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">1. Import the icons you need:</h4>
              <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
{`import { User, Palette, Mail } from 'lucide-react';`}
              </pre>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">2. Use them in your JSX:</h4>
              <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
{`<User className="w-4 h-4" />           // Small icon
<Palette className="w-6 h-6" />       // Medium icon  
<Mail className="w-8 h-8" />          // Large icon

// With colors
<User className="w-5 h-5 text-blue-500" />
<Palette className="w-5 h-5 text-purple-600" />
<Mail className="w-5 h-5 text-green-500" />`}
              </pre>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">3. Example with buttons:</h4>
              <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
{`<Button className="flex items-center gap-2">
  <User className="w-4 h-4" />
  Student Profile
</Button>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}