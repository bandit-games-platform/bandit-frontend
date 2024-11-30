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

    console.log(gameId)
    console.log(sessionId)

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
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to.

                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }

    return null;
}