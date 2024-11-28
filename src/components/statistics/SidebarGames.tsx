import {useState} from "react";
import {
    Drawer,
    IconButton,
    List,
    Typography,
    Box,
    Tooltip,
    Collapse,
    useMediaQuery,
    Theme,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Inbox,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";

interface GameProps {
    name: string;
    id: string;
}

interface SidebarGamesProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    games: GameProps[];
    onGameSelect: (game: GameProps) => void;
}

export default function SidebarGames({isOpen, toggleSidebar, games, onGameSelect}: SidebarGamesProps) {
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const sidebarWidth = isOpen ? (isMobile ? 180 : 270) : (isMobile ? 60 : 70);
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

    const handleSubmenuClick = () => {
        setOpenSubmenu(!openSubmenu);
    };

    const handleGameSelect = (game: GameProps) => {
        setSelectedGameId(game.id); // Set selected game
        onGameSelect(game);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isOpen ? 270 : 70,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: sidebarWidth,
                    overflowX: "hidden",
                    transition: "width 0.3s",
                    marginTop: isMobile ? 7.75 : 10,
                },
            }}
        >
            {/* Logo and Toggle Button */}
            <Box display="flex" alignItems="center" justifyContent={isOpen ? "space-between" : "center"} px={2} py={1}>
                {isOpen && (
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/8002/8002111.png"
                        alt="Game"
                        style={{width: isMobile ? 30 : 40, height: isMobile ? 30 : 40}}
                    />
                )}
                {isOpen && <Typography variant="h6">Games</Typography>}
                <IconButton onClick={toggleSidebar}>
                    <MenuIcon/>
                </IconButton>
            </Box>

            {/* Menu Items */}
            <List sx={{fontSize: isMobile ? 12 : 16}}>
                {isOpen && (
                    <Typography variant="subtitle1" sx={{pl: 2, my: 2}}>
                        Your Games
                    </Typography>
                )}
                {games.map((game) => (
                    <Tooltip key={game.id} title={game.name} placement="right" disableHoverListener={isOpen}>
                        <Box
                            onClick={() => handleGameSelect(game)} // Select game on click
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: isOpen ? 2 : 0,
                                py: 1.25,
                                cursor: "pointer",
                                justifyContent: isOpen ? "flex-start" : "center",
                                backgroundColor: selectedGameId === game.id ? "rgb(22 55 121)" : "transparent",
                                "&:hover": {zoom: '1.1'},
                                fontWeight: selectedGameId === game.id ? "bold" : "normal",
                                color: selectedGameId === game.id ? "white" : "inherit",
                            }}

                        >
                            <Inbox sx={{marginRight: isOpen ? 2 : 0}}/>
                            {isOpen && <Typography>{game.name}</Typography>}
                        </Box>
                    </Tooltip>
                ))}

                {isOpen && (
                    <Typography variant="subtitle1" sx={{pl: 2, mt: 2}}>
                        Favourites
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
}
