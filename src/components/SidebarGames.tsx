import React from "react";
import {
    Drawer,
    IconButton,
    List,
    Typography,
    Box,
    Tooltip,
    Collapse,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Inbox,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";

interface Game {
    name: string;
    id: number;
}

interface SidebarGamesProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    games: Game[];
    onGameSelect: (game: Game) => void; // Callback to select game
}

export default function SidebarGames({isOpen, toggleSidebar, games, onGameSelect}: SidebarGamesProps) {
    const [openSubmenu, setOpenSubmenu] = React.useState(false);

    const handleSubmenuClick = () => {
        setOpenSubmenu(!openSubmenu);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isOpen ? 270 : 70,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: isOpen ? 270 : 70,
                    overflowX: "hidden",
                    transition: "width 0.3s",
                    marginTop: 9,
                },
            }}
        >
            {/* Logo and Toggle Button */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent={isOpen ? "space-between" : "center"}
                px={2}
                py={1}
            >
                {isOpen && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8002/8002111.png"
                        alt="Game"
                        style={{width: 40, height: 40}}
                    />
                )}
                {isOpen && <Typography variant="h6">Games</Typography>}
                <IconButton onClick={toggleSidebar}>
                    <MenuIcon/>
                </IconButton>
            </Box>

            {/* Menu Items */}
            <List>
                {isOpen && (
                    <Typography variant="subtitle1" sx={{pl: 2, mt: 2}}>
                        GAMES
                    </Typography>
                )}
                {games.map((game) => (
                    <Tooltip
                        key={game.id}
                        title={game.name}
                        placement="right"
                        disableHoverListener={isOpen}
                    >
                        <Box
                            onClick={() => onGameSelect(game)} // Select game on click
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: isOpen ? 2 : 0,
                                py: 1,
                                cursor: "pointer",
                                justifyContent: isOpen ? "flex-start" : "center",
                                "&:hover": {backgroundColor: "rgba(0,0,0,0.1)"},
                            }}
                        >
                            <Inbox sx={{marginRight: isOpen ? 2 : 0}}/>
                            {isOpen && <Typography>{game.name}</Typography>}
                        </Box>
                    </Tooltip>
                ))}

                {isOpen && (
                    <Typography variant="subtitle1" sx={{pl: 2, mt: 2}}>
                        OTHERS
                    </Typography>
                )}
                <Tooltip title="Menu Level" placement="right" disableHoverListener={isOpen}>
                    <Box
                        onClick={handleSubmenuClick}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: isOpen ? 2 : 0,
                            py: 1,
                            cursor: "pointer",
                            justifyContent: isOpen ? "flex-start" : "center",
                            "&:hover": {backgroundColor: "rgba(0,0,0,0.1)"},
                        }}
                    >
                        <Inbox sx={{marginRight: isOpen ? 2 : 0}}/>
                        {isOpen && <Typography>Menu Level</Typography>}
                        {isOpen && (openSubmenu ? <ExpandLess/> : <ExpandMore/>)}
                    </Box>
                </Tooltip>
                <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: isOpen ? 4 : 0,
                            py: 1,
                            cursor: "pointer",
                            justifyContent: isOpen ? "flex-start" : "center",
                            "&:hover": {backgroundColor: "rgba(0,0,0,0.1)"},
                        }}
                    >
                        <Typography>Submenu Item</Typography>
                    </Box>
                </Collapse>
            </List>
        </Drawer>
    );
};
