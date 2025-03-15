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

interface FormData {
  title: string;
  category: string;
  description: string;
}

export default function NewChatForm() {
  const { handleSubmit, control } = useForm<FormData>();
  const [category, setCategory] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push("/chats");
    } else {
      // handle error
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
            render={({ field }) => <TextField {...field} label="title" />}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    field.onChange(e);
                  }}
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
            render={({ field }) => (
              <TextField {...field} label="description" multiline rows={6} />
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
