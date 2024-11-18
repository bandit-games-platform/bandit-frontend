import {ChatbotIcon} from "./ChatbotIcon.tsx";
import {Box} from "@mui/material";
import {FriendsIcon} from "./FriendsIcon.tsx";

export function StickyFooter() {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                zIndex: 1300,
            }}
        >
            {/* Chatbot Icon */}
            <ChatbotIcon/>

            {/* Friends Icon */}
            <FriendsIcon/>
        </Box>
    )
}