import { useEffect, useState } from "react"
import type { Car } from "../type"
import { deleteCar, getCars } from "../api/carApi";
import { DataGrid } from "@mui/x-data-grid";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Snackbar, Tooltip } from "@mui/material";
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";
import { IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';


export default function CarList() {
    const [data, setData] = useState<Car[]>([]);
    const [toastBal, setToastVal] = useState({
        open: false, msg: ''
    });

    const columns: GridColDef[] = [ // 이 배열순서가 그리드에 뿌려줄 데이터 배치 순서 
        {field: 'brand', headerName: '브랜드', width: 200}, //field에 있는건 데이터랑 매칭 시킬 네임이고 header네임은 열었을때 헤더네임 다르게 표시하고 싶으면 지정 
        {field: 'model', headerName: '모델', width: 200},
        {field: 'color', headerName: '색상', width: 200},
        {field: 'registrationNumber', headerName: '등록넘버', width: 150},
        {field: 'modelYear', headerName: '연식', width: 150},
        {field: 'price', headerName: '가격', width: 150},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
             //셀 안에 렌더링 할거
            renderCell: (params: GridCellParams) => (
                //params.row. 파라미터 다 가지고 와서 row를 딱 집어서 id row만 잇는게 아니라 다른 데이터도 같이 넘어오나봄?
                <EditCar carData={params.row}/>
            )
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
             //셀 안에 렌더링 할거
            renderCell: (params: GridCellParams ) => (
                <Tooltip title="삭제">
                    <IconButton size="small" onClick={() => deleteCarData(params.row.id)}>  
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )
        }
    ]

    const loadCarData = () => {
        getCars()
        .then(res => setData(res)) //성공했을때 할거
        .catch(err => console.log(err)) //실패했을 때 
    }

    const deleteCarData = (id: number) => {
        if(confirm(`${id}번 데이터를 삭제하시겠습니까?`)) {       //진짜 삭제할건지 확인
            deleteCar(id) //넘어온 아이디로 api호출?
            .then((res) => {
                setToastVal({open: true, msg: `${res}번 데이터가 삭제되었습니다`}); // Promise의 then에 넣어줬으니 진짜 삭제 성공했을때만 토스트 알림 올라온다.
        })
         .catch(err => console.log(err));
        }
    }

    useEffect(() => { //창 열렸을 때 데이터 한번은 받아와야한다. 
        loadCarData();
    }, []); //빈 배열은 초기 마운트대 한번만


    return (
        <>
            <AddCar/> 
            <DataGrid 
                rows={data} //한 행마다 뿌려줄 배열 
                columns={columns}
                getRowId={row => row.id} //열 하나 가지고 와서 그 열의 아이디 반환
                disableRowSelectionOnClick={true}
                showToolbar //이거 책이랑 다름 버전 바뀌면서 책에 있는건 없어졌다>??
            />
            <Snackbar
                open={toastBal.open}        
                onClose={() => setToastVal({open: false, msg: ''})} //스테이트가 객체라서?
                message={toastBal.msg}
                autoHideDuration={2000} // 몇초만에 내려갈건지 
            />
        </>
    )
}