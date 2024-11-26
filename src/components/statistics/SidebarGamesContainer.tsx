import {useState} from "react";
import SidebarGames from "./SidebarGames";

interface Game {
    name: string;
    id: string;
}

interface SidebarGamesContainerProps {
    games: Game[];
}

export default function SidebarGamesContainer({games}: SidebarGamesContainerProps) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleGameSelect = (game: Game) => {
        console.log("Selected game:", game);
    };

    return (
        <SidebarGames
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            games={games}
            onGameSelect={handleGameSelect}
        />
    );
}
