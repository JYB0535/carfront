import axios, { type AxiosRequestConfig } from "axios";
import type { Car } from "../type";

const BASE_URL = import.meta.env.VITE_API_URL;

const getAxiosConfig = (): AxiosRequestConfig => {//매개변수 없고 반환타입은 악시오스
    //얘는 악시오스 설정 객체를 반환하면 된다 그래서 객체 리턴
    const token = sessionStorage.getItem('jwt'); //토큰 위치 

    return {
        headers: {
            'Authorization': token
        }

}    
};


//자동차 목록 조회
export const getCars = async (): Promise<Car[]> => { //Promise추가해줌 왜였지 들었는데 생각이 안나 
    
    // const response = await axios.get("http://localhost:8080/cars");
    //이제 프록시 써서 8080 직접 보게 할 필요 없이 프록시로 보냄 
    const response = await axios.get(`${BASE_URL}/cars`, getAxiosConfig());
    return response.data;


        //이제 더미 데이터 필요없음
        //서버로 데이터 조회 ==> 응답 데이터 리턴
    // const getCarsDummy = [ //이 함수에서 반환해야할게 배열이라서 대괄호로 시작
    //     {   id: 1,
    //         brand: 'Ford',
    
    //         model: 'Mustang',
    //         color: 'Red',
    //         registrationNumber: "ADF-1121",
    //         modelYear: 2023,
    //         price: 59000
    //     },
    //     {   id: 2,
    //         brand: 'bmw',
    //         model: 'poly',
    //         color: 'white',
    //         registrationNumber: "BCD-1234",
    //         modelYear: 2024,
    //         price: 69000
    //     },
    //     {   id: 3,
    //         brand: 'kia',
    //         model: 'water',
    //         color: 'blue',
    //         registrationNumber: "CDF-2345",
    //         modelYear: 2025,
    //         price: 79000
    //     },
    //]
    //return Promise.resolve(getCarsDummy); //이러면 getCarsDummy를 감싸는 Promise가 반환된다. then과 catch 사용가능 
}

// export const deleteCar = (id: number): Promise<number> => {
//     alert(id + '번 데이터를 삭제합니다.');
//     return Promise.resolve(id);
// }


//토큰 헤더에 담아주게 바꿔야함 
export const deleteCar = async (id: number): Promise<number> => {
    const response = await axios.delete(`${BASE_URL}/cars/${id}`, getAxiosConfig());
    return response.data;
}

// export const addCar = (car: Car): Promise<Car> => {
//     const res: Car = {...car, id: 999};
//     return Promise.resolve(res);
// }

export const addCar = async (car: Car): Promise<Car> => {
    const response = await axios.post(`${BASE_URL}/cars`, car, getAxiosConfig()); //이대로 넘기면 알아서 자바스크립트에서 변환해준다??
    return response.data; //리스폰스 바디 리턴?    
}



// export const updateCar = (car: Car): Promise<Car> => {
//     const res: Car = {...car}; //매개변수로 들어온 카 복사에서 반환?
//     return Promise.resolve(res);
// }

export const updateCar = async (car: Car): Promise<Car> => {
    const response = await axios.put(`${BASE_URL}/cars`, car,  getAxiosConfig()); //이대로 넘기면 알아서 자바스크립트에서 변환해준다??
    return response.data; //리스폰스 바디 리턴?    
}