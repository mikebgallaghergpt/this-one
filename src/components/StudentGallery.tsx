import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArtWork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  medium: string;
}

const sampleArtworks: ArtWork[] = [
  {
    id: '1',
    title: 'Sunset Landscape',
    artist: 'Sarah M.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    medium: 'Oil on Canvas'
  },
  {
    id: '2', 
    title: 'Abstract Expression',
    artist: 'Mike R.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80',
    medium: 'Acrylic'
  },
  {
    id: '3',
    title: 'Portrait Study',
    artist: 'Lisa K.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
    medium: 'Charcoal'
  }
];

export function StudentGallery() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Gallery</h2>
        <p className="text-lg text-gray-600">Showcase of our talented students' work</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleArtworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Using ImageWithFallback here - if the image fails to load, it shows a fallback */}
            <div className="aspect-[4/3] bg-gray-100">
              <ImageWithFallback
                src={artwork.imageUrl}
                alt={`${artwork.title} by ${artwork.artist}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{artwork.title}</h3>
              <p className="text-gray-600 mb-1">by {artwork.artist}</p>
              <p className="text-sm text-gray-500">{artwork.medium}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}