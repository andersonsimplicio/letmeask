import {ReactNode } from 'react';
import './styles.scss';


type QuestionProps ={
    content:string | undefined,
    autor:{
        username:string | undefined,
        profile: string | undefined,
    }
    children?:ReactNode
}


export function Question({
    content,
    autor,
    children
}:QuestionProps){

    return(
        <div className="question">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={'http://localhost:8000'+autor.profile} alt={autor.username} />
                    <span>{autor.username}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );

}