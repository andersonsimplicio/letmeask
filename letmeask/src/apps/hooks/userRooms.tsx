import { useEffect, useState } from "react";
import { QueryQuestions } from "../services/apiQuestions";
import { checkroom } from "../services/apiRoom";

type Autor = {
    id: number,
    profile: string,
    username: string,
}

type QuestionsType = {
    id: string,
    autor: Autor,
    question: string,
    sala: number,
    count_likes: number
    i_like: string | undefined
}


export function useRoom(roomID: string) {

    const [questions, setQuestions] = useState<QuestionsType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function initSala() {
            let sala = await checkroom(roomID);
            setTitle(sala.title);
            qsQuestion()
        }
        initSala();
    }
        , [roomID]);


    useEffect(() => {
        async function setupSala() {
            let sala = await checkroom(roomID);
            setTitle(sala.title);
        }
        setupSala()
    }
        , [questions]);

    async function qsQuestion() {
        let qs: Array<QuestionsType> = await QueryQuestions(roomID);
        setQuestions(qs);
    }

    return { questions, title, setQuestions }
}