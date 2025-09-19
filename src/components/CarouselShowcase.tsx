import { useState } from 'react';
import { ImageCarousel } from './ImageCarousel';
import { EnhancedImageCarousel } from './EnhancedImageCarousel';
import { ThumbnailCarousel } from './ThumbnailCarousel';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ArrowLeft } from 'lucide-react';

interface CarouselShowcaseProps {
  onBack: () => void;
}

export function CarouselShowcase({ onBack }: CarouselShowcaseProps) {
  const [selectedCarousel, setSelectedCarousel] = useState<string>('original');

  const carouselOptions = [
    {
      id: 'original',
      name: 'Original Carousel',
      description: 'Your current implementation with smooth animations',
      features: ['Auto-advance', 'Fade transitions', 'Click indicators', 'Overlay content']
    },
    {
      id: 'enhanced',
      name: 'Enhanced Carousel', 
      description: 'Advanced version with manual controls and customization',
      features: ['Play/Pause control', 'Manual navigation', 'Slide transitions', 'Progress bar', 'CTA buttons']
    },
    {
      id: 'thumbnail',
      name: 'Thumbnail Carousel',
      description: 'Course browser with thumbnail navigation',
      features: ['Thumbnail grid', 'Course selection', 'Mobile optimized', 'Interactive preview']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Main App
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Carousel Showcase</h1>
                <p className="text-muted-foreground">Explore different carousel implementations for your art school</p>
              </div>
            </div>
            <Badge variant="secondary">Demo Mode</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedCarousel} onValueChange={setSelectedCarousel} className="space-y-8">
          {/* Carousel Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carouselOptions.map((option) => (
              <Card 
                key={option.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCarousel === option.id 
                    ? 'ring-2 ring-purple-500 border-purple-200' 
                    : 'hover:shadow-md border-gray-200'
                }`}
                onClick={() => setSelectedCarousel(option.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {option.name}
                    {selectedCarousel === option.id && (
                      <Badge className="bg-purple-600">Active</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Previews */}
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
            <TabsTrigger value="thumbnail">Thumbnail</TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Original Image Carousel</h3>
              <p className="text-muted-foreground mb-6">
                This is your current carousel implementation. It features smooth fade animations, 
                auto-advance functionality, and overlay content perfect for showcasing art courses.
              </p>
              <div className="rounded-lg overflow-hidden border">
                <ImageCarousel />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enhanced" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Enhanced Image Carousel</h3>
              <p className="text-muted-foreground mb-6">
                An upgraded version with manual controls, play/pause functionality, and smooth slide transitions. 
                Perfect for giving users more control over their browsing experience.
              </p>
              <div className="rounded-lg overflow-hidden border">
                <EnhancedImageCarousel 
                  showControls={true}
                  showIndicators={true}
                  autoPlayInterval={5000}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="thumbnail" className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Thumbnail Carousel</h3>
              <p className="text-muted-foreground mb-6">
                A course browser style carousel with thumbnail navigation. Users can click on different 
                course thumbnails to preview them in the main display area.
              </p>
              <div className="space-y-4">
                <ThumbnailCarousel 
                  onCourseSelect={(course) => console.log('Selected course:', course.title)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Implementation Instructions */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">How to Use These Carousels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">In Your React App:</h4>
              <div className="bg-white rounded border p-4 text-sm font-mono">
                <div className="text-gray-600">// Replace ImageCarousel with:</div>
                <div className="mt-2">
                  {selectedCarousel === 'original' && '<ImageCarousel />'}
                  {selectedCarousel === 'enhanced' && '<EnhancedImageCarousel />'}
                  {selectedCarousel === 'thumbnail' && '<ThumbnailCarousel />'}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">In WordPress/Flatsome:</h4>
              <div className="bg-white rounded border p-4 text-sm">
                <p>Your JavaScript implementation in <code className="bg-gray-100 px-1 rounded">gallagher-script.js</code> 
                already handles the carousel functionality. The enhanced features can be added by modifying 
                the existing carousel functions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}