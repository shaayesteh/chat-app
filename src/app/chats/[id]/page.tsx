"use client";
import { Stack, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Chat() {
  const { id } = useParams();
  const router = useRouter();
  return (
    <Stack p={2} height="100%">
      <Stack
        direction="row"
        onClick={() => router.push("/")}
        sx={{ cursor: "pointer" }}
      >
        <ChevronLeftIcon color="primary" />
        <Typography color="primary">chats</Typography>
      </Stack>
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography>this is chat #{id}</Typography>
      </Stack>
    </Stack>
  );
}
