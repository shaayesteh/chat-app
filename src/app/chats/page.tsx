"use client";

import { Button, Stack } from "@mui/material";
import ChatList from "./list/components/ChatList";
import { useRouter } from "next/navigation";

export default function ChatsPage() {
  const router = useRouter();
  return (
    <Stack height="100%" justifyContent="space-between" gap={3}>
      <ChatList />
      <Button variant="contained" onClick={() => router.push("chats/new")}>
        Start new chat
      </Button>
    </Stack>
  );
}
