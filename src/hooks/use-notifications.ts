"use client";

import { useCallback, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import type { Notification } from "@/types/notification";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function useNotifications(enabled: boolean) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!enabled) return;

    try {
      const response = await fetch(`${API_URL}/api/notifications`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data: Notification[] = await response.json();

      setNotifications(data);
    } catch (error) {
      console.error("Notification fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    void fetchNotifications();

    function onNotification(notification: Notification) {
      setNotifications((previous) => {
        if (previous.some((item) => item.id === notification.id)) {
          return previous;
        }

        return [notification, ...previous];
      });
    }

    socket.on("notification:new", onNotification);
    socket.on("connect", fetchNotifications);

    return () => {
      socket.off("notification:new", onNotification);
      socket.off("connect", fetchNotifications);
    };
  }, [enabled, fetchNotifications]);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notifications/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      const updated: Notification = await response.json();

      setNotifications((previous) =>
        previous.map((item) =>
          item.id === updated.id ? updated : item
        )
      );
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
  };
}