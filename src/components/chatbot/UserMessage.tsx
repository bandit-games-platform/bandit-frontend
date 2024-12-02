import {Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface UserMessageProps {
    text?: string;
}

export function UserMessage({text}: UserMessageProps) {
    return (
        <Box sx={{display: "flex", mb: 2.5, justifyContent: "flex-end"}}>
            <Paper
                elevation={4}
                sx={{
                    padding: 2,
                    borderRadius: "15px",
                    backgroundColor: "secondary.dark",
                    maxWidth: "80%",
                    width: "auto",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    boxShadow: `0px 7px 4px rgba(0, 0, 0, 0.5)`,
                }}
            >
                <Typography variant="body1" sx={{color: "white", fontSize: "14px"}}>
                    {text}
                </Typography>
            </Paper>
        </Box>
    );
}