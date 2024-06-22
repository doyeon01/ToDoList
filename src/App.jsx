import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { useReducer, useRef, useState, useEffect, createContext } from 'react';


// context 내보내주어야 사용 가능.. 잊지말자
export const TodoContext = createContext();
export const TodoDispatchContext = createContext();

function reducer(state, action) {
  let todos
  switch (action.type) {
    case 'INIT' :
      return action.data
    case 'CREATE': 
      todos = [action.data, ...state];
      break
    case 'UPDATE': 
      todos = state.map(item=> item.id==action.data.id ? 
        {...item, isDone:action.data.isDone, 
          content:action.data.content, 
          createdDate: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })}
           : item) 
        break
    case 'DELETE': 
      todos = state.filter(item => item.id !== action.data)
      break
    default: 
      return state;
    }
    localStorage.setItem('todos',JSON.stringify(todos))
    return todos
}



function App() {
  const [Todo, dispatch] = useReducer(reducer, '');
  const idRef = useRef(0);

  const [filteredData, setfilteredData] = useState(Todo)
  const [searchInput, setSearchInput] = useState('')

  useEffect(()=>{
    const storedData = localStorage.getItem('todos')
    if (!storedData) {
      return
    }
    const parsedData = JSON.parse(storedData) 

    dispatch({
      type:'INIT',
      data:parsedData
    }
    )

  },[])

  // 할 일 추가
  const onCreate = (content) => {
    const createdDate = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        createdDate: createdDate
      }
    });
  };

  // 할 일 수정
  const onUpdate = (id, isDone, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        isDone,
        content
      }
    });
  };



  // 할 일 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      data: id
    });
  };


  return (
    <>
      <TodoContext.Provider value={{Todo,searchInput,filteredData}}>
        <TodoDispatchContext.Provider value={{ onCreate, onUpdate, onDelete, setfilteredData, setSearchInput }}>
        <Header/>
        <Main/>
        <Footer/>      
        </TodoDispatchContext.Provider>
      </TodoContext.Provider>
    </>
  );
}

export default App;
