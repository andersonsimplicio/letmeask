import { useParams } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../assets/styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import Modal from '../components/Modal';
import { FormEvent, useContext, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { sendQuestion } from '../services/apiRoom';
import { AvatarProfile } from '../components/Profile';
import { QueryLastQuestions } from '../services/apiQuestions';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/userRooms';
import LikeButton from '../components/LikeButton';

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

export function Room() {
    const { user, getUser } = useContext(authContext);
    const [Newquestion, setNewQuestion] = useState('');
    const param = useParams<RoomParams>();
    const roomID = param.id
    const { title, questions, setQuestions } = useRoom(roomID);

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
                    autor: String(user?.id),

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
                        <RoomCode code={roomID} />
                    </div>
                </header>
                <main>
                    <div className="room-title">
                        <h1>Sala {title && ''} </h1>
                        {questions?.length > 0 && <span> {questions?.length}  perguntas</span>}

                    </div>

                    <form onSubmit={event => handlerNewsQuestions(event)}>
                        <textarea
                            placeholder='Qual as sua duvida?'
                            onChange={event => setNewQuestion(event.target.value)}
                            value={Newquestion}
                        />
                        <div className="form-footer">
                            {user ?
                                (<div className='user-info'>
                                    <AvatarProfile url={user.profile} />
                                    <span>{user.username}</span>
                                </div>) :

                                (<span>Para enviar a pergunta <Modal /> </span>)}

                            <Button type='submit' disabled={!user}>Enviar Pergunda</Button>
                        </div>
                    </form>
                    <div className="list-questions">
                        {questions.map(question => {
                            return (
                                <Question key={question.id}
                                    autor={question.autor}
                                    content={question.question} >
                                    <LikeButton
                                        question={question}
                                    />
                                </Question>

                            );
                        })}
                    </div>

                </main>
            </div>
        </>
    )
}