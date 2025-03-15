"use client";

import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface Chat {
  id: string;
  title: string;
  category: string;
  description: string;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("/api/chats");
      if (response.ok) {
        const data: Chat[] = await response.json();
        setChats(data);
      } else {
        console.error("Failed to fetch chats");
      }
    };
    fetchChats();
  }, []);

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Stack gap={2} p={2} overflow="auto">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <Stack
            key={chat.id}
            p={2}
            border="1px solid #ccc"
            borderRadius="8px"
            onClick={() => router.push(`chats/${chat.id}`)}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="h6">{truncate(chat.title, 30)}</Typography>
            <Typography variant="body2">
              {truncate(chat.description, 140)}
            </Typography>
            <Typography mt={2} variant="caption">
              {chat.category}
            </Typography>
          </Stack>
        ))
      ) : (
        <Typography>No chats available</Typography>
      )}
    </Stack>
  );
}
