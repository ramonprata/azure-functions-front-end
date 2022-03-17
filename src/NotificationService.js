export class NotificationService {
  async getNotifications() {
    try {
      const response = await fetch('http://localhost:7071/api/notifications');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('error getNotifications:', error);
    }
  }
}
