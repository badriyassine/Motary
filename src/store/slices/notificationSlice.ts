import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
  Notification,
} from "../../api/api";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// Async thunks
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const [notificationsRes, unreadRes] = await Promise.all([
      getNotifications(),
      getUnreadCount(),
    ]);
    return {
      notifications: notificationsRes.data,
      unreadCount: unreadRes.data.count,
    };
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string) => {
    await markNotificationRead(id);
    return id;
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async () => {
    await markAllNotificationsRead();
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      })
      // Mark as Read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n._id === action.payload
        );
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        console.error("Failed to mark notification as read:", action.error);
      })
      // Mark All as Read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((notif) => {
          notif.read = true;
        });
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        console.error(
          "Failed to mark all notifications as read:",
          action.error
        );
      });
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
