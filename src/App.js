import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NotificationForm from './Form';
import Tabs from './Tabs';
import NotificationList from './NotificationList';

function App() {
  const [selectedPage, setSelectedPage] = useState('form');

  const renderContent = () => {
    if (selectedPage === 'form') {
      return <NotificationForm />;
    }

    if (selectedPage === 'list') {
      return <NotificationList />;
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h6>Hi there!</h6>
        <main>
          <Tabs setSelectedPage={(tab) => setSelectedPage(tab)} />
          {renderContent()}
        </main>
      </header>
    </div>
  );
}

export default App;
