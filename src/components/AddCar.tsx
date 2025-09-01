import { useState } from "react";
import type { Car } from "../type";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addCar } from "../api/carApi";
import CarDialogContent from "./CarDialogContent";

export default function AddCar() { //모달 만들어줄거임
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

    const handleSave = () => {
        addCar(car);
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