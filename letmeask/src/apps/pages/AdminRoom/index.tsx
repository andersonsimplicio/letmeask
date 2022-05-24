import { useParams } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import '../../assets/styles/room.scss';
import { RoomCode } from '../../components/RoomCode';
import { FormEvent, useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext';
import { sendQuestion } from '../../services/apiRoom';
import { QueryLastQuestions } from '../../services/apiQuestions';
import { Question } from '../../components/Question';
import { useRoom } from '../../hooks/userRooms';


type Autor = {
    id: number,
    profile: string,
    username: string,
}

type QuestionsType = {
    id: string,
    autor: Autor,
    question: string;
    sala: number,
    count_likes: number,
    i_like: string | undefined
}

type RoomParams = {
    id: string
}


export function AdminRoom() {
    const { user, getUser } = useContext(authContext);
    const [Newquestion, setNewQuestion] = useState('');
    const param = useParams<RoomParams>();
    const roomID = param.id
    const { title, questions, setQuestions } = useRoom(roomID)

    async function handlerNewsQuestions(e: FormEvent) {
        e.preventDefault()
        if (Newquestion.trim() === '') {
            return;
        } else {
            getUser()
            if (!user) {
                return;
            } else {
                const question = {
                    sala: roomID,
                    question: Newquestion,
                    autor: String(user?.id)
                };
                sendQuestion(question);

                setTimeout(async () => {
                    let q: QuestionsType = await QueryLastQuestions(roomID);
                    let qs: Array<QuestionsType> = questions
                    qs.push(q);
                    setQuestions(qs);
                    setNewQuestion('');
                }, 450);

            }
        }
    }

    return (
        <>
            <div id="page-room">
                <header>
                    <div className="content">
                        <img src={logo} alt="letmeask" />
                        <div>
                            <RoomCode code={roomID} />
                            <Button isOutlined >Encerrar Sala</Button>
                        </div>

                    </div>
                </header>
                <main>
                    <div className="room-title">
                        <h1>Sala {title && ''} </h1>
                        {questions?.length > 0 && <span> {questions?.length}  perguntas</span>}

                    </div>
                    <div className="list-questions">
                        {questions.map(question => {
                            return (
                                <Question key={question.id}
                                    autor={question.autor}
                                    content={question.question}
                                />
                            );
                        })}
                    </div>

                </main>
            </div>
        </>
    )
}