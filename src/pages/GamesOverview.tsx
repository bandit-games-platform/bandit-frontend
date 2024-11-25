import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import GamesList from "../components/GamesList.tsx";
import GamesFilter from "../components/GamesFilter.tsx";
import {useDebouncedSearch} from "../hooks/gameRegistry/useDebouncedSearch.ts";
import {useGamesOverviewByTitleLikeAndPriceBelow} from "../hooks/gameRegistry/useGamesOverview.ts";


export function GamesOverview() {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(150);
    const [searchParams, setSearchParams] = useSearchParams();

    const urlSearchTerm = searchParams.get("searchTerm") || "";
    const urlPrice = searchParams.get("price") ? parseInt(searchParams.get("price")!, 10) : 150;

    const [searchTerm, setSearchTerm] = useState<string>(urlSearchTerm);
    const [filteredPrice, setFilteredPrice] = useState<number>(urlPrice);

    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

    const {isLoading, isError, overview} = useGamesOverviewByTitleLikeAndPriceBelow(debouncedSearchTerm, filteredPrice);

    useEffect(() => {

        if (overview && overview.length > 0) {
            const prices = overview.map(game => game.price);
            const lowestPrice = Math.min(...prices);
            const highestPrice = Math.max(...prices);
            setMinPrice(lowestPrice);
            setMaxPrice(highestPrice);
            setFilteredPrice(filteredPrice);
        }

        if (debouncedSearchTerm) {
            setSearchParams({...Object.fromEntries(searchParams), searchTerm: debouncedSearchTerm});

        } else {
            setSearchParams({...Object.fromEntries(searchParams), searchTerm: ""});
        }
        if (filteredPrice !== urlPrice) {
            setSearchParams({...Object.fromEntries(searchParams), price: filteredPrice.toString()});
        }
    }, [debouncedSearchTerm, filteredPrice, setSearchParams, searchParams, urlPrice]);


    if (isLoading) {
        return <CircularProgress color="inherit"/>;
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
                            marginTop: '0',
                            position: 'sticky',
                            top: 0,
                        }}
                    >
                        <GamesList
                            games={overview}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
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
                    {/* Pass setFilteredPrice to GamesFilter to update the parent */}
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
