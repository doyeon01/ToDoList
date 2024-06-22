import './Header.css';
import { useContext } from 'react';
import { TodoContext, TodoDispatchContext } from '../App';

const Header = () => {
  const { Todo } = useContext(TodoContext);
  const { setfilteredData, setSearchInput } = useContext(TodoDispatchContext);

  const onHandleGoHome = () => {
    setfilteredData(Todo);
    setSearchInput('');
  };

  const options = ({ 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  });

  return (
    <div className='Header' onClick={onHandleGoHome}>
      {new Date().toLocaleDateString('ko-KR',options)}
    </div>
  );
};

export default Header;
