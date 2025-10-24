import React from 'react';
import './App.css'; // Import the custom App.css
import Quiz from './components/Quiz';

const App: React.FC = () => {
  return (
    <div className="App">
      <Quiz />
    </div>
  );
}

export default App;