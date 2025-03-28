import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback } from "react";
import "./style.css";

export const Flashcards = ({ className }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [history, setHistory] = useState([]);
    const [cards, setCards] = useState([]);

    // Extract card data from image filenames
    useEffect(() => {
        // This would typically be an API call or import
        // Using a mock implementation based on the file structure in Assets/flashcard-images
        const mockCardData = [
            "String 3 - Harmonic Minor - Middle",
            "String 3 - Harmonic Minor - Pointer",
            "String 3 - Harmonic Minor - Ring",
            "String 4 - Harmonic Minor - Middle",
            "String 4 - Harmonic Minor - Pinkie",
            // Add more card names as needed
        ];
        
        setCards(mockCardData);
        
        // Initialize with a random card
        const randomIndex = Math.floor(Math.random() * mockCardData.length);
        setCurrentIndex(randomIndex);
        setHistory([randomIndex]);
    }, []);

    // Toggle between show/hide answer
    const handleCardClick = () => {
        setShowAnswer(!showAnswer);
    };

    // Get a new random card
    const handleNextCard = useCallback(() => {
        if (cards.length <= 1) return;
        
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * cards.length);
        } while (newIndex === currentIndex);
        
        setCurrentIndex(newIndex);
        setHistory([...history, newIndex]);
        setShowAnswer(false);
    }, [cards, currentIndex, history]);

    // Go back to the previous card
    const handlePrevCard = useCallback(() => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop(); // Remove current card
            const prevIndex = newHistory[newHistory.length - 1];
            
            setCurrentIndex(prevIndex);
            setHistory(newHistory);
            setShowAnswer(false);
        }
    }, [history]);

    // Get the current card name and image path
    const currentCard = cards[currentIndex] || "";
    const imagePath = currentCard ? `/Assets/flashcard-images/${currentCard}.jpg` : "";

    return (
        <div className={`flashcards ${className || ""}`}>
            <div className="flashcard" onClick={handleCardClick}>
                <div className="text-wrapper">{currentCard}</div>

                {showAnswer && (
                    <img 
                        className="image" 
                        alt={currentCard} 
                        src={imagePath} 
                    />
                )}
            </div>

            <div className="naviagtion-buttons">
                <div 
                    className="previous-button" 
                    onClick={handlePrevCard}
                    style={{ cursor: history.length > 1 ? 'pointer' : 'default' }}
                />

                <div 
                    className="next-button" 
                    onClick={handleNextCard}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

Flashcards.propTypes = {
    className: PropTypes.string,
};
