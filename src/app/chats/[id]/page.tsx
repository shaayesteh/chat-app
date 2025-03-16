"use client";
import { Stack, Typography, Skeleton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";

export default function Chat() {
  const { id } = useParams();
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`/api/chats/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCreatedAt(data.createdAt);
        setDescription(data.description);
        setLoading(false);
      } else {
        alert("Failed to fetch chat description");
      }
    };
    fetchChat();
  }, [id]);

  return (
    <Stack p={2} height="100%">
      <Stack
        direction="row"
        onClick={() => router.push("/")}
        sx={{ cursor: "pointer" }}
        mb={2}
      >
        <ChevronLeftIcon color="primary" />
        <Typography color="primary">chats</Typography>
      </Stack>
      <Stack alignItems="end" height="100%" spacing={2}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="80%"
            height={60}
            sx={{ borderRadius: 2 }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            {description}
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" width="40%" />
        ) : (
          <Typography variant="caption" color="textSecondary">
            {new Date(createdAt).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
