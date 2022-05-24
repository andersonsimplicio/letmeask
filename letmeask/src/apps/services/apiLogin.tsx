type User = {
    id: number | undefined,
    profile: string | undefined,
    username: string | undefined,
    email: string | undefined,
    telefone: string | undefined,
    data_nasc: string | undefined

};

export async function singIn(username: string, password: string) {
    const url = 'http://localhost:8000/api-token-auth/';
       
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        // console.log(data);

        if (data.token !== undefined)
            localStorage.setItem('token', data.token);
        return data.token;
    } catch (error) {
        localStorage.removeItem('token');
        return;
    }

}

export async function createRoom(user: User, title: string) {
    const url = 'http://localhost:8000/rooms/create';
    const token = localStorage.getItem('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify({ autor: user.id, title: title })
    };
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
        })

}