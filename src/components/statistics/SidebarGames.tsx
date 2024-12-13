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
    ExpandLess,
    ExpandMore, Favorite, VideogameAsset,
} from "@mui/icons-material";
import {Game} from "../../model/gameRegistry/Game.ts";

interface SidebarGamesProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    games: Game[];
    favouriteGames: Game[];
    onGameSelect: (game: Game) => void;
}

export default function SidebarGames({isOpen, toggleSidebar, games, favouriteGames, onGameSelect}: SidebarGamesProps) {
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const sidebarWidth = isOpen ? (isMobile ? 180 : 270) : (isMobile ? 60 : 70);
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

    const handleSubmenuClick = () => {
        setOpenSubmenu(!openSubmenu);
    };

    const handleGameSelect = (game: Game) => {
        setSelectedGameId(game.id);
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
                    <Tooltip key={game.id} title={game.title} placement="right" disableHoverListener={isOpen}>
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
                            <VideogameAsset sx={{
                                marginRight: isOpen ? 2 : 0,
                                color: "rgba(255, 105, 180, 1)",
                            }}/>
                            {isOpen && <Typography>{game.title}</Typography>}
                        </Box>
                    </Tooltip>
                ))}

                {isOpen && (
                    <>
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
                                <Favorite sx={{
                                    marginRight: isOpen ? 2 : 0,
                                    color: "rgb(236,11,63)"
                                }}/>
                                {isOpen && <Typography>Favourites</Typography>}
                                {isOpen && (openSubmenu ? <ExpandLess/> : <ExpandMore/>)}
                            </Box>
                        </Tooltip>
                        <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                            {favouriteGames.map((game) => (
                                <Box
                                    key={game.id}
                                    onClick={() => handleGameSelect(game)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        px: isOpen ? 4 : 0,
                                        py: 1,
                                        cursor: "pointer",
                                        justifyContent: isOpen ? "flex-start" : "center",
                                        backgroundColor: selectedGameId === game.id ? "rgb(22 55 121)" : "transparent",
                                        "&:hover": {backgroundColor: "rgba(0,0,0,0.1)"},
                                        fontWeight: selectedGameId === game.id ? "bold" : "normal",
                                        color: selectedGameId === game.id ? "white" : "inherit",
                                    }}
                                >
                                    <Favorite sx={{
                                        marginRight: isOpen ? 2 : 0,
                                        color: "rgba(255, 165, 0, 1)",
                                    }}/>
                                    <Typography>{game.title}</Typography>
                                </Box>
                            ))}
                        </Collapse>
                    </>
                )}

            </List>
        </Drawer>
    );
}
