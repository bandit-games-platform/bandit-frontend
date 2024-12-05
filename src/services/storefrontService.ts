import axios from "axios";
import {NewOrder} from "../model/storefront/NewOrder.ts";

const STOREFRONT_BASE_URL = import.meta.env.VITE_STOREFRONT_URL;

export async function createNewOrder(gameId: string) {
    const url = STOREFRONT_BASE_URL + "/games/" + gameId + "/create-order"
    const {data: orderDetails} = await axios.post<NewOrder>(url)
    return orderDetails
}

export async function getOrderStatus(gameId: string, sessionId: string) {
    const url = STOREFRONT_BASE_URL + "/games/" + gameId + "/order-status?sessionId=" + sessionId
    const {data: orderStatus} = await axios.get<NewOrder>(url)
    return orderStatus
}