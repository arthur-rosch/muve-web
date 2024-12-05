import { useState, useEffect } from 'react';
import { testimonials } from './testimonial-data';
import { TestimonialCard } from './testimonial-card';
import { motion, AnimatePresence } from 'framer-motion';

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full flex flex-col justify-center space-y-8 p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <TestimonialCard {...testimonials[currentIndex]} index={currentIndex} />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-2">
        {testimonials.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}