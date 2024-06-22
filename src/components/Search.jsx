import { TodoContext } from "../App"
import { TodoDispatchContext } from "../App"
import { useContext } from "react"
import './Search.css'
const Search = ({handleSearch}) => {

  const {searchInput} = useContext(TodoContext)
  const {setSearchInput} = useContext(TodoDispatchContext)
  
  const onHandleSearchInput = (e) => {
    setSearchInput(e.target.value)

  }
  const onHandleSearchClick = () => {
    if (searchInput === '') {
      return
    }
    handleSearch()
    

  }
  const onHandleSearchKey = (e) => {
    if (searchInput === '') {
      return
    }
    if (e.key === "Enter") {
    onHandleSearchClick()
    
   }
  }
  return (
  <>
  <h3> 🍀 Todo List  </h3>
  <div className="Search">
    <input spellCheck="false" value={searchInput} onChange={onHandleSearchInput} onKeyPress={onHandleSearchKey} placeholder="검색어를 입력하세요."/>
    <button onClick={onHandleSearchClick}>검색</button>
  </div>
  </>
)
}


export default Search