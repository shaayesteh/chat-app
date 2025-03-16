"use client";

import { useEffect, useState } from "react";
import { Stack, Typography, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

interface Chat {
  id: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    };
    fetchChats();
  }, []);

  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Stack gap={2} p={2} overflow="auto" height="100%">
      {loading ? (
        <Stack p={2} gap={2} overflow="auto">
          {Array.from(new Array(3)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={300}
              height={100}
              sx={{ bgcolor: "grey.400" }}
              animation="wave"
            />
          ))}
        </Stack>
      ) : chats.length > 0 ? (
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
            <Typography variant="caption" fontSize={10}>
              {new Date(chat.createdAt).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Typography>
          </Stack>
        ))
      ) : (
        <Stack
          height="100%"
          p={2}
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>No chats available</Typography>
        </Stack>
      )}
    </Stack>
  );
}
