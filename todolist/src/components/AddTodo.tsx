import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

type AddTodoProps = {
  addTodo : (todo:string) => void;
}

export default function AddTodo(Todos : AddTodoProps) {
  const [ open,setOpen ] = useState(false);
  const [ taskText,setTaskText ] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    if (taskText.trim() === '') return;
    props.addTodo(taskText);
    setTaskText('');
    handleClose();
  }


  return (
    <>
<Button onClick={handleOpen} variant="outlined" style={{ marginTop: '5px' }}>
        항목 추가
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 할 일 추가</DialogTitle>
        <DialogContent>
          <TextField 
            value={taskText} 
            label='할 일 내용' 
            margin="dense" 
            fullWidth 
            onChange={e => setTaskText(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleAdd}>
            추가
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>  
  )
}