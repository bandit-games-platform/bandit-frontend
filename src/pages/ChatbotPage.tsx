import {Box, CircularProgress, Paper, TextField} from '@mui/material';
import {usePostInitialQuestion} from "../hooks/chatbot/usePostInitialQuestion.ts";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import theme from "../theme/theme.ts";
import SendIcon from "@mui/icons-material/Send";
import React, {useEffect, useState} from "react";

function formatChatbotResponse(response: string) {
    return response
        .replace(/\\n/g, '\n') // Replace escaped newlines with actual newlines
        .replace(/\\+/g, '')   // Remove stray backslashes
        .replace(/"/g, '')    // Remove quotation marks
        .trim()               // Trim leading/trailing whitespace
        .split('\n');
}

export function ChatbotPage() {
    // answer
    const {
        postInitialQuestion,
        answer,
        isPending,
        isError,
    } = usePostInitialQuestion();

    useEffect(() => {
        postInitialQuestion()
            .then(() => {
                // Optionally handle success
            })
            .catch((error) => {
                console.error("Failed to fetch the initial question:", error);
            });
    }, [postInitialQuestion]);


    // question
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Send the message to the chatbot (you might need to set up another mutation or API call here)
        console.log('Sending message:', message);
        setMessage(''); // Clear the input after sending
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSendMessage();
        }
    };

    if (isPending) {
        return (
            <CircularProgress color="inherit"/>
        )
    }

    if (isError || !answer) {
        return <div>Error fetching the answer from the Chatbot!</div>
    }

    const chatbotResponseLines = formatChatbotResponse(answer.text);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center horizontally
                height: 'calc(100vh - 64px)', // Adjust if your navbar height differs
                width: '80%',
                backgroundColor: 'background.default',
                padding: 2,
            }}
        >
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
                    <Typography variant="body1" color="textSecondary" component="div">
                        <strong>Chatbot:</strong>
                        {chatbotResponseLines.map((line, index) => (
                            <Typography
                                key={index}
                                variant="body1"
                                sx={{
                                    marginBottom: 1,
                                    color: 'text.primary',
                                }}
                            >
                                {line}
                            </Typography>
                        ))}
                    </Typography>
                </Paper>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2,
                }}
            >
                <TextField
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    variant="outlined"
                    onKeyDown={handleKeyPress}
                    sx={{flex: 1, marginRight: 1}}
                />
                <IconButton
                    aria-label="send message"
                    sx={{color: theme.palette.secondary.light}}
                    onClick={handleSendMessage}
                >
                    <SendIcon/>
                </IconButton>
            </Box>
        </Box>
    );
}