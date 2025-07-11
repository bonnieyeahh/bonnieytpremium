import React from 'react';
import YouTubePriceCalculator from './assets/YouTubePriceCalculator.jsx';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
        <YouTubePriceCalculator />
      </div>
    </div>
  );
}

export default App;
