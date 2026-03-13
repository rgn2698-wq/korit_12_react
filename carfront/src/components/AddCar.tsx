import { Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material"
import { Car } from "../types"
import { useState } from "react"
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddCar() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: (err) => console.log(err),
  });




  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });
  
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const handleSave = () => {
    mutate(car);    // carapi에 있는 addCar() 함수에 해당
    setCar({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
    })
    handleClickClose();
  }


  return (
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <input type="text" placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/><br />
          <input type="text" placeholder="Model" name="model" value={car.model} onChange={handleChange}/><br />
          <input type="text" placeholder="Color" name="color" value={car.color} onChange={handleChange}/><br />
          <input type="text" placeholder="RegistrationNumber" name="registrationNumber" value={car.registrationNumber} onChange={handleChange}/><br />
          <input type="number" placeholder="ModelYear" name="modelYear" value={car.modelYear} onChange={handleChange}/><br />
          <input type="number" placeholder="Price" name="price" value={car.price} onChange={handleChange}/><br />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClickClose}>취소</button>
          <button onClick={handleSave}>저장</button>
        </DialogActions>
      </Dialog>
    </>
  )
}