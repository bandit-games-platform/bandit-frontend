import {Box, Card} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import {ChatArea} from "./ChatArea.tsx";
import {ChatInputBar} from "./ChatInputBar.tsx";

import {Message} from "../../model/chatbot/Message.ts";
import {useEffect, useState} from "react";
import {usePostPlatformQuestion} from "../../hooks/chatbot/usePostPlatformQuestion.ts";
import {useLocation} from "react-router-dom";
import {PlatformQuestionDto} from "../../model/chatbot/PlatformQuestionDto.ts";
import {useGetPlatformConversation} from "../../hooks/chatbot/useGetPlatformConversation.ts";
import {LoadingComponent} from "../globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../globalComponents/ErrorComponent.tsx";

interface PlatformChatbotProps {
    isVisible: boolean;
    close: () => void;
}

export function PlatformChatbot({isVisible, close}: PlatformChatbotProps) {
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem("platformMessages");
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [pageName, setPageName] = useState("home")
    const {postPlatformQuestion, isPending: isAnswerPending} = usePostPlatformQuestion(pageName);
    const [loadLastOnly, setLoadLastOnly] = useState(false);
    const [usePolling, setUsePolling] = useState(false);
    const {conversation, isLoading: loadingConversation, isError: errorLoadingConversation} = useGetPlatformConversation(loadLastOnly, usePolling);
    const url = useLocation()

    useEffect(() => {
        switch (true) {
            case url.pathname === "/": {
                setPageName("home");
                break;
            }
            case /^\/store\/[^/]+\/purchase\/checkout$/.test(url.pathname): {
                setPageName("individual_game");
                break;
            }
            case url.pathname === "/store": {
                setPageName("store");
                break;
            }
            case /^\/game\/[^/]+$/.test(url.pathname): {
                setPageName("individual_game");
                break;
            }
            case url.pathname === "/library": {
                setPageName("library");
                break;
            }
            case url.pathname === "/statistics": {
                setPageName("stats");
                break;
            }
        }
    }, [url.pathname, setPageName]);

    const submitNewQuestion = async (text: string) => {
        const platformQuestionDto: PlatformQuestionDto = {questionText: text}
        setUsePolling(false);

        const updatedMessages: Message[] = [...messages];
        const userMessage: Message = {sender: "user", text: text, isThinking: false};
        updatedMessages.push(userMessage);
        const botAnswer: Message = {sender: "bot", text: "", isThinking: true};
        updatedMessages.push(botAnswer);

        sessionStorage.setItem("platformMessages", JSON.stringify(updatedMessages))
        setMessages(updatedMessages);

        const answer = await postPlatformQuestion(platformQuestionDto);
        if (answer?.text) {
            updatedMessages[updatedMessages.length - 1].text = answer.text;
            updatedMessages[updatedMessages.length - 1].isThinking = false;
            sessionStorage.setItem("platformMessages", JSON.stringify(updatedMessages))
            setMessages(updatedMessages);
        }
        setUsePolling(true);
    }

    useEffect(() => {
        if (conversation) {
            if (messages.length == 0) {
                const newMessageArray: Message[] = [];
                for (const question of conversation) {
                    const userMessage: Message = {sender: "user", text: question.text, isThinking: false};
                    newMessageArray.push(userMessage);

                    if (question.answer) {
                        const botAnswer: Message = {sender: "bot", text: question.answer.text, isThinking: false};
                        newMessageArray.push(botAnswer);
                    }
                }
                sessionStorage.setItem("platformMessages", JSON.stringify(newMessageArray))
                setMessages(newMessageArray);
                setLoadLastOnly(true);
                setUsePolling(true);
            } else {
                const updatedMessages: Message[] = [...messages];

                for (const question of conversation) {
                    const sameQuestionIndex = messages?.findIndex(q => q.text === question.text) ?? -1;

                    if (sameQuestionIndex != -1) {
                        if (updatedMessages[sameQuestionIndex].isThinking) {
                            if (question.answer) {
                                updatedMessages[sameQuestionIndex].isThinking = false;
                            }
                        }

                        if (updatedMessages.length - 1 < sameQuestionIndex + 1) {
                            if (question.answer) {
                                const botAnswer: Message = {sender: "bot", text: question.answer.text, isThinking: false};
                                updatedMessages.push(botAnswer);
                            }
                        } else {
                            if (question.answer && updatedMessages[sameQuestionIndex + 1].text != question.answer.text) {
                                const botAnswer: Message = {sender: "bot", text: question.answer.text, isThinking: false};
                                updatedMessages[sameQuestionIndex + 1] = botAnswer;
                            }
                        }
                    } else {
                        const userMessage: Message = {sender: "user", text: question.text, isThinking: false};
                        updatedMessages.push(userMessage);

                        if (question.answer) {
                            const botAnswer: Message = {sender: "bot", text: question.answer.text, isThinking: false};
                            updatedMessages.push(botAnswer);
                        }
                    }
                }

                sessionStorage.setItem("platformMessages", JSON.stringify(updatedMessages))
                setMessages(updatedMessages);
                setLoadLastOnly(true);
                setUsePolling(true);
            }
        }
    }, [conversation, messages])

    return (
        <Card
            hidden={!isVisible}
            sx={{
                position: 'fixed',
                bottom: 16,
                left: 22,
                width: 400,
                height: 400,
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white,
                zIndex: 20,
                boxShadow: 3,
                '&:hover': {
                    backgroundColor: (theme) => theme.palette.secondary.dark,
                },
            }}
        >
            <IconButton
                onClick={close}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}
            >
                <CancelIcon/>
            </IconButton>

            {!loadingConversation && !errorLoadingConversation && (<Box
                sx={{
                    height: '80%',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingTop: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ChatArea messages={messages} minHeight={"310px"}/>
            </Box>)}

            {loadingConversation && <LoadingComponent/>}
            {errorLoadingConversation && <ErrorComponent/>}

            {!errorLoadingConversation && (<Box
                sx={{
                    position: 'absolute',
                    padding: '5px',
                    bottom: 2,
                    width: "100%"
                }}
            >
                <ChatInputBar onSend={(message) => submitNewQuestion(message)} disabled={isAnswerPending}/>
            </Box>)}
        </Card>
    )
}