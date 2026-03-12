import { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Box, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import './App.css'

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
const [ todos, setTodos ] = useState<Todo[]>([]);
const [ inputValue, setInputValue ] = useState('');
const [ open, setOpen ] = useState(false);

  // 추가 함수
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, 
        {id: Date.now(),
          text: inputValue.trim(),
          completed: false  // shoppinglist와 다르게 가져감.
        }
      ])
    }


    setInputValue('');
    setOpen(false);
  }
  
  // 완료상태 토글
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed } : todo)
      );
  }

  // 삭제
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)) // 왜 이런지는 .filter() 메서드 확인해볼 것
  }

  // 모달 열리는 부분 정의 (나중에 따로 분리)
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setInputValue('');
  }

  return (
    <>
      <Container maxWidth='sm' sx={{mt: 5}}>
        <Paper elevation={5} sx={{p: 4, borderRadius: 2}}>
          {/** 타이틀 및 추가 버튼 영역 작성 */}
          <Box sx={{display: 'flex' , justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
            <Typography
              variant='h4'
              component='h1'
              color='primary'
              fontWeight='bold'
              sx={{m:0}}
            >
              📝 할 일 목록 📝
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={handleOpenDialog}
              startIcon={<AddIcon/>}
              disableElevation
            >
              추가 하기
            </Button>
          </Box>
          <List>
            {
              todos.map(todo => (
                <ListItem
                  key={todo.id}
                  divider
                  secondaryAction={
                    <IconButton edge='end' aria-label='delete' onClick={() => handleDeleteTodo(todo.id)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                  }
                disablePadding
                >
                  <Checkbox
                    edge='start'
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                <ListItemText
                  primary={todo.text}
                  sx={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
                />
                </ListItem>
              ))
            }
          </List>
          {todos.length > 0 && (
        <Typography variant='body2' color='text.secondary' sx={{ mt: 2, textAlign: 'right' }}>
          전체 {todos.length}개 · 완료 {todos.filter(t => t.completed).length}개
        </Typography>
      )}
        </Paper>
        {/** 추가 버튼 눌럿을때 뜨는 다이얼로그 모달창 */}
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='xs'>
          <DialogTitle>새로운 할 일 추가<AddIcon /></DialogTitle>
          <DialogContent>
            <TextField 
              autoFocus
              margin='dense'
              label='할 일 입력'
              type='text'
              fullWidth
              variant='outlined'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddTodo();
                  setOpen(false);
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>취소</Button>
            <Button onClick={handleAddTodo} variant='contained' >추가</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}

export default App
