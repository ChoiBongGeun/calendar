import { TodoItem } from '@/atoms/todo';

class NotificationService {
  private static instance: NotificationService;
  private notifications: Map<number, NodeJS.Timeout> = new Map();

  private constructor() {
    // 브라우저 알림 권한 요청
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  scheduleNotification(todo: TodoItem) {
    if (!todo.time || !todo.notification) return;

    // 이미 예약된 알림이 있다면 취소
    this.cancelNotification(todo.id);

    const [hours, minutes] = todo.time.split(':').map(Number);
    const now = new Date();
    const notificationTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    // 이미 지난 시간이라면 다음 날로 설정
    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const delay = notificationTime.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      this.showNotification(todo);
    }, delay);

    this.notifications.set(todo.id, timeout);
  }

  cancelNotification(todoId: number) {
    const timeout = this.notifications.get(todoId);
    if (timeout) {
      clearTimeout(timeout);
      this.notifications.delete(todoId);
    }
  }

  private showNotification(todo: TodoItem) {
    if (!('Notification' in window)) {
      console.log('이 브라우저는 알림을 지원하지 않습니다.');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(todo.title, {
        body: todo.content || `${todo.time}에 할 일이 있습니다.`,
        icon: '/favicon.ico',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(todo.title, {
            body: todo.content || `${todo.time}에 할 일이 있습니다.`,
            icon: '/favicon.ico',
          });
        }
      });
    }
  }
}

export const notificationService = NotificationService.getInstance(); 