import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const skipTyping = () => {
    if (!isDone) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setDisplayText(text);
      setIsDone(true);
    }
  };

  useEffect(() => {
    let currentIndex = 0;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalRef.current!);
          setIsDone(true);
        }
      }, speed);
    }, delay);

    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key === 'Enter') skipTyping();
      if (e instanceof MouseEvent) skipTyping();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      clearTimeout(timeoutRef.current!);
      clearInterval(intervalRef.current!);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [text, speed, delay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayText}
    </motion.div>
  );
};

export default TypingText;
