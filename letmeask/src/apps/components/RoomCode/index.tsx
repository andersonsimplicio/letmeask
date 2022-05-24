import copyImage from '../../assets/images/copy.svg';
import '../../assets/styles/room-code.scss';

type code ={
    code:string
}


export function RoomCode(props:code){
    function CopyCodeSala(){
        navigator.clipboard.writeText(props.code)
    }


    return(
        <button className="room-code" onClick={CopyCodeSala} >
            <div>
                <img src={copyImage} alt="" />   
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}