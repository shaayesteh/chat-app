"use client";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormData {
  title: string;
  category: string;
  description: string;
}

const schema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(140, "Title must be at most 140 characters"),
  category: z.string().nonempty("Category is required"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

export default function NewChatForm() {
  const { handleSubmit, control, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [category, setCategory] = useState("");
  const router = useRouter();
  const description = watch("description", "");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const chatData = { ...data, createdAt: new Date().toISOString() };
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatData),
    });
    if (response.ok) {
      router.push(`/chats/${(await response.json()).id}`);
    } else {
      alert("Failed to create chat");
    }
  };

  return (
    <Stack height="100%">
      <Stack
        component="form"
        height="100%"
        justifyContent="space-between"
        p={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="title"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    field.onChange(e);
                  }}
                  error={!!fieldState.error}
                >
                  <MenuItem value="general">general</MenuItem>
                  <MenuItem value="finance">finance</MenuItem>
                  <MenuItem value="technical">technical</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  label="description"
                  multiline
                  rows={6}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                />
                <Typography variant="caption" color="textSecondary">
                  {description.length}/500
                </Typography>
              </>
            )}
          />
        </Stack>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
