import {Alert, Box, Skeleton, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useContext, useState} from "react";
import Container from "@mui/material/Container";
import {useParams, useSearchParams} from "react-router-dom";
import {useGameDetails} from "../hooks/gameRegistry/useGameDetails.ts";
import {ConfirmedBackoutButton} from "../components/ConfirmedBackoutButton.tsx";
import SecurityContext from "../context/SecurityContext.ts";
import {ChatbotTab} from "../components/chatbot/ChatbotTab.tsx";
import InviteTab from "../components/playerFriendsRelationship/InviteTab.tsx";
import {useCanInviteToLobby} from "../hooks/gameplay/useCanInviteToLobby.ts";

const modalProps = {
    confirmTitle: "Leave Game?",
    confirmDescription: "The current game state may be lost. This match might be counted as a loss for you.",
    confirmAction: "Leave"
}

export function Gameplay() {
    const [tab, setTab] = useState(0);
    const {gameId = ''} = useParams();
    const {game, isLoading, isError} = useGameDetails(gameId);
    const {loggedInUserId} = useContext(SecurityContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [lobbyId, setLobbyId] = useState<string | undefined>(undefined);
    const {canInvite} = useCanInviteToLobby(lobbyId);


    const library = "/library?selected=" + gameId;

    if (isLoading) {
        return (
            <Box display="flex" flexDirection="column" height="100vh">
                <Box display="flex" flexDirection="row" gap={1} m={1}>
                    <Skeleton variant="rectangular" width={110} height={48}/>
                    <Skeleton variant="rectangular" width={110} height={48}/>
                    <Skeleton variant="rectangular" width={110} height={48}/>
                </Box>
                <Container sx={{height: 0.8, marginY: 'auto'}}>
                    <Skeleton variant="rounded" height="100%"/>
                </Container>
                <ConfirmedBackoutButton {...modalProps} redirectTo={library}/>
            </Box>
        );
    }

    if (isError || !game || !loggedInUserId) {
        return (
            <Box display="flex" justifyContent="center" alignItems="start" height="100vh" p={1}>
                <Alert severity="error">We could not load this game for you at this time. Please check back
                    later!</Alert>
                <ConfirmedBackoutButton {...modalProps} redirectTo={library}/>
            </Box>
        );
    }

    if (!canInvite && tab === 2) setTab(0);

    const handleChange = (_: SyntheticEvent, newTab: number) => {
        setTab(newTab);
    }

    if (searchParams.has("joinLobby")) {
        setLobbyId(searchParams.get("joinLobby")!);

        searchParams.delete("joinLobby");
        setSearchParams(searchParams);
    }

    const getIframeUrl = () => {
        const host = (game.currentHost.endsWith("/") ? game.currentHost.slice(0, -1) : game.currentHost);

        return host + "?playerId=" + loggedInUserId + (lobbyId ? "&lobbyId=" + lobbyId : "");
    }

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Tabs value={tab} onChange={handleChange}>
                <Tab label="Game"/>
                <Tab label="Rules"/>
                <Tab label="Invite" disabled={!canInvite}/>
            </Tabs>
            <ConfirmedBackoutButton {...modalProps} redirectTo={library}/>

            {tab === 0 && <Box sx={{
                flex: 1, // Take up the remaining space
                overflow: "hidden", // Prevent scrollbars
            }}>
                <iframe src={getIframeUrl()}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            backgroundColor: "transparent"
                        }}
                />
            </Box>}

            {tab === 1 && <Container>
                <ChatbotTab gameId={gameId}/>
            </Container>}

            {tab === 2 && <Container>
                <InviteTab lobbyId={lobbyId}/>
            </Container>}
        </Box>
    );
}
