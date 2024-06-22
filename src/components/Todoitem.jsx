import { useContext, useState } from "react";
import { TodoDispatchContext } from "../App";
import './Todoitem.css';

const Todoitem = ({ todo }) => {
  
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editedContent, setEditedContent] = useState(todo.content); // 수정된 내용을 관리하는 상태

  const onHandleDelete = () => {
    onDelete(todo.id);
  };

  const onHandleDoubleClick = () => {
    setIsEditing(true); // 더블 클릭 시 수정 모드로 변경
  };

  const onHandleContentChange2 = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (editedContent.trim() === '') {
        setIsEditing(false);
      } else {
        onUpdate(todo.id, todo.isDone, editedContent);
        setIsEditing(false); // 수정모드 종료
      }
    }
  };
  const onhandleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const onHandleCheckboxChange = () => {
    onUpdate(todo.id, !todo.isDone, todo.content); 
  };

  // console.log(todo)
  return (
    <div className="itembox">
        <>
      
        <input className="isDone"
          type="checkbox"
          checked={todo.isDone}
          onChange={onHandleCheckboxChange}/>
          
          <div  className="Todo" onDoubleClick={onHandleDoubleClick}>
            {isEditing ? (
              <div className="Edit">
                <input className="EditInput"
                  
                  spellCheck="false"
                  type="text"
                  value={editedContent}
                  onChange={onhandleContentChange}
                  onKeyPress={onHandleContentChange2}
                  autoFocus 
                />
                  <button className="EditButton" onClick={onHandleContentChange2}>완료</button>
              </div>
            ) : (
              <div >
                {todo.content}
              </div>
            )}
          </div>
          <div className="Date">{todo.createdDate}</div>
          <button className="DeleteButton" onClick={onHandleDelete}>삭제</button>
        </>
    </div>
  );
};

export default Todoitem;
