import type { Message } from "./types";

interface OpenRouterMessage {
  role: "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function sendMessageToAPI(messages: Message[]): Promise<string> {
  // Проверяем, что все необходимые переменные окружения заданы
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL;
  const model = import.meta.env.VITE_OPENROUTER_MODEL;

  const apiMessages: OpenRouterMessage[] = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Error from API");
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response from API");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
