export type IconType = {
  size?: number;
};

export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
};

export type ChatSession = {
  id: string;
  label: string;
  messages: Message[];
};
