import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Typography, TextField, useMediaQuery} from "@mui/material";
import GamesList from "../components/storefront/GamesList.tsx";
import {useDebouncedSearch} from "../hooks/gameRegistry/useDebouncedSearch.ts";
import {useGamesOverviewByTitleLikeAndPriceBelow} from "../hooks/gameRegistry/useGamesOverview.ts";
import GamesFilter from "../components/storefront/GamesFilter.tsx";
import {useTheme} from "@mui/material/styles";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../components/globalComponents/ErrorComponent.tsx";

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

        if (debouncedSearchTerm) {
            setSearchParams({...Object.fromEntries(searchParams), searchTerm: debouncedSearchTerm});

        } else {
            setSearchParams({...Object.fromEntries(searchParams), searchTerm: ""});
        }
        if (filteredPrice !== urlPrice) {
            setSearchParams({...Object.fromEntries(searchParams), price: filteredPrice.toString()});
        }

    }, [debouncedSearchTerm, filteredPrice, setSearchParams, searchParams, urlPrice, overview]);

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (isError || !overview) {
        return <ErrorComponent/>
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? 2 : 3,
            gap: isMobile ? 0.2 : 2,
            textAlign: 'left',
            marginTop: 0.1,
        }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontWeight: 600,
                    color: 'secondary.main',
                    marginBottom: isMobile ? 0.2 : 2,
                    fontSize: isMobile ? '1.5rem' : '2rem',
                }}
            >
                Explore Games
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", sm: "row"},
                    gap: isMobile ? 3 : 1,
                    alignItems: "center",
                    marginBottom: isMobile ? 0.1 : 2,
                    width: isMobile ? "90%" : "60%",
                }}
            >
                {/* Left Spacer - 10% */}
                <Box
                    sx={{
                        flex: {xs: "1 1 100%", sm: "0 1 10%"},
                    }}
                ></Box>

                {/* Search Box - 60% */}
                <Box
                    sx={{
                        flex: {xs: "1 1 100%", sm: "0 1 60%"},
                    }}
                >
                    <TextField
                        id="search-game"
                        label="Search games..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                        sx={{
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
                                color: "white"
                            },
                            "& .MuiInputLabel-root": {
                                color: "text.secondary",
                            },
                        }}
                    />
                </Box>

                {/* Right Slider - 30% */}
                <Box
                    sx={{
                        flex: {xs: "1 1 100%", sm: "0 1 30%"},
                        maxWidth: '60em'
                    }}
                >
                    <GamesFilter
                        maxPrice={maxPrice}
                        minPrice={minPrice}
                        filteredPrice={filteredPrice}
                        setFilteredPrice={setFilteredPrice}
                    />
                </Box>
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
                    width: 8,
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