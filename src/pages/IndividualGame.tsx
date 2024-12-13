import {ImageCarousel} from "../components/ImageCarousel.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useGameDetails} from "../hooks/gameRegistry/useGameDetails.ts";
import {Box, Button, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {ArrowBack} from "@mui/icons-material";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../components/globalComponents/ErrorComponent.tsx";
import {usePlayerLibrary} from "../hooks/player/usePlayerLibrary.ts";
import {PurchaseConfirmDialog} from "../components/storefront/PurchaseConfirmDialog.tsx";
import {useState} from "react";

export function IndividualGame() {
    const navigate = useNavigate();
    const {gameId = ''} = useParams();
    const [open, setOpen] = useState(false);
    const {game, isLoading: detailsLoading, isError: detailsError} = useGameDetails(gameId);
    const {library, isLoading: libraryLoading, isError: libraryError} = usePlayerLibrary();

    if (detailsLoading || libraryLoading) {
        return <LoadingComponent/>
    }

    if (detailsError || libraryError || !game || !library) {
        return <ErrorComponent/>
    }

    let gameInLibrary = false;
    for (const libraryItem of library) {
        if (libraryItem.gameId == gameId) {
            gameInLibrary = true;
            break;
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleGoToCheckout = () => {
        navigate(`/store/${gameId}/purchase/checkout`);
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
                            <Button
                                sx={{color: (theme) => theme.palette.secondary.main}}
                                onClick={() => window.history.back()}
                            >
                                <ArrowBack/>
                            </Button>
                            <h1>{game.title}</h1>
                        </Stack>
                    </Grid>

                    <Grid sx={{marginRight: "5%"}}>
                        {!gameInLibrary && game.price > 0 && (
                            <Stack direction={"row"} spacing={2}>
                                <h2>€{game.price}</h2>
                                <Button
                                    sx={{color: (theme) => theme.palette.secondary.main}}
                                    onClick={handleClickOpen}
                                >
                                    Buy now
                                </Button>
                            </Stack>
                        )}
                        {!gameInLibrary && game.price <= 0 && (
                            <Stack direction={"row"} spacing={2}>
                                <h2>Free</h2>
                                <Button
                                    sx={{color: (theme) => theme.palette.secondary.main}}
                                    onClick={handleClickOpen}
                                >
                                    Add to Library
                                </Button>
                            </Stack>
                        )}
                        {gameInLibrary && (
                            <Button
                                disabled={true}
                                sx={{color: (theme) => theme.palette.secondary.main}}
                            >
                                Game In Library
                            </Button>
                        )}
                    </Grid>
                </Grid>

                <h3 style={{marginLeft: "5%"}}>By: {game.developer.studioName}</h3>

                {game.screenshots.length > 0 && (<ImageCarousel images={game.screenshots}/>)}

                <h3>About:</h3>
                <p>{game.description}</p>
            </Box>

            <PurchaseConfirmDialog game={game} open={open} handleClose={handleClose}
                                   handleConfirm={handleGoToCheckout}/>
        </Box>
    )
}


