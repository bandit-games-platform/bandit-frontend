import {loadStripe} from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {Navigate, useParams} from "react-router-dom";
import {useCreateNewOrder} from "../hooks/storefront/useCreateNewOrder.ts";
import {useEffect} from "react";
import {LoadingComponent} from "../components/LoadingComponent.tsx";
import {ErrorComponent} from "../components/ErrorComponent.tsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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
    if (orderError) return <Navigate to={`/game/${gameId}`} />;
    if (orderDetails == null) return <ErrorComponent/>;

    return (
        <div id="checkout" style={{marginTop: "2%"}}>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={orderDetails}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}