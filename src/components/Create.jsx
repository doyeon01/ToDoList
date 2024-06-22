import { useState, useContext } from "react"
import { TodoDispatchContext } from "../App"
import './Create.css'

const Create = () => {
  const [input, setInput] = useState('')
  const {onCreate} = useContext(TodoDispatchContext)

  const onHandleInput = (e) => {
    setInput(e.target.value)
   
  }

  const onHandleClick = () => {
    if (input === '') {
      return
    }
    onCreate(input)
    setInput('')
  }

  const onHandleEnter = (e) => {
    if (input === '') {
      return
    }
    if (e.key==='Enter') {

      onCreate(input)
      setInput('')
    } 
  }

  return (
  <>
  <div className="Create">
    <input spellCheck="false" value={input} onChange={onHandleInput} onKeyPress={onHandleEnter} placeholder="할 일을 입력하세요."/>
    <button onClick={onHandleClick}>추가</button>
  </div>
  </>
)
}

export default Create