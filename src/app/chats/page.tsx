import { Button, Stack, Typography } from "@mui/material";

export default function ChatsList() {
    return (
        <Stack gap={2} height='100%'>
            <Stack p={2} borderRadius={2} gap={1} height='100%' justifyContent='space-between'>
                <Stack gap={1}>
                    <Stack bgcolor='lightgray' borderRadius={2} p={2}>
                        <Typography>asking for help installing software</Typography>
                        <Typography variant="caption">2025/02/24</Typography>
                    </Stack>
                    <Stack bgcolor='lightgray' borderRadius={2} p={2}>
                        <Typography>how to print the invoice?</Typography>
                        <Typography variant="caption">2025/02/24</Typography>
                    </Stack>
                    <Stack bgcolor='lightgray' borderRadius={2} p={2}>
                        <Typography>want a new feature</Typography>
                        <Typography variant="caption">2025/02/24</Typography>
                    </Stack></Stack>
                <Button variant="contained">New Chat</Button>
            </Stack>
        </Stack>
    )
}