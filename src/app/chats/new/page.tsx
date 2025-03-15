"use client";

import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NewChatForm from "./components/newChatForm";

export default function NewChat() {
  const router = useRouter();
  return (
    <Stack height="100%">
      <Stack
        direction="row"
        onClick={() => router.push("/")}
        sx={{ cursor: "pointer" }}
        p={2}
      >
        <ChevronLeftIcon color="primary" />
        <Typography color="primary">chats</Typography>
      </Stack>
      <NewChatForm />
    </Stack>
  );
}
