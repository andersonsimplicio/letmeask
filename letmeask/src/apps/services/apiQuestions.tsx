
export async function QueryQuestions(sala:string) {
    const url = 'http://localhost:8000/rooms/list-question';
    const token =  localStorage.getItem('token');

    const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               },
            body: JSON.stringify({sala,'token':token})
        };
        return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data =>{
            return data.questions;
        })
        .catch(error => {
            console.log(error);
            return [];    
        })
    
}

export  async function QueryLastQuestions(sala:string) {
    const url = 'http://localhost:8000/rooms/last-question';
    const token =  localStorage.getItem('token');
    if(token?.trim()){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token '+token
               },
            body: JSON.stringify({'sala':sala})
        };
        return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(data =>{   
            return data.question;
        })
        .catch(error => {
            return {};    
        })
    }
    return {}
}


export  async function LikeQuestions(userid:string,questionid:string) {
    const url = 'http://localhost:8000/rooms/like-question';
    const token =  localStorage.getItem('token');
    if(token?.trim()){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token '+token
               },
            body: JSON.stringify({'autor':userid,'question':questionid})
        };
        return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(data =>{   
            console.log(data);
        })
        .catch(error => {
            console.log(error);      
        })
    }
   
}