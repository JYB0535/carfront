import { create } from "zustand";

type AuthStore = {
    isAuthenticated: boolean;
    login: () => void; //로그인이라는 함수 
    logout: () => void;
}
                                    //set은 저스텐드 함수 이거 매개변수로 받아서 객체반환? 
export const useAuthStore = create<AuthStore> ((set) => ({ //객체 바로 반환할건데 헷갈릴까봐 소괄호에 중괄호
    isAuthenticated: !!sessionStorage.getItem("jwt"), //느낌표 하나는 펄시 하나더는 트루시? //세션스토리지에 토큰이 남아있는지 체크 //
    login: () => set({isAuthenticated: true}),
    logout: () => set({isAuthenticated: false})
}));