export type Message = {
    sender: "user" | "bot" | string
    text?: string
    isThinking?: boolean
}