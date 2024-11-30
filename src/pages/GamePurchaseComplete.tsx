import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useOrderStatus} from "../hooks/storefront/useOrderStatus.ts";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";

export function GamePurchaseComplete() {
    const [status, setStatus] = useState('');
    const {gameId} = useParams();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const {status: loadedStatus, isLoading, isError} = useOrderStatus(gameId!, sessionId!);

    useEffect(() => {
        if (loadedStatus) {
            setStatus(loadedStatus["status"]);
        }
    }, [loadedStatus])

    if (isLoading) return <LoadingComponent/>;
    if (isError || !loadedStatus) return <ErrorComponent/>;

    console.log(loadedStatus)

    if (status === 'open') {
        return (
            <Navigate to="/checkout" />
        )
    }

    if (status === 'complete') {
        return (
            <Navigate to="/library" />
        )
    }

    return null;
}