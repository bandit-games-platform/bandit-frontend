import axios from "axios";
import {Answer} from "../model/chatbot/Answer.ts";
import {PlatformQuestion} from "../model/chatbot/PlatformQuestion.ts";
import {PlatformQuestionDto} from "../model/chatbot/PlatformQuestionDto.ts";
import {GameQuestionDto} from "../model/chatbot/GameQuestionDto.ts";

const CHATBOT_CONTEXT_BASE_URL = import.meta.env.VITE_CHATBOT_URL;

// export async function postInitialQuestion(initialQuestionDto: InitialQuestionDto) {
//     const url = CHATBOT_CONTEXT_BASE_URL + "/chatbot/game"
//
//     const {data: answer} = await axios.post<Answer>(url, initialQuestionDto)
//     return answer
// }

export async function postFollowUpQuestion(followUpQuestionDto: GameQuestionDto) {
    const url = CHATBOT_CONTEXT_BASE_URL + "/chatbot/game"

    const {data: answer} = await axios.post<Answer>(url, followUpQuestionDto)
    return answer
}

export async function getPlatformConversation(lastOnly: boolean) {
    const url = CHATBOT_CONTEXT_BASE_URL + "/chatbot/platform?lastOnly=" + lastOnly

    const response = await axios.get<PlatformQuestion[]>(url);
    let conversation: PlatformQuestion[];

    if (response.status === 204) {
        console.warn("Chatbot conversation not found, starting new one")
        const platformQuestionDto: PlatformQuestionDto = {questionText: "Initial Question"}
        await postPlatformQuestion(platformQuestionDto, "home")
        conversation = (await axios.get<PlatformQuestion[]>(url)).data;
    } else {
        conversation = response.data;
    }

    return conversation
}

export async function postPlatformQuestion(platformQuestionDto: PlatformQuestionDto, pageName: string) {
    const url = CHATBOT_CONTEXT_BASE_URL + "/chatbot/platform/" + pageName

    const {data: answer} = await axios.post<Answer>(url, platformQuestionDto)
    return answer
}
