import {Box, Card} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import {ChatArea} from "./ChatArea.tsx";
import {ChatInputBar} from "./ChatInputBar.tsx";

import {Message} from "../../model/chatbot/Message.ts";
import {useContext, useEffect, useState} from "react";
import {usePostPlatformQuestion} from "../../hooks/chatbot/usePostPlatformQuestion.ts";
import {useLocation} from "react-router-dom";
import {PlatformQuestionDto} from "../../model/chatbot/PlatformQuestionDto.ts";
import {useGetPlatformConversation} from "../../hooks/chatbot/useGetPlatformConversation.ts";
import {LoadingComponent} from "../globalComponents/LoadingComponent.tsx";
import {ErrorComponent} from "../globalComponents/ErrorComponent.tsx";
import SecurityContext from "../../context/SecurityContext.ts";

interface PlatformChatbotProps {
    isVisible: boolean;
    close: () => void;
}

export function PlatformChatbot({isVisible, close}: PlatformChatbotProps) {
    const {loggedInUserId} = useContext(SecurityContext);

    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem(`platformMessages-${loggedInUserId}`);
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [pageName, setPageName] = useState("home")
    const {postPlatformQuestion, isPending: isAnswerPending} = usePostPlatformQuestion(pageName);
    const [loadLastOnly, setLoadLastOnly] = useState(false);
    const [usePolling, setUsePolling] = useState(false);
    const [askingQuestion, setAskingQuestion] = useState(false);
    const {
        conversation,
        isLoading: loadingConversation,
        isError: errorLoadingConversation
    } = useGetPlatformConversation(loadLastOnly, usePolling);
    const url = useLocation();

    useEffect(() => {
        if (url.pathname === "/") {
            setPageName("home");
        } else if (/^\/store\/[^/]+\/purchase\/checkout$/.test(url.pathname)) {
            setPageName("individual_game");
        } else if (url.pathname === "/store") {
            setPageName("store");
        } else if (/^\/game\/[^/]+$/.test(url.pathname)) {
            setPageName("individual_game");
        } else if (url.pathname === "/library") {
            setPageName("library");
        } else if (url.pathname === "/statistics") {
            setPageName("stats");
        }
    }, [url.pathname, setPageName]);

    const submitNewQuestion = async (text: string) => {
        const platformQuestionDto: PlatformQuestionDto = {questionText: text}

        const updatedMessages: Message[] = [...messages];
        const userMessage: Message = {sender: "user", text: text, isThinking: false};
        updatedMessages.push(userMessage);
        const botAnswer: Message = {sender: "bot", text: "", isThinking: true};
        updatedMessages.push(botAnswer);

        sessionStorage.setItem(`platformMessages-${loggedInUserId}`, JSON.stringify(updatedMessages))
        setMessages(updatedMessages);

        const answer = await postPlatformQuestion(platformQuestionDto);
        if (answer?.text) {
            updatedMessages[updatedMessages.length - 1].text = answer.text;
            updatedMessages[updatedMessages.length - 1].isThinking = false;
            sessionStorage.setItem(`platformMessages-${loggedInUserId}`, JSON.stringify(updatedMessages))
            setMessages(updatedMessages);
        }
    }

    useEffect(() => {
        let unansweredQuestions = 0;
        if (conversation) {
            /*
            * If there are no messages currently loaded in session storage then simply load all questions and answers
            * into the messages array and then into session storage. If there are messages then this will only
            * add questions and answers that don't already exist in the messages array to the messages array.
            *
            * If there is a question without an answer then isThinking will be true and after the first load, the
            * setLoadLastOnly boolean is set to true which means that instead of when polling fetching the whole
            * conversation from the backend it will only fetch the latest question. And it also sets the polling to begin.
            */
            if (messages.length == 0) {
                const newMessageArray: Message[] = [];
                for (const question of conversation) {
                    const userMessage: Message = {sender: "user", text: question.text, isThinking: false};
                    newMessageArray.push(userMessage);

                    if (question.answer) {
                        const botAnswer: Message = {
                            sender: "bot",
                            text: question.answer.text,
                            isThinking: !question.answer.text
                        };
                        newMessageArray.push(botAnswer);
                    }

                    if (!question.answer.text) {
                        unansweredQuestions += 1
                    }
                }
                sessionStorage.setItem(`platformMessages-${loggedInUserId}`, JSON.stringify(newMessageArray))
                setMessages(newMessageArray);

                if (!loadLastOnly) setLoadLastOnly(true);
                if (!usePolling) setUsePolling(true);
            } else {
                const updatedMessages: Message[] = [...messages];

                for (const question of conversation) {
                    const sameQuestionIndex = messages?.findIndex(q => q.text === question.text) ?? -1;

                    /*
                    * If the question has been found in the messages array then a check is carried out in order to check
                    * first if the status of that question is isThinking which, if it is, and there is an answer then
                    * it is updated to be false.
                    *
                    * Then if the question is the last thing saved, and it has no answer saved so questionIndex + 1
                    * (because questions and answers are saved as separate entries in the messages array)
                    * the if statement checks if there is an answer and if there isn't it stores that there is an
                    * unanswered question to disable the text box for the user to type in
                    * (this is in case they have 2 tabs open so they could not submit a chatbot question in both).
                    *
                    * If the answer exists then we check if the text matches the text currently in the answer, and if
                    * not then it is updated to match.
                    *
                    * If the question does not exist then a new question and answer pair is created
                    */
                    if (sameQuestionIndex != -1) {
                        if (updatedMessages[sameQuestionIndex].isThinking) {
                            if (question.answer.text) {
                                updatedMessages[sameQuestionIndex].isThinking = false;
                            }
                        }

                        if (updatedMessages.length - 1 < sameQuestionIndex + 1) {
                            if (question.answer) {
                                const botAnswer: Message = {
                                    sender: "bot",
                                    text: question.answer.text,
                                    isThinking: !question.answer.text
                                };
                                updatedMessages.push(botAnswer);
                            }

                            if (!question.answer.text) {
                                unansweredQuestions += 1
                            }
                        } else {
                            if (question.answer && updatedMessages[sameQuestionIndex + 1].text != question.answer.text) {
                                const botAnswer: Message = {
                                    sender: "bot",
                                    text: question.answer.text,
                                    isThinking: !question.answer.text
                                };
                                updatedMessages[sameQuestionIndex + 1] = botAnswer;
                            }

                            if (!question.answer.text) {
                                unansweredQuestions += 1
                            }
                        }
                    } else {
                        const userMessage: Message = {sender: "user", text: question.text, isThinking: false};
                        updatedMessages.push(userMessage);

                        if (question.answer) {
                            const botAnswer: Message = {
                                sender: "bot",
                                text: question.answer.text,
                                isThinking: !question.answer.text
                            };
                            updatedMessages.push(botAnswer);
                        }

                        if (!question.answer.text) {
                            unansweredQuestions += 1
                        }
                    }
                }

                sessionStorage.setItem(`platformMessages-${loggedInUserId}`, JSON.stringify(updatedMessages))
                setMessages(updatedMessages);

                if (!loadLastOnly) setLoadLastOnly(true);
                if (!usePolling) setUsePolling(true);
            }
        }

        if (unansweredQuestions === 0) setAskingQuestion(false);
        else setAskingQuestion(true);

    }, [askingQuestion, conversation, loadLastOnly, messages, usePolling])

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
                <ChatInputBar onSend={(message) => submitNewQuestion(message)}
                              disabled={isAnswerPending || askingQuestion}/>
            </Box>)}
        </Card>
    )
}