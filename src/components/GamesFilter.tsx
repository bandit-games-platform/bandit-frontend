import { Autocomplete, Box, Card, TextField, Typography } from "@mui/material";
import tags from "../constants/tags.ts";
import PriceFilter from "./PriceFilter.tsx";

function GamesFilter() {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column", // Flex column for vertical stacking
                alignItems: "flex-start",
                padding: "2rem",
                backgroundColor: "#878c95",
                borderRadius: "0.5rem",
                boxShadow: "none",
                width: "20vw",
                height: "auto",
                gap: "1rem", // Add spacing between child elements
            }}
        >
            {/* Tags Section */}
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

            {/* Price Section */}
            <Box sx={{ width: "100%" }}>
                <Typography color="black" variant="h6"
                            sx={{ marginBottom: "0.5rem"
                                 }}>
                    PRICE
                </Typography>
                <PriceFilter lowestPrice={0} highestPrice={999} />
            </Box>
        </Card>
    );
}

export default GamesFilter;
