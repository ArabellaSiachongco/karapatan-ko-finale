import { useState } from 'react';

export const useDictionary = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // API key
  const API_KEY = import.meta.env.VITE_DICTIONARY_API_KEY;

  // Handle case where API_KEY is not set
  if (!API_KEY) {
    console.error('API Key is missing.');
    return;
  }

  const handleTextSelection = (e) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      setSelectedWord(selectedText); // Store the selected word
      fetchDefinition(selectedText); // Fetch the definition for the selected word

      // Get the bounding rectangle of the selected text for positioning
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect(); //is a DOM element, method
      setTooltipPosition({
        top: rect.bottom + window.scrollY + 8, // Add slight spacing below the word
        left: rect.left + window.scrollX,
      });
    } else {
      setSelectedWord(null); // Clear selected word if nothing is highlighted
      setDefinition(null);
    }
  };

  const fetchDefinition = async (word) => {
    const url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0 && data[0].shortdef) {
          setDefinition(data[0].shortdef[0]); // Set the first short definition
        } else {
          setDefinition('No definition found.');
        }
      } else {
        setDefinition('No definition found.');
      }
    } catch (error) {
      console.error('Error fetching definition:', error);
      setDefinition('Error fetching definition.');
    }
  };

  return { selectedWord, definition, tooltipPosition, handleTextSelection };
};
