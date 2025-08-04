import { useState, useEffect } from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingAnimation; 