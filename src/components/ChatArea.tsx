import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";

export function ChatArea() {
    return (
        <Box
            sx={{
                height: '100%',          // Take full height of the parent container
                display: 'flex',         // Use flexbox for inner content
                flexDirection: 'column', // Ensure vertical layout
                overflowY: 'auto',       // Enable scrolling if needed
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography variant="body1" color="textSecondary">
                    {/* Example messages */}
                    <div style={{marginBottom: 8}}>Bot: Hello! How can I help you?</div>
                    <div style={{textAlign: 'right', marginBottom: 8}}>You: Hi there!</div>
                    {/* Map your messages here */}
                </Typography>
            </Paper>
        </Box>
    );
}