import { useState,useContext,FormEvent } from "react";
import { useHistory } from "react-router-dom";
import illustrationimg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../assets/styles/auth.scss';
import { Button } from '../components/Button';
import { authContext } from "../context/AuthContext";
import { singIn } from "../services/apiLogin";
import { checkroom } from '../services/apiRoom';

export function Home(){
    let history = useHistory();
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const {user,resetUser,getUser} = useContext(authContext);
    const [roomCode,setRoom] = useState('')
    if(!user){
       resetUser()
    }

    async function handleSubmit(e:FormEvent) {
        e.preventDefault();
        if(username.trim()!=='' && password.trim()!==''){
            await singIn(username,password);             
            let token = localStorage.getItem('token'); 
            if(token?.trim()!==undefined){
                getUser();
                history.push('/rooms/new');
            }else{
                history.push('/');
            }
        }else{
            localStorage.removeItem('token');
            history.push('/');
        }      
    };

    async function handlerJoinRoom(e:FormEvent){
        e.preventDefault();
        if(roomCode.trim()===''){
            return;
        }else{
            let room = await checkroom(roomCode);
             if(room){
                history.push(`/rooms/${room.id}`)
             }else{
                 alert('Sala Não Existe');
                 return;
             }
        }
    }


    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationimg} alt="Ilustração"/>
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" />
                    <strong>Crie sua Sala </strong> 
                    <form onSubmit={handleSubmit}>
                         <input 
                         type="text"
                         placeholder='name'
                         value={username}
                         onChange={({ target }) => setUsername(target.value)}
                        />
                         <input 
                         type="password"
                         placeholder='senha'
                         value={password}
                         onChange={({ target }) => setPassword(target.value)}
                        />
                        <Button type='submit' >login</Button>    
                    </form>  
                   <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handlerJoinRoom}>
                        <input 
                         type="text"
                         placeholder='Digite o Código da Sala'
                         onChange={e=>setRoom(e.target.value)}
                         value={roomCode}
                        /> 
                        <Button type='submit' >Entrar em uma sala</Button> 
                    </form>    
                </div>
            </main>
        </div>
     )
}