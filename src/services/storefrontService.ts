import axios from "axios";
import {NewOrder} from "../model/storefront/NewOrder.ts";
import {Product} from "../model/storefront/Product.ts";

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

export async function getRecommendedProducts() {
    const url = STOREFRONT_BASE_URL + "/products/recommend"
    const {data: products} = await axios.get<Product[]>(url)
    return products
}

export async function getTrendingProducts() {
    const url = STOREFRONT_BASE_URL + "/products/trending"
    const {data: trending} = await axios.get<Product[]>(url)
    return trending
}