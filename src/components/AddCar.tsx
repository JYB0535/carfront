import { useState } from "react";
import type { Car } from "../type";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addCar } from "../api/carApi";
import CarDialogContent from "./CarDialogContent";

type AddCarProps = {
    loadCarData: () => void; //이 함수는 매개변수 없고 반환타입이 보이드다.
}
                                //props로 로드카 데이터 받아옴 
export default function AddCar({loadCarData} : AddCarProps) { //모달 만들어줄거임
    const [open, setOpen] = useState(false); //모달에 들어가야하는것?
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });
                                                //target?
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //매개변수로 들어오는 이벤트 객체를 가능하면 어떤 타입의 이벤트라고 명확하게 해주는게 좋다
        const value = e.target.value;
        const name = e.target.name;
        setCar({...car, [name]: value});
    }

    //모달을 열고 닫는 동작 함수
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        await addCar(car); //api호출  //결과 올떄까지 기다렸다가 로드카 데이터 할 예정 
        //car list reload 필요 왜? 저장하니까 새로고침해야 정보가 나와서 근데 얘는 자식 컴포넌트라서
        //할수없는게 없음 부모로 부터 받아와야함<carlist>
        //부모로부터 loadcardata받아와서 사용할 예정  //위에 addCar컴포넌트에 props로 로드카 데이터 받아옴 
        loadCarData(); //백엔드가 바쁘면 비동기 순서가 어긋날 수 있어서(추가되는 요청이 반영
        //전에 로드가 먼저 되는경우가 존재할 수 있음. 그래서 async 추가해줄것임 

        setCar({ //모달에 남아있는 유저가 입력한 정보 한번 클리어 시키려고 모달만 켜졌다 꺼졌다하는거지 컴포넌트 계속 마운트 된 상태라 스테이트 유지된다. 
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0
        });
        handleClose();
    }

    return (
        <>                  
                            {/*원래 handleOpen자리 이거엿음 () => setOpen(true) */}
            <Button onClick={handleOpen}>New Car</Button>
            {/* //모달  //dialog 밖에는 항상 보이는 부분 dialog안은 조건부>??*/}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle> 
                <DialogContent>
                    <CarDialogContent
                        car={car}
                        handleChange={handleChange} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}