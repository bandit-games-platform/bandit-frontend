import {Navigate, useParams} from "react-router-dom";
import {useCreateNewOrder} from "../hooks/storefront/useCreateNewOrder.ts";
import {useEffect} from "react";
import {LoadingComponent} from "../components/globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../components/globalComponents/ErrorComponent.tsx";


export function StripeCheckout() {
    const {gameId} = useParams();
    const {createOrder, orderDetails, isPending: orderPending, isError: orderError} = useCreateNewOrder();

    useEffect(() => {
        if (gameId) {
            console.log("creating order")
            createOrder(gameId);
        }
    }, [createOrder, gameId])

    if (orderPending) return <LoadingComponent/>;
    if (orderError) return <Navigate to={`/game/${gameId}`}/>;
    if (orderDetails == null) return <ErrorComponent/>;

    return (
        <div id="checkout" style={{marginTop: "2%"}}>
            <p>I'm checking you out 😏</p>
            <hr/>
            <Navigate to={`/store/${gameId}/purchase/complete?session_id=${orderDetails["session_id"]}`}></Navigate>
        </div>
    )
}