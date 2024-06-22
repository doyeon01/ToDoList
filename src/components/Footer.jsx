import './Footer.css'
import { useState, useRef, useEffect } from "react";

const Footer = () => {
  const [textMemo, setTextMemo] = useState('');
  const textareaRef = useRef(null);

  const onHandleMemo = (e) => {
    setTextMemo(e.target.value);
  };

  const onHandleCursor = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // 기본 엔터 키 동작 방지
      
      // textarea에서 포커스 제거
      if (textareaRef.current) {
        textareaRef.current.blur();

      localStorage.setItem('memo',textMemo)
      }
    }
  };

  useEffect(()=>{
    const storedMemo = localStorage.getItem('memo')
    if (!storedMemo) {
      return
    }
    setTextMemo(storedMemo)
  },[])

  return (
    <>
    <div className='Footer'>
      <textarea 
        spellCheck="false"
        ref={textareaRef}
        placeholder="memo"
        value={textMemo}
        onChange={onHandleMemo}
        onKeyPress={onHandleCursor}
      ></textarea>
    </div>
    </>
  );
};

export default Footer;
