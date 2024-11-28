import axios from "axios";
import {Answer} from "../model/chatbot/Answer.ts";
import {FollowUpQuestionDto} from "../model/chatbot/FollowUpQuestionDto.ts";
import {InitialQuestionDto} from "../model/chatbot/InitialQuestionDto.ts";

const CHATBOT_CONTEXT_BASE_URL = import.meta.env.VITE_CHATBOT_URL;

export async function postInitialQuestion(initialQuestionDto: InitialQuestionDto) {
    const url = CHATBOT_CONTEXT_BASE_URL + "/initial-question"

    const {data: answer} = await axios.post<Answer>(url, initialQuestionDto)
    return answer
}

export async function postFollowUpQuestion(followUpQuestionDto: FollowUpQuestionDto) {
    const url = CHATBOT_CONTEXT_BASE_URL + "/follow-up-question"

    const {data: answer} = await axios.post<Answer>(url, followUpQuestionDto)
    return answer
}
