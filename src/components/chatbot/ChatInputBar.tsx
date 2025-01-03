import IconButton from "@mui/material/IconButton";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../../theme/theme.ts";
import SendIcon from "@mui/icons-material/Send";
import {useState} from "react";

interface ChatInputBarProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInputBar({onSend, disabled}: ChatInputBarProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (inputValue.trim()) {
            onSend(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '5px',
            }}
        >
            <TextField
                fullWidth
                placeholder="Type your message..."
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
                disabled={disabled}
                sx={{
                    flex: 1,
                    marginRight: 1,
                }}
            />
            <IconButton sx={{color: theme.palette.secondary.light}} onClick={handleSend}>
                <SendIcon/>
            </IconButton>
        </Box>
    );
}

