import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Info } from 'lucide-react';

export function ImageFallbackTest() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This demo shows how ImageWithFallback handles different image scenarios. 
          Working images load normally, while broken URLs show a clean fallback placeholder.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Working Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✅ Working Image</CardTitle>
            <CardDescription>This image will load successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80"
                alt="Art supplies - this will load"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              URL: https://images.unsplash.com/photo-1513475382585...
            </p>
          </CardContent>
        </Card>

        {/* Broken Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">❌ Broken Image URL</CardTitle>
            <CardDescription>This will show the fallback placeholder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
              <ImageWithFallback
                src="https://broken-url-that-doesnt-exist.com/fake-image.jpg"
                alt="This won't load - shows fallback"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              URL: https://broken-url-that-doesnt-exist.com/fake-image.jpg
            </p>
          </CardContent>
        </Card>

        {/* Slow Loading Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">🐌 Potentially Slow Image</CardTitle>
            <CardDescription>Large image that might timeout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=2000&q=100"
                alt="Large image - might be slow"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              URL: Large 2000px image with high quality
            </p>
          </CardContent>
        </Card>

        {/* Another Working Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✅ Another Working Image</CardTitle>
            <CardDescription>Different art style image</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80"
                alt="Digital art - this will load"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              URL: https://images.unsplash.com/photo-1541961017774...
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use ImageWithFallback</CardTitle>
          <CardDescription>Simple implementation example</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="text-sm overflow-x-auto">
{`// 1. Import the component
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// 2. Use it like a regular <img> tag
<ImageWithFallback
  src="https://your-image-url.jpg"
  alt="Description of the image"
  className="w-full h-full object-cover"
/>

// 3. If the image fails to load, it automatically shows a fallback`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}