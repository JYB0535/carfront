import axios from "axios";
import type { User } from "../type";

const BASE_URL = import.meta.env.VITE_API_URL;

 //유저 정보를 로그인 에이피아이로 유저정보 담아서 보내야한다?
export const getAuthToken = async (user: User) => {        //바디에 담을 정보: user
    const response = await axios.post(`${BASE_URL}/login`, user)

    //토큰이 들어있는 위치는 http 헤더중에 Authorization라는 이름 가진거
    return response.headers.authorization; //
}