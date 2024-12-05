import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  index: number;
}

export function TestimonialCard({ name, role, company, content, avatar, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="backdrop-blur-sm rounded-xl p-6 relative"
    >
      <Quote className="absolute -top-3 -left-3 h-8 w-8 text-primary/20" color='white'/>
      <div className="space-y-4">
        <p className="text-gray-300 text-3xl leading-relaxed">{content}</p>
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-white font-medium">{name}</h4>
            <p className="text-gray-400 text-sm">
              {role} at {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}