import { v4 as uuid } from "uuid";
import { create } from "zustand";
import type { ChatSession, Message, MessageRole } from "./types";

type ChatStore = {
  chats: ChatSession[];
  createChat: (id: string) => void;
  clearChats: () => void;
  getChatById: (id: string) => ChatSession | undefined;
  addMessage: (chatId: string, content: string, role: MessageRole) => void;
  updateChatLabel: (chatId: string, label: string) => void;
};

export const useChats = create<ChatStore>((set, get) => ({
  chats: [],

  clearChats() {
    set({ chats: [] });
  },

  createChat(id) {
    set((prev) => ({
      chats: [{ id, label: "New Chat", messages: [] }, ...prev.chats],
    }));
  },

  getChatById(id) {
    return get().chats.find((chat) => chat.id === id);
  },

  addMessage(chatId, content, role) {
    const message: Message = {
      id: uuid(),
      content,
      role,
      timestamp: Date.now(),
    };

    set((prev) => ({
      chats: prev.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    }));

    // Если это первое сообщение пользователя, обновляем название чата
    if (role === "user") {
      const chat = get().getChatById(chatId);
      if (chat && chat.messages.length === 0) {
        get().updateChatLabel(chatId, content.slice(0, 30));
      }
    }
  },

  updateChatLabel(chatId, label) {
    set((prev) => ({
      chats: prev.chats.map((chat) =>
        chat.id === chatId ? { ...chat, label } : chat
      ),
    }));
  },
}));
