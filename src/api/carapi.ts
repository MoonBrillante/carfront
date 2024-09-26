import { CarResponse, Car, CarEntry }  from '../types';
import axios from 'axios';

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
  return response.data._embedded.cars;
}

//export const deleteCar = async (link: string): Promise<CarResponse> => {
//  const response = await axios.delete(link);
//  return response.data
//}
// 将 deleteCar 修改为返回 void，因为 DELETE 操作通常不返回实体数据
export const deleteCar = async (link: string): Promise<void> => {
  await axios.delete(link);
}

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, {
    headers: { 'Content-Type': 'application/json', },
  });

  return response.data;
}

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
    'Content-Type': 'application/json'
    },
  });
  
  return response.data;
}