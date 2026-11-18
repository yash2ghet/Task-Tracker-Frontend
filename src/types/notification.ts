export type Notification = {
  id: string;
  userId: string;
  taskId: string | null;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};