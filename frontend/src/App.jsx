import React, { useState } from 'react';
// We will import components later when they are created
// import TopicInput from './components/TopicInput';
// import MenuList from './components/MenuList';
import './index.css'; // Ensure Tailwind/global styles are potentially used

function App() {
  // State variables
  const [sessionId, setSessionId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [history, setHistory] = useState([]); // To show basic navigation path

  // --- Mock API Call Handlers ---
  const handleTopicSubmit = async (topic) => {
    console.log("Submitting topic:", topic);
    setIsLoading(true);
    setError(null);
    setSessionId(null); // Reset session
    setMenuItems([]);
    setHistory([]);
    setCurrentTopic(topic);

    // MOCK LOGIC for startSession (replace later with actual API call)
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    try {
      const mockSessionId = `mock-session-${Date.now()}`;
      const mockMenuItems = [
          `History of ${topic}`,
          `Key Concepts in ${topic}`,
          `Applications of ${topic}`,
          `Future of ${topic}`
      ];
      setSessionId(mockSessionId);
      setMenuItems(mockMenuItems);
      setHistory([`Topic: ${topic}`]); // Start history
      console.log("Mock session started:", mockSessionId);
    } catch (err) {
       const errorMsg = 'Failed to start mock session.';
       setError(errorMsg);
       console.error(errorMsg, err);
    } finally {
      setIsLoading(false);
    }
    // --- END MOCK LOGIC ---
  };

  const handleMenuSelection = async (selection) => {
    console.log("Selecting menu item:", selection);
    if (!sessionId) {
        setError("No active session.");
        return;
    }
    setIsLoading(true);
    setError(null);

    // MOCK LOGIC for selectMenuItem (replace later with actual API call)
     await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
     try {
        let mockSubmenu = [];
        // Simple logic based on selection text
        if (selection.toLowerCase().includes('history')) {
            mockSubmenu = [`Early History`, `Mid-20th Century`, `Recent Developments`];
        } else if (selection.toLowerCase().includes('concepts')) {
            mockSubmenu = [`Core Idea A`, `Core Idea B`, `Related Theories`];
        } else if (selection.toLowerCase().includes('applications')) {
            mockSubmenu = [`Practical Use Case 1`, `Industry Examples`, `Research Areas`];
        } else {
            mockSubmenu = [`Sub-item for ${selection} 1`, `Sub-item 2`, `Sub-item 3`];
        }
        setMenuItems(mockSubmenu);
        setHistory(prev => [...prev, `Selected: ${selection}`]); // Update history
        console.log("Mock menu updated");
     } catch (err) {
       const errorMsg = 'Failed to process mock selection.';
       setError(errorMsg);
       console.error(errorMsg, err);
     } finally {
       setIsLoading(false);
     }
    // --- END MOCK LOGIC ---
  };

  // --- Reset Function ---
  const handleReset = () => {
      console.log("Resetting session");
      setSessionId(null);
      setMenuItems([]);
      setCurrentTopic('');
      setHistory([]);
      setError(null);
      setIsLoading(false);
  }

  // --- Render Logic ---
  return (
    <div className="container mx-auto p-4 max-w-2xl font-sans">
      <header className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-700">AI Subject Explorer</h1>
        {/* Render Reset Button only when a session is active */}
        {sessionId && (
             <button
                onClick={handleReset}
                className="mt-2 text-sm text-gray-500 hover:text-red-600 underline"
            >
                Start Over
            </button>
        )}
      </header>

      <main>
        {/* Loading Indicator */}
        {isLoading && <div className="text-center p-4 text-blue-500 font-semibold">Loading...</div>}

        {/* Error Display */}
        {error && <div className="text-center p-3 mb-4 bg-red-100 text-red-700 rounded border border-red-300">Error: {error}</div>}

        {/* Topic Input View (Placeholder for TopicInput component) */}
        {!isLoading && !error && !sessionId && (
           <div className="mt-4">
             <form onSubmit={(e) => { e.preventDefault(); handleTopicSubmit(e.target.elements.topic.value); }} className="flex gap-2">
                <input name="topic" type="text" placeholder="e.g., Artificial Intelligence" className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Explore</button>
             </form>
           </div>
        )}

        {/* Menu View (Placeholder for MenuList component) */}
        {!isLoading && !error && sessionId && menuItems.length > 0 && (
          <div className="mt-4">
            {/* Display history path */}
            <div className='text-sm text-gray-600 mb-3 border-b pb-2'>
                Path: {history.join(' → ')}
            </div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Select an option:</h2>
            <div className="space-y-2">
              {/* Render clickable buttons for menu items */}
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuSelection(item)}
                  className="block w-full text-left p-3 bg-gray-100 hover:bg-blue-100 rounded border border-gray-200 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-blue-500" // Added focus-visible
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
