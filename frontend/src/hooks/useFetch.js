
import axios from 'axios';

import {toast} from 'react-toastify';

function useFetch(){  
    //funcion
    //hace una peticion                                                       
    const fetchDataBackend = async (url, form = null, method = 'POST') => {
        try{
            let respuesta
            if (method === 'POST') {
                respuesta = axios.post(url, form) //axios maneja codigo asincrono
            } else if (method === 'GET') {
                respuesta = axios.get(url)
            }
            toast.success(respuesta?.data?.msg)
            return respuesta?.data
        } catch (error) {
            toast.error(error.response?.data?.msg)
            const errorMsg = error.response?.data?.msg || 'Error desconocido';
            throw new Error(errorMsg);
        }
    }
    return { fetchDataBackend }
}

export default  useFetch