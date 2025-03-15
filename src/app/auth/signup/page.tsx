'use client'
import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter()
    return (
        <Stack height='100%' justifyContent='space-around' >
            <Stack gap={2}>
                <TextField label='username' />
                <TextField label='password' /></Stack>
            <Stack gap={2} alignItems='center'>
                <Button variant="contained" fullWidth onClick={() => router.push('/')}>sign up</Button>
            </Stack>
        </Stack>
    )
}