import IconButton from "@mui/material/IconButton";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import theme from "../theme/theme.ts";
import SendIcon from "@mui/icons-material/Send";

export function MessageInputBar() {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 2,
            }}
        >
            <TextField
                fullWidth
                placeholder="Type your message..."
                variant="outlined"
                sx={{
                    flex: 1,
                    marginRight: 1,
                }}
            />
            <IconButton aria-label="send message"
                        sx={{color: theme.palette.secondary.light}}>
                <SendIcon/>
            </IconButton>
        </Box>
    );
}

