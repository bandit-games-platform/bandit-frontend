import {ImageCarousel} from "../components/ImageCarousel.tsx";
import {useParams} from "react-router-dom";
import {useGameDetails} from "../hooks/useGameDetails.ts";
import {Box, Button, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ArrowBack} from "@mui/icons-material";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";

export function IndividualGame() {
    const {gameId = ''} = useParams();
    const {game, isLoading, isError} = useGameDetails(gameId);

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (isError || !game) {
        return <ErrorComponent/>
    }

    return (
        <Box>
            <Box sx={{
                marginLeft: "5%",
                marginTop: "2%",
                marginRight: "5%",
            }}>
                <Grid container justifyContent={"space-between"}>
                    <Grid>
                        <Stack direction={"row"} spacing={2}>
                            <Button>
                                <ArrowBack/>
                            </Button>
                            <h1>{game.title}</h1>
                        </Stack>
                    </Grid>

                    <Grid sx={{marginRight: "5%"}}>
                        {game.price > 0 && (
                            <Stack direction={"row"} spacing={2}>
                                <h2>€{game.price}</h2>
                                <Button>Buy now</Button>
                            </Stack>
                        )}
                        {game.price <= 0 && (
                            <Stack direction={"row"} spacing={2}>
                                <h2>Free</h2>
                                <Button>Add to Library</Button>
                            </Stack>
                        )}
                    </Grid>
                </Grid>

                <h3 style={{marginLeft: "5%"}}>By: {game.developer.studioName}</h3>

                {game.screenshots.length > 0 && (<ImageCarousel images={game.screenshots}/>)}

                <h3>About:</h3>
                <p>{game.description}</p>
            </Box>
        </Box>
    )
}


