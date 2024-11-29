import {Box, Drawer, Typography, IconButton, useTheme, Divider} from "@mui/material";
import {Chat} from "@mui/icons-material";
import FriendsSearchBar from "./FriendsSearchBar.tsx";
import {NotificationAlarm} from "./NotificationAlarm.tsx";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function FriendsSidebar({isOpen, toggleSidebar}: SidebarProps) {
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleSidebar}
            sx={{
                [`& .MuiDrawer-paper`]: {
                    width: 290,
                    overflowX: "hidden",
                    transition: "width 0.3s ease-in-out", // Smooth transition for opening/closing
                    height: 'calc(99.5vh - 66px)',
                    top: '66px',
                    position: 'fixed',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Gradient background
                    color: theme.palette.text.primary,
                    borderRadius: '10px 0 0 10px', // Rounded corners
                    boxShadow: '4px 0px 15px rgba(0, 0, 0, 0.3)', // Soft shadow for separation
                    paddingTop: '1.2em',
                    paddingBottom: '1em',
                },
            }}
        >
            {/* Sidebar Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
                <Typography variant="h6" sx={{color: theme.palette.text.primary, fontWeight: 'bold'}}>
                    Friends
                </Typography>

                <NotificationAlarm onClick={toggleSidebar}/>
            </Box>

            {/* Sidebar Divider */}
            <Divider sx={{marginY: 1, backgroundColor: theme.palette.divider}}/>

            <FriendsSearchBar/>

            {/* Sidebar Content */}
            <Box px={2} py={1} sx={{overflowY: 'auto'}}>
                <Typography variant="body1" sx={{color: theme.palette.text.primary, fontSize: '1rem'}}>
                    This is a blank sidebar. Add your content here.
                </Typography>
                {/* Add some example content or features */}
                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 2}}>
                    <IconButton sx={{color: theme.palette.text.primary, marginRight: 1}}>
                        <Chat/>
                    </IconButton>
                    <Typography variant="body2" sx={{color: theme.palette.text.primary}}>
                        Start a Chat
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}
