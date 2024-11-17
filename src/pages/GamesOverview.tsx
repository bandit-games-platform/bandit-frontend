import GamesList from "../components/GamesList.tsx";
import GamesFilter from "../components/GamesFilter.tsx";
import {useGamesOverview} from "../hooks/useGamesOverview.ts";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import './GamesOverview.scss'


export function GamesOverview() {

    const { isLoading, isError, overview } = useGamesOverview();

    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [filteredPrice, setFilteredPrice] = useState<number>(0);

    useEffect(() => {
        if (overview && overview.length > 0) {
            const prices = overview.map(game => game.currentPrice);
            const lowestPrice = Math.min(...prices);
            const highestPrice = Math.max(...prices);
            setMinPrice(lowestPrice);
            setMaxPrice(highestPrice);
            setFilteredPrice(highestPrice);
        }
    }, [overview]);

    if (isLoading) {
        return <CircularProgress color="inherit" />;
    }

    if (isError || !overview) {
        return <div>Whoops: Something went wrong!</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Left Side: GamesList */}
            <div style={{ flex: 1, marginRight: '1rem' }}>
                <GamesList games={overview} filteredPrice={filteredPrice} />
            </div>

            {/* Right Side: filters */}
            <div style={{ flex: 1, marginLeft: '1rem' }}>
                <GamesFilter
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    filteredPrice={filteredPrice}
                    setFilteredPrice={setFilteredPrice}
                />
            </div>
        </div>
    );
}
