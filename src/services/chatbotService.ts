import axios from "axios";
import {Answer} from "../model/chatbot/Answer.ts";
import {Question} from "../model/chatbot/Question.ts";

const CHATBOT_CONTEXT_BASE_URL = import.meta.env.VITE_CHATBOT_URL;

// export async function postInitialQuestion(playerId: string, gameId: string) {
export async function postInitialQuestion() {
    const url = CHATBOT_CONTEXT_BASE_URL + "/initial-question"

    const {data: answer} = await axios.post<Answer>(url)
    return answer
}

// export async function postFollowUpQuestion(playerId: string, gameId: string, question: string) {
export async function postFollowUpQuestion(question: Question) {
    const url = CHATBOT_CONTEXT_BASE_URL + "/follow-up-question"

    const {data: answer} = await axios.post<Answer>(url, question)
    return answer
}
