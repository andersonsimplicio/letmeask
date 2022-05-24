import { useContext,FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationimg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../assets/styles/auth.scss';
import { Button } from '../components/Button';
import { authContext } from "../context/AuthContext";
import { createRoom } from '../services/apiLogin';


export function NewRoom(){
    const {user,getUser} = useContext(authContext);
    const [salaNome,setSala] = useState('');
    const history = useHistory()    
    if(!user){
        getUser()
    }

    async function handlerCreateRoom(e:FormEvent){
        e.preventDefault();
        if(salaNome.trim()===''){
            return;
        } 
        if(user){
            const sala = await createRoom(user,salaNome);
            history.push(`/rooms/${sala.id}`)
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
                    <h1>{user?.username}</h1>
                    <strong>Criar uma nova Sala </strong> 
                    <form onSubmit={handlerCreateRoom}>
                         <input 
                         type="text"
                         placeholder='Nome da sala'
                         onChange={event => setSala(event.target.value)}
                         value={salaNome}
                        />
                        <Button type='submit' >Criar sala</Button>    
                    </form>    
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
     )
    

}

function getUser() {
    throw new Error('Function not implemented.');
}
