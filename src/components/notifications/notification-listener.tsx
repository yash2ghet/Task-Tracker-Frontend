"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { socket } from "@/lib/socket";
import { BellRing } from "lucide-react";

type Notification = {
  id: string;
  userId: string;
  taskId: string | null;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export function NotificationListener() {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      socket.disconnect();
      return;
    }

    function onConnect() {
      console.log("Socket connected:", socket.id);
    }

    function onConnectError(error: Error) {
      console.error("Socket connection failed:", error.message);
    }

    function onNotification(notification: Notification) {
        toast(notification.title, {
            description: notification.message,
            icon: <BellRing className="size-5 text-emerald-400" />,
            duration: 5000,
        });
    }

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("notification:new", onNotification);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("notification:new", onNotification);
      socket.disconnect();
    };
  }, [session?.user.id, isPending]);

  return null;
}