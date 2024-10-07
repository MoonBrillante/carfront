import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {  deleteCar } from '../api/carapi';
import { CarResponse } from '../types';
import axios from 'axios';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import AddCar from './AddCar';
import EditCar from './EditCar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type CarlistProps = {
    logOut?: () => void;
    }

function Carlist({logOut}: CarlistProps) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    // 定义异步函数来获取汽车数据
    const getCars = async (): Promise<CarResponse[]> => {
        const response = await axios.get<{ _embedded: { cars: CarResponse[] } }>('http://localhost:8080/api/cars');
        return response.data._embedded.cars;
    };

    // use useQuery hook
    const { data, error, isSuccess } = useQuery<CarResponse[]>({
        queryKey: ['cars'],
        queryFn: getCars,
    });

    // use useMutation delete car
    const { mutate } = useMutation<void, Error, string>(deleteCar, {
        onSuccess: () => {
            setOpen(true);  // when success delete show Snackbar
            queryClient.invalidateQueries({ queryKey: ['cars'] });  // 重新获取数据
        },
        onError: (err) => {
            console.error(err);  // handle error
        },
    });
    

    // table column
    const columns: GridColDef[] = [
        { field: 'brand', headerName: 'Brand', width: 200 },
        { field: 'model', headerName: 'Model', width: 200 },
        { field: 'color', headerName: 'Color', width: 200 },
        { field: 'registrationNumber', headerName: 'Reg. Nr.', width: 150 },
        { field: 'modelYear', headerName: 'Model Year', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) =>
            <EditCar cardata={params.row} />
            },
        
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton aria-label = "delete" size="small" 
                    onClick={() => {
                        if (window.confirm(`Are you sure you 
                        want tdelete
                        ${params.row.brand} ${params.row.model}?`))
                        mutate(params.row._links.car.href)}
                    }
                    >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            ),
        }
    ];

    // if data is loading, show Loading
    if (!isSuccess) {
        return <span>Loading...</span>;
    } else if (error) {
        return <span>Error when fetching cars...</span>;
    }
    else {
        return (
            <>  
                <Stack direction="row" alignItems="center"
                justifyContent="space-between">
                <AddCar />
                <Button onClick={logOut}>Log out</Button>
                </Stack>
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={(row) => row._links.self.href}
                    slots={{toolbar: GridToolbar}}
                    autoHeight
                    sx={{
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        }
                    }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car deleted" />
            </>
        )
    }
}

export default Carlist;


