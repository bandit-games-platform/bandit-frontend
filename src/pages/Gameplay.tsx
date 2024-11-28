import {Alert, Box, Skeleton, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import Container from "@mui/material/Container";
import {useParams} from "react-router-dom";
import {useGameDetails} from "../hooks/gameRegistry/useGameDetails.ts";

export function Gameplay() {
    const [tab, setTab] = useState(0);
    const {gameId = ''} = useParams();
    const {game, isLoading, isError} = useGameDetails(gameId);
    const [iframeError, setIframeError] = useState(false);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}>
                <Box display="flex" flexDirection="row" gap={1} m={1}>
                    <Skeleton variant="rectangular" width={110} height={48} />
                    <Skeleton variant="rectangular" width={110} height={48} />
                    <Skeleton variant="rectangular" width={110} height={48} />
                </Box>
                <Container sx={{height: 0.8, marginY: 'auto'}}>
                    <Skeleton variant="rounded" height="100%" />
                </Container>
            </Box>
        );
    }

    if (isError || !game || iframeError) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">
                    {iframeError ?
                        "We could not load this game for you at this time. Please check back later!"
                    :
                        "Oh no! It appears the game server cannot be reached at the moment #blamethegamedevs"
                    }
                </Alert>
            </Box>
        );
    }

    const handleChange = (_: SyntheticEvent, newTab: number) => {
        setTab(newTab);
    }

    const handleIframeError = (event) => {
        console.log(event)
        setIframeError(true);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh", // Full viewport height
            }}>
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Game"/>
                <Tab label="Rules"/>
                <Tab label="Invite" disabled/>
            </Tabs>

            {tab === 0 && <Box sx={{
                flex: 1, // Take up the remaining space
                overflow: "hidden", // Prevent scrollbars
            }}>
                <iframe src={game.currentHost}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            backgroundColor: "transparent"
                        }}
                        onError={handleIframeError}
                        onLoad={(event) => console.log(event)}
                />
            </Box>}

            {tab === 1 && <Container>
                Rules chatbot here
            </Container>}

            {tab === 2 && <Container>
                Invite players here
            </Container>}
        </Box>
    );
}
