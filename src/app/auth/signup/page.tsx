import { Button, Stack, TextField } from "@mui/material";

export default function Signup() {
    return (
        <Stack height='100%' justifyContent='space-around' >
            <Stack gap={2}>
                <TextField label='username' />
                <TextField label='password' /></Stack>
            <Stack gap={2} alignItems='center'>
                <Button variant="contained" fullWidth>sign up</Button>
            </Stack>
        </Stack>
    )
}