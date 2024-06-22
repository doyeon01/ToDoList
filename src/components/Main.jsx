import { useContext, useState, useEffect } from "react"
import Create from "./Create";
import Search from "./Search";
import Todoitem from "./Todoitem"
import { TodoContext } from "../App";
import { TodoDispatchContext } from "../App";
import './Main.css'
const Main = () => {
  const {Todo, filteredData, searchInput}  = useContext(TodoContext)
  const {setfilteredData} = useContext(TodoDispatchContext)

  useEffect(() => {
    if (Todo) {
      setfilteredData(Todo.filter(item => item.content.includes(searchInput)));
    }
  }, [Todo]);

  const handleSearch = () => {
    setfilteredData(Todo.filter(item=>item.content.includes(searchInput)))
  }
  
  return (
  <>
    <div className="Main">
      <Create/>
      <Search handleSearch={handleSearch}/>
      
      {filteredData.length > 0 ? (
            filteredData.map(todo => <Todoitem key={todo.id} todo={todo} />)
          ) : (
            <div className="NoTodo">할 일이 없습니다</div>
          )}
    </div>

  </>
  )
}


export default Main