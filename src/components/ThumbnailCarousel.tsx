import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from './ui/carousel';

interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  description?: string;
}

const artCourses: CarouselSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Drawing Fundamentals",
    subtitle: "Master the basics",
    description: "Learn line work, shading, and composition from the ground up."
  },
  {
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Watercolor Painting",
    subtitle: "Fluid expressions",
    description: "Explore transparency, color mixing, and wet-on-wet techniques."
  },
  {
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Digital Illustration",
    subtitle: "Modern creativity",
    description: "Digital tools and techniques for contemporary art making."
  },
  {
    image: "https://images.unsplash.com/photo-1452457807411-4979b707c5be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Sculpture Basics",
    subtitle: "3D artistry",
    description: "Work with clay, wire, and mixed media to create dimensional art."
  },
  {
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Abstract Painting",
    subtitle: "Express yourself",
    description: "Break free from representation and explore pure color and form."
  },
  {
    image: "https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    title: "Portrait Drawing",
    subtitle: "Capture likeness",
    description: "Advanced techniques for drawing faces and expressions."
  }
];

interface ThumbnailCarouselProps {
  className?: string;
  onCourseSelect?: (course: CarouselSlide) => void;
}

export function ThumbnailCarousel({ className = "", onCourseSelect }: ThumbnailCarouselProps) {
  const [selectedCourse, setSelectedCourse] = useState<CarouselSlide>(artCourses[0]);

  const handleCourseClick = (course: CarouselSlide) => {
    setSelectedCourse(course);
    onCourseSelect?.(course);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Featured Course Display */}
      <motion.div 
        key={selectedCourse.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      >
        <ImageWithFallback
          src={selectedCourse.image}
          alt={selectedCourse.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl lg:text-4xl font-bold">
              {selectedCourse.title}
            </h2>
            <p className="text-lg lg:text-xl opacity-90">
              {selectedCourse.subtitle}
            </p>
            {selectedCourse.description && (
              <p className="text-base lg:text-lg opacity-80 max-w-md mx-auto">
                {selectedCourse.description}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Course Thumbnails Carousel */}
      <div className="w-full max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {artCourses.map((course, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedCourse.title === course.title 
                      ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-background' 
                      : 'hover:ring-2 hover:ring-purple-300 hover:ring-offset-2 hover:ring-offset-background'
                  }`}
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="relative aspect-[4/3] group">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                      <h3 className="text-sm font-semibold mb-1 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs opacity-90 line-clamp-1">
                        {course.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Course Grid Alternative for Mobile */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {artCourses.slice(0, 4).map((course, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
              selectedCourse.title === course.title 
                ? 'ring-2 ring-purple-500' 
                : 'hover:ring-2 hover:ring-purple-300'
            }`}
            onClick={() => handleCourseClick(course)}
          >
            <div className="relative aspect-[4/3]">
              <ImageWithFallback
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-2 text-white">
                <h3 className="text-xs font-semibold mb-1 line-clamp-1">
                  {course.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}