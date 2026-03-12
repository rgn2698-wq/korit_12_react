import './App.css'
import { Container, AppBar, Toolbar, List, ListItem, ListItemText, Typography } from '@mui/material'
import AddTodo from './components/AddTodo'
import { useState } from 'react';

export type Todo = {
  id: number;
  task: string;
  completed: boolean;
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

const handleAddTodo = (task: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      task: task,
      completed: false 
    };

    setTodos([newTodo, ...todos]);
  }
  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h3'>
              할일 목록
            </Typography>
          </Toolbar>
        </AppBar>
        <AddTodo addTodo={handleAddTodo} />
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} divider>
              <ListItemText 
                primary={todo.task} 
                secondary={todo.completed ? "완료" : "진행 중"}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  )
}

export default App;
