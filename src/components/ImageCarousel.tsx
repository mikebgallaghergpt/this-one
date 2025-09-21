import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    image: "/images/painting-one.png",
    title: "Master the Art of Drawing",
    subtitle: "From beginner sketches to advanced techniques",
  },
  {
    image: "/images/underhisvery-copy.jpeg",
    title: "Explore Vibrant Painting",
    subtitle: "Watercolors, oils, and mixed media",
  },
  {
    image: "/images/palette.webp",
    title: "Color Theory Mastery",
    subtitle: "Understanding color relationships and harmony",
  },
  {
    image: "/images/sculpture011.webp",
    title: "Sculpture & 3D Art",
    subtitle: "Shape your imagination into reality",
  },
  {
    image: "/images/frank-stella-sm.webp",
    title: "Mixed Media AI & Collage",
    subtitle: "Combine traditional and AI-generated materials",
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-64 lg:h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-hidden
        >
          <div className="relative h-full">
            <ImageWithFallback
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl lg:text-5xl font-bold mb-2">
            Gallagher Art School
          </h1>
          <p className="text-lg lg:text-xl opacity-90 mb-6">
            Expert instruction from an MFA Yale graduate
          </p>
          <div className="space-y-2">
            <h2 className="text-xl lg:text-2xl font-semibold">
              {slides[currentSlide].title}
            </h2>
            <p className="text-base lg:text-lg opacity-80">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageCarousel;