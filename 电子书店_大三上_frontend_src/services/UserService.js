import {Request} from "../utils/Ajax";
import {history} from '../utils/history';
import {message} from 'antd';

export const login = (data) => {
    const url = 'localhost:8080/checkUser';
    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data));
            history.push("/");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    Request(url, data, callback);
};