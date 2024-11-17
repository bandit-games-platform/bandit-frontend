import {Autocomplete, Box, Card, TextField, Typography} from "@mui/material";
import PriceFilter from "./PriceFilter.tsx";
import tags from "../constants/tags.ts";

interface GamesFilterProps {
    maxPrice: number;
    minPrice: number;
    filteredPrice: number;
    setFilteredPrice: (value: number) => void;
}

function GamesFilter({ maxPrice,minPrice, filteredPrice, setFilteredPrice }: GamesFilterProps) {
    return (
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "2rem",
            backgroundColor: "#878c95",
            borderRadius: "0.5rem",
            boxShadow: "none",
            width: "20vw",
            height: "auto",
            gap: "1rem"
        }}>
            {/* Tags */}
            <Box sx={{ width: "100%" }}>
                <Typography color="black" variant="h6" sx={{ marginBottom: "0.5rem" }}>
                    TAGS
                </Typography>
                <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={tags}
                    defaultValue={[
                        tags[1], tags[2], tags[3], tags[13], tags[12], tags[11],
                    ]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Tags"
                            placeholder="Favorites"
                            sx={{
                                borderRadius: "4px",
                            }}
                        />
                    )}
                    sx={{
                        width: "100%",
                        "& .MuiAutocomplete-tag:hover": {
                            backgroundColor: "#e0e0e0",
                        },
                    }}
                />
            </Box>
            {/* Price  */}
            <Box sx={{ width: "100%" }}>
                <Typography color="black" variant="h6" sx={{ marginBottom: "0.5rem" }}>
                    PRICE
                </Typography>
                <PriceFilter
                    lowestPrice={minPrice}
                    highestPrice={maxPrice}
                    filteredPrice={filteredPrice}
                    setFilteredPrice={setFilteredPrice}
                />
            </Box>
        </Card>
    );
}

export default GamesFilter;
