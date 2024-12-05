import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useOrderStatus} from "../hooks/storefront/useOrderStatus.ts";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";
import {useQueryClient} from "@tanstack/react-query";
import SecurityContext from "../context/SecurityContext.ts";
import {Box} from "@mui/material";
import {CheckCircleOutline} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export function GamePurchaseComplete() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {loggedInUserId} = useContext(SecurityContext);

    const [status, setStatus] = useState('');
    const {gameId} = useParams();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const {status: loadedStatus, isLoading, isError} = useOrderStatus(gameId!, sessionId!);

    useEffect(() => {
        if (loadedStatus) {
            setStatus(loadedStatus["status"]);
            if (loadedStatus["status"] === 'complete') {
                queryClient.invalidateQueries({queryKey: ['player-library' + loggedInUserId]});
            }
        }
    }, [loadedStatus, loggedInUserId, queryClient])

    if (isLoading) return <LoadingComponent/>;
    if (isError || !loadedStatus) return <ErrorComponent/>;

    if (status === 'open') {
        return (
            <Navigate to="/checkout" />
        )
    }

    if (status === 'complete') {
        setTimeout(() => {navigate("/library")}, 5000)

        return (
            <Box
                sx={{
                    textAlign: "center",
                    margin: "2% auto",
                    width: "30%",
                    border: 3,
                    borderColor: "green",
                    borderRadius: 3,
                    padding: "10px"
            }}
            >
                <CheckCircleOutline fontSize={"large"} sx={{color: "green"}} />
                <Typography variant={"h5"}>
                    Game Purchase Complete!
                    <br/>
                    Thank you for your purchase!
                </Typography>
                <Typography variant={"body2"} sx={{color: "gray"}}>
                    If you don't get redirected, click <Link to={"/library"} style={{color: "#f31da4"}}>here</Link>
                </Typography>
            </Box>
        )
    }

    return null;
}