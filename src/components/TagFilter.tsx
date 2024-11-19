import {Autocomplete, Box, Card, TextField, Typography} from "@mui/material";
import tags from "../constants/tags.ts";

function TagFilter() {

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem',
                backgroundColor: '#878c95',
                borderRadius: '0.5rem',
                boxShadow: 'none'
            }}>
            <Typography color="white" sx={{color: 'black'}}>
                TAGS
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '1rem',
                    gap: '8px',
                    flexWrap: 'wrap',
                }}>
                <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={tags}
                    defaultValue={[
                        tags[1], tags[2], tags[3],
                            tags[13], tags[12], tags[11]
                    ]}
                    renderInput={(params) => (
                        <TextField {...params} label="limitTags" placeholder="Favorites"/>
                    )}
                    sx={{
                        '& .MuiAutocomplete-tag:hover': {
                            backgroundColor: '#e0e0e0', // Optional: set custom hover effect
                        },
                    }}
                />
            </Box>

        </Card>
    );
}

export default TagFilter;
