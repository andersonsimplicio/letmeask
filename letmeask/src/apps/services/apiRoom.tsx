
type Room={
    id:string | undefined,
    titulo:string | undefined,
    autor:string | undefined
}


export async function checkroom<Room>(id_room:string) {    
    const url = 'http://localhost:8000/rooms/checkroom';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id:id_room})
    };
    return fetch(url, requestOptions)
    .then(response => response.json())
    .then(data =>{
        return data.room;
    })
    .catch(error => {
        return false;
    });
}


type Question ={
    sala:string | undefined,
    question:string | undefined,
    autor:string | undefined 
 };


export async function sendQuestion(question:Question) {    
    const url = 'http://localhost:8000/rooms/new-question';
    const token =  localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',       
        headers: {
            'Content-Type': 'application/json', 
            'Authorization':'Token '+token
           },
        body:JSON.stringify(question)
    };
    return fetch(url, requestOptions)
    .then(response => response.json())
    .then(data =>{
        
    })
    .catch(error => {
        console.log(error);    
    });
}