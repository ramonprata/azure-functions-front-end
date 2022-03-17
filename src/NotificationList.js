import { useEffect, useState } from 'react';
import { NotificationService } from './NotificationService';
import './App.css';

const notificationService = new NotificationService();

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await notificationService.getNotifications();
      if (data) {
        setNotifications(data);
      }
    };
    loadNotifications();
  }, []);

  const renderItem = (item) => {
    return (
      <div className="list-item">
        <p>{item.description}</p>
        <a href={item.fileURI}>{item.fileName}</a>
      </div>
    );
  };

  if (notifications.length) {
    return <div className="list">{notifications.map((n) => renderItem(n))}</div>;
  }
  return <p>No notifications to show</p>;
};

export default NotificationList;
