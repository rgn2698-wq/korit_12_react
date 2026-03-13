import { CarResponse } from '../types'
import { Car } from '../types';
import axios from 'axios'

// GET
export const getCars = async () : Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles?size=100`);

    return response.data._embedded.cars;
  }

// DELETE
export const deleteCar = async(link: string) => {
  const response = await axios.delete(link);
  return response.data;
}

// POST
export const addCar = async (car: Car) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, car);
  return response.data;
}