import { useState } from "react";
import type { Car } from "../type";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carApi";
import EditIcon from '@mui/icons-material/Edit';


type EditCarprops = {
    carData: Car;
}

export default function EditCar({carData}: EditCarprops) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState<Car>({
        id: 0, //얘는 수정이라 아이디도 필요해서 일단 0으로 초기화 시켜놓음 
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    const handleOpen = () => {
        setCar({
            id: carData.id, 
            brand: carData.brand,
            model: carData.model,
            color: carData.color,
            registrationNumber: carData.registrationNumber,
            modelYear: carData.modelYear,
            price: carData.price
        });
        setOpen(true);
    }

     const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        updateCar(car);
        setCar({
            id: 0,
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0
        });
        handleClose();

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //매개변수로 들어오는 이벤트 객체를 가능하면 어떤 타입의 이벤트라고 명확하게 해주는게 좋다
        const value = e.target.value;
        const name = e.target.name;
        setCar({...car, [name]: value});
    }

    return (
        <>
            <Tooltip title="수정">
                <IconButton size="small" onClick={handleOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle> 
                <DialogContent>
                    <CarDialogContent
                        car={car}
                        handleChange={handleChange} 
                    />
                </DialogContent>
                <DialogActions >
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}