import GamesList from "../components/GamesList.tsx";
import GamesFilter from "../components/GamesFilter.tsx";
import {useGamesOverview} from "../hooks/useGamesOverview.ts";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";

export function GamesOverview() {

    const { isLoading, isError, overview } = useGamesOverview();

    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [filteredPrice, setFilteredPrice] = useState<number>(0);

    useEffect(() => {
        if (overview && overview.length > 0) {
            const prices = overview.map(game => game.price);
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
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '80%',
                    height: '80%',
                    borderRadius: '10px',
                }}
            >
                <div
                    style={{
                        flex: 2,
                        marginRight: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                        overflowY: 'auto',
                    }}
                >
                    <div
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                            paddingBottom: '10px',
                        }}
                    >
                    </div>
                    <div
                        style={{
                            marginTop: '0',
                            position: 'sticky',
                            top: 0,
                        }}
                    >
                        <GamesList games={overview} filteredPrice={filteredPrice}/>
                    </div>
                </div>

                <div
                    style={{
                        flex: 1,
                        marginLeft: '1rem',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginTop: '5.8rem',
                        padding: '20px 0 0 0',
                    }}
                >
                    <GamesFilter
                        maxPrice={maxPrice}
                        minPrice={minPrice}
                        filteredPrice={filteredPrice}
                        setFilteredPrice={setFilteredPrice}
                    />
                </div>
            </div>
        </div>


    );
}
