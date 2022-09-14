
const baseURL = "http://192.168.3.140:60675/indicadores";

const fechtSinjwt = (endpoint, data, method = 'GET')=>{

    const url = `${ baseURL }/${ endpoint }`;

    if(method === 'GET'){
        return fetch(url);
    }
        return fetch(url,{
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }



const fechtConjwt = (endpoint, data, method = 'GET')=>{

    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('accessToken') || '';

    if(method === 'GET'){
        return fetch(url,{
            method,
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token},
        });
    }
        return fetch(url,{
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        })
    }



const checkToken = ()=>{
    const accessToken = window.localStorage.getItem('accessToken');
    return fetch('http://localhost:4000/api/auth/checkTwj',{method:'GET',headers:{'x-token': accessToken}})
}


export { fechtSinjwt, fechtConjwt, checkToken }