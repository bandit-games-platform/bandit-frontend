export type Message = {
    sender: "user" | "bot" | string // TODO
    text?: string
    isThinking?: boolean
}