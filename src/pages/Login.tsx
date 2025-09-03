import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { User } from "../type";
import { getAuthToken } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";



export default function Login() {
    const navigate = useNavigate();
    const {login} = useAuthStore();
    const [toastOpen, setToastOpen] = useState(false);
    const [user, setUser] = useState<User>({
        username: '', 
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleLogin = () => {
        getAuthToken(user)
        .then((token) => {
            if(token !== null) { //통신이 잘 됏어도 토큰이 비정상적으로 담겼을 수도 있어서
                sessionStorage.setItem("jwt", token);

                //useStore상태 바꿔줘야함 
                login(); //로그인 함수해서 전역 인증여부 트루로 바꿔준다 

                
                //alert(sessionStorage.getItem("jwt")); //확인용이라 지워도 된다.

                //여기까지 왓다는건 로그인 성공이라는 거니까 메인페이지로 보내줘도 된다.
                //함수호출해서 다른 곳으로 보내려면 use네비게이트 훅 쓰면 된다
                navigate("/");
            }

            //alert(token); //토큰 값 확인 이거 잘 보관하고 있다가 이후 보내는 api요청마다 붙여주면 된다.
            //고민? 토큰을 어디에 담을거냐? 토큰을 저장해야하는데 어디다가 할 거니? 
            //컴포넌트 변수는 컴포넌트 뭐 어쩌고 할때마다 초기화되서 안된다
            //스테이트는? 유지되지만 언마운트하면 (로그인 페이지에서 벗어나서 다른 컴포넌트 마운트하면) 무용지물 된다
            //그러면? 예전에 배운 전역 상태관리 store? justand? 얘는 어떤 컴포넌트에 구애받지않고 전역적으로 살아있음(밖에서 관리) 근데 이거는 새로고침하면 초기화된다. 컴포넌트 마운트 언마운트에는 영향 안 받는데 
            //페이지 로드가 새로되면 영향을 받아서 초기화 된다.
            //더 밖에 있어야 하는 저장소에 해야하는데 
            //3가지 존재
            //1. 쿠키 (근데 이러면 백엔드를 저렇게 짜면 안됐다. 우리가 짜놓은 백엔드 구조가 헤더로 핸들링 되게 만들어 놧음) 얘도 바로 휘발되는 정보는 아님 
            //2. 로컬 스토리지
            //3. 세션 스토리지 
            //두 스토리지의 공통점? 파일로 저장된다 브라우저가 영구적으로 저장할 정보 필요할때 브라우저 껐다 켜져도 정보가 남아있으려면 파일로 저장하면 된다
            //두가지 ㅣ차이점은? 그 정보에 생애 주기가 다르다  세션스토리지는 내가 탭열어서 세션 스토리지에 어떤값 저장하면 탭 닫는 순간 휘발된다. 
            //로컬 스토리지는 내가 억지로 지우지 않는 이상 영구적으로 보존된다. (브라우저 꺼도 피씨를 껐다가 켜도)
            //두가지 후보중에 뭐가 좋겠냐? 탭 닫으면 다시 로그인 시킬거다? 세션스토리지 
            //서비스 별로 나뉜다? 그냥 탭닫았다가 다시 켜도 로그인 되어있어도 되는건 로컬 스토리지? 
            //우리는 세션 스토리지에 저장하는걸로 구현할 예정 
            //코드 한줄이면 된다? 브라우저 api에서 제공해서 
             
        })
        .catch((err) => {
            console.log(err);
            setToastOpen(true);

        });
    };


    return (
        <>
        <Stack spacing={2} mt={2} alignItems="center">
            <TextField
                label="ID"
                name="username"
                onChange={handleChange}
            />    

             <TextField
                label="PW"
                name="password"
                onChange={handleChange}
            />    

            <Button 
                color="primary"
                onClick={handleLogin}
            >
                로그인 
            </Button>
            <Snackbar 
                open={toastOpen} //오픈 여부는 토스트 오픈이라는 스테이트 값 따라감
                autoHideDuration={3000} //3초만에 사라진다
                onClose={() => setToastOpen(false)}
                message='로그인 실패'
            />

        </Stack> 

        </>
    )

}