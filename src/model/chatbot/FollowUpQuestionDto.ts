import {Question} from "./Question.ts";

export type FollowUpQuestionDto = {
    userId: string
    gameId: string
    question: Question
}