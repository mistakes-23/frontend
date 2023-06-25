import axios from 'axios';

const origin = 'https://dev.akarpov.ru'

export const sendPdf = async (form: FormData) => {
    var ans = await axios.post(`${origin}/api/upload/`, form);
    return ans;
}

export const getFile = async (id: string) => {
    var ans = await axios.get(`${origin}/api/file/${id}`);
    return ans;
}

export const getStatus = async (status_id: string) => {
    var ans = await axios.get(`${origin}/api/status/${status_id}`);
    return ans;
}