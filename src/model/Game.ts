import {Rule} from "./Rule.ts";
import {Achievement} from "./Achievement.ts";

export interface Game {
    id: string
    title: string
    description: string
    icon: string
    background:string
    rules: Rule[]
    currentHost: string
    screenshots: string[]
    achievements: Achievement[]
}

