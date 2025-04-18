import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        let currentIndex = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
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