import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {CircularProgress, Box, Typography, TextField, useMediaQuery} from "@mui/material";
import GamesList from "../components/GamesList.tsx";
import {useDebouncedSearch} from "../hooks/gameRegistry/useDebouncedSearch.ts";
import {useGamesOverviewByTitleLikeAndPriceBelow} from "../hooks/gameRegistry/useGamesOverview.ts";
import GamesFilter from "../components/GamesFilter.tsx";
import {useTheme} from "@mui/material/styles";

export function GamesOverview() {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(150);
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const urlSearchTerm = searchParams.get("searchTerm") || "";
    const urlPrice = searchParams.get("price") ? parseInt(searchParams.get("price")!, 10) : 150;
    const [searchTerm, setSearchTerm] = useState<string>(urlSearchTerm);
    const [filteredPrice, setFilteredPrice] = useState<number>(urlPrice);
    const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);
    const {isLoading, isError, overview} = useGamesOverviewByTitleLikeAndPriceBelow(debouncedSearchTerm, filteredPrice);

    useEffect(() => {
        if (overview && overview.length > 0) {
            const prices = overview.map(game => game.price);
            setMinPrice(Math.min(...prices));
            setMaxPrice(Math.max(...prices));
        }

        setSearchParams({
            ...Object.fromEntries(searchParams),
            searchTerm: debouncedSearchTerm || "",
            price: filteredPrice.toString(),
        });
    }, [debouncedSearchTerm, filteredPrice, setSearchParams, searchParams, overview]);

    if (isLoading) {
        return <CircularProgress color="inherit"/>;
    }

    if (isError || !overview) {
        return <div>Whoops: Something went wrong!</div>;
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? 2 : 3,
            gap: 2,
            textAlign: 'center',
            marginTop: 0.1,
        }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontWeight: 600,
                    color: 'secondary.main',
                    marginBottom: 2,
                    fontSize: isMobile ? '1.5rem' : '2rem',
                }}
            >
                Explore Games
            </Typography>


            {/* Search Box */}
            <TextField
                id="search-game"
                label="Search games..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{
                    maxWidth: '600px',
                    marginBottom: 2,
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "0.5rem",
                        backgroundColor: "background.paper",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.light",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main",
                    },
                    "& .MuiInputLabel-root": {
                        color: "text.secondary",
                    },
                }}
            />

            {/*Filter*/}
            <Box>
                <GamesFilter
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    filteredPrice={filteredPrice}
                    setFilteredPrice={setFilteredPrice}
                />
            </Box>

            {/* Games List Section */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '1250px',
                maxHeight: '550px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: 8,  // Width of the scrollbar
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'white',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'secondary.dark',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'secondary.light',
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    position: 'relative',
                    flexDirection: isMobile ? 'column' : 'row',
                }}>
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <GamesList games={overview}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}