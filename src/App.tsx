import React from 'react';
import FeedGrid from './components/FeedGrid';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Live Data Feed with Infinite Scroll</h1>
      </header>
      <main className="app-main">
        <FeedGrid />
      </main>
    </div>
  );
};

export default App;
