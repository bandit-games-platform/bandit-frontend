import {Box, Drawer, Typography, IconButton, useTheme, Divider} from "@mui/material";
import {Chat} from "@mui/icons-material";
import FriendsSearchBar from "./FriendsSearchBar.tsx";
import {NotificationAlarm} from "./NotificationAlarm.tsx";
import {useState} from "react";
import NotificationSection from "./NotificationSection.tsx";
import {usePendingReceivedFriendsInvite} from "../../hooks/player/usePendingReceivedFriendsInvite.ts";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function FriendsSidebar({isOpen, toggleSidebar}: SidebarProps) {
    const theme = useTheme();
    const [isNotificationView, setNotificationView] = useState(false);
    const {pendingReceivedFriendInvite} = usePendingReceivedFriendsInvite();

    const handleNotificationClick = () => {
        setNotificationView(!isNotificationView);
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleSidebar}
            sx={{
                [`& .MuiDrawer-paper`]: {
                    width: 290,
                    overflowX: "hidden",
                    transition: "width 0.3s ease-in-out",
                    height: 'calc(99.5vh - 66px)',
                    top: '66px',
                    position: 'fixed',
                    background: `linear-gradient(135deg, rgb(96 27 71), rgb(16 3 45))`,
                    color: theme.palette.text.primary,
                    borderRadius: '10px 0 0 10px',
                    boxShadow: '4px 0px 15px rgba(0, 0, 0, 0.3)',
                    paddingTop: '0.5em',
                    paddingBottom: '0.5em',
                },
            }}
        >
            {/* Sidebar Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
                <Typography variant="h6" sx={{color: theme.palette.text.primary, fontWeight: 'bold'}}>
                    Friends
                </Typography>

                <NotificationAlarm
                    onClick={handleNotificationClick}
                    isNotificationView={isNotificationView}
                    notificationCount={pendingReceivedFriendInvite ? pendingReceivedFriendInvite.length : 0}
                />
            </Box>

            {/* Sidebar Divider */}
            <Divider sx={{marginY: 1, backgroundColor: theme.palette.divider}}/>

            {isNotificationView ? (
                <NotificationSection/>
            ) : (
                // Default Sidebar Content
                <>
                    <FriendsSearchBar/>
                    <Box px={2} py={1} sx={{overflowY: 'auto'}}>
                        <Typography variant="body1"
                                    sx={{color: theme.palette.text.primary, fontSize: '1rem', paddingTop: '1em'}}>
                            Extra space...Just because.
                        </Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', marginTop: 2}}>
                            <IconButton sx={{color: theme.palette.text.primary, marginRight: 1}}>
                                <Chat/>
                            </IconButton>
                            <Typography variant="body2" sx={{color: theme.palette.text.primary}}>
                                Start a Chat
                            </Typography>
                        </Box>
                    </Box>
                </>
            )}
        </Drawer>
    );
}