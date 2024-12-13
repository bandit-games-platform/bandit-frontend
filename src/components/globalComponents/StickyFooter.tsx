import {ChatbotIcon} from "./ChatbotIcon.tsx";
import {Box} from "@mui/material";
import {FriendsIcon} from "./FriendsIcon.tsx";
import {useState} from "react";
import FriendsSidebar from "../playerFriendsRelationship/FriendsSidebar.tsx";

export function StickyFooter() {
    const [isFriendsSidebarOpen, setIsFriendsSidebarOpen] = useState(false);

    const toggleFriendsSidebar = () => {
        setIsFriendsSidebarOpen(!isFriendsSidebarOpen);
    };

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
            <FriendsIcon onClick={toggleFriendsSidebar}/>

            {/* Friends Sidebar */}
            <FriendsSidebar
                isOpen={isFriendsSidebarOpen}
                toggleSidebar={toggleFriendsSidebar}
            />
        </Box>
    )
}