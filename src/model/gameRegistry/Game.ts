import {Rule} from "./Rule.ts";
import {Achievement} from "./Achievement.ts";
import {Developer} from "./Developer.ts";

export type Game = {
    id: string
    title: string
    description: string
    price: number
    icon: string
    background:string
    rules: Rule[]
    currentHost: string
    developer: Developer
    screenshots: string[]
    achievements: Achievement[]
}

