export type Message = {
    sender: "user" | "bot"
    text?: string
    isThinking?: boolean
}