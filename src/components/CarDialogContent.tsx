import { Stack, TextField } from "@mui/material";
import type { Car } from "../type"

type CarDialogContentProps = {
    car: Car;
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export default function CarDialogContent({car, handleChange}: CarDialogContentProps) {
    return (
        <>
        <Stack spacing={2} marginTop={1}>
            <TextField
                label="제조사"
                //placeholder="제조사"
                name="brand"    
                value={car.brand}
                onChange={handleChange}
            />

            <TextField
                label="모델"
                name="model"    
                value={car.model}
                onChange={handleChange}
            />

            <TextField
                label="색상"
                name="color"    
                value={car.color}
                onChange={handleChange}
                />

            <TextField 
                label="연식"
                name="modelYear"    
                value={car.modelYear}
                onChange={handleChange}
                />

            <TextField
                label="등록넘버"
                name="registrationNumber" //이름은 정확하게 넣어줘야 된다고 함 왜?    
                value={car.registrationNumber}
                onChange={handleChange}
            />

            <TextField
                label="가격"
                name="price"    
                value={car.price}
                onChange={handleChange}
            />
            </Stack>
        </>
    )
}