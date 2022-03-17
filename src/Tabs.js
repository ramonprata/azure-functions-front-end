import './App.css';

const Tabs = ({ setSelectedPage }) => {
  return (
    <div className="tabs">
      <div className="tab-item" onClick={() => setSelectedPage('form')}>
        Create
      </div>
      <div className="tab-item" onClick={() => setSelectedPage('list')}>
        Notifications
      </div>
    </div>
  );
};
export default Tabs;
