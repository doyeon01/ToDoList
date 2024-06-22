
#  🍀 TodoList


## 🧾 목차


1. [🔖 프로젝트 간단 설명](#-프로젝트-간단-설명)
2. [💻 배포링크](#-배포링크)
3. [🎞 미리보기](#-미리보기)
4. [🗂 프로젝트의 기능](#-프로젝트의-기능)
5. [💬 오류, 배운 점 정리](#-오류-배운-점-정리)

<br>

## 🔖 프로젝트 간단 설명
- **프로젝트 기간**: 2024/06/19 ~ 2024/06/21(3일)

- **아이디어**: 오늘 해야 할 일을 작성, 수정, 삭제할 수 있는 웹 애플리케이션

- **사용 기술**: Html, CSS, JavaScript, React, Vercel

- **목적**: 비동기 프로그래밍과 상태 관리를 포함한 프론트엔드 개발의 핵심 개념을 실습하며, 실생활에 유용한 웹 애플리케이션을 만들어가는 경험 쌓기

<br>

## 💻 배포링크
🖱 [todolist](https://todo-list-ten-ivory.vercel.app/)   

<br>

## 🎞 미리보기


![preview](https://github.com/doyeon01/TodoList/assets/156388715/f8cacb15-8496-4440-b0d5-ad475cad23b6)
<br>

## 🗂 프로젝트의 기능
- todo 추가
- todo 삭제
- todo 수정
- todo 검색
- memo 작성

<br>

## 💬 오류, 배운 점 정리

-  input 값이 변할 때 상태관리함수를 사용하여 input 값을 갱신시켰음
그런데 input 변수 변화 x 
-> onHandleInput 함수에서 setInput 호출 시, 인자값으로 e.target.value를 사용하지 않았기 때문. 

```
 const Create = () => {
  ...
  const onHandleInput = (e) => {
    setInput(e.target.value)
  
  }
...
  return (
  <>
  <div>
    <input value={input} onChange={onHandleInput}/>
    <button onClick={onHandleClick}>등록</button>
  </div>
  </>
)
}


```

<br>


- Todo의 요소를 하나씩 TodoItem으로 보내는 코드 작성 희망. 하지만 수정 전 코드는 props에 함수가 들어감. -> jsx 문법으로 요소 하나씩 TodoItem으로 넘겨줘야 함. 그리고 각 객체는 구별되어야 하니까 key값도 적어줘야 함.
   

```
<Todoitem todo={()=>Todo.map(element => {element})}/>
```

```
 {Todo.map(todo => <Todoitem key={todo.id} todo={todo} />)}
```


<br>

-  searchInput이 비어 있으면 item.content.includes(searchInput) 조건이 항상 true가 되어 모든 Todo 항목이 포함. JavaScript에서 빈 문자열 ''를 포함하는 문자열을 확인하면 항상 true를 반환. 따라서 searchInput이 비어 있는 경우에도 모든 항목이 필터링 없이 렌더링 됨

```
  const filteredData = searchInput ? Todo.filter(item=>item.content.includes(searchInput)) : Todo
  const filteredData = Todo.filter(item=>item.content.includes(searchInput))
```
 
<br>

-  검색단어를 입력하고 엔터나 버튼을 눌렀을 때에만 해당 내용이 필터링 되어서 나오게 하기 위해, filterDate라는 state 변수를 만들고 이벤트 발생 시, handleSearch() 함수를 호출하도록 했음. 처음에는 Create 컴포넌트에 handleSearch() 함수를 props 하여 할 일 생성 시, 호출하도록 했음.(search와 비슷하게) 그러다보니, 데이터 생성+추가 시에, 변화된 Todo가 동기적으로 렌더링 되지 않았음.

     handleSearch 함수가 onCreate 함수가 비동기적으로 상태를 업데이트한 후에 호출되기 때문. 리액트 상태 업데이트는 비동기적으로 처리되므로, handleSearch가 호출될 때 Todo 상태가 아직 최신으로 업데이트되지 않은 상태일 수 있음.

     그래서 useEffect 훅을 사용하여, Todo가 변했을 때 filteredData 상태 최신업데이트 해주었음

```
 useEffect(() => {
    setfilteredData(Todo.filter(item => item.content.includes(searchInput)));
  }, [Todo]);

  const handleSearch = () => {
    setfilteredData(Todo.filter(item=>item.content.includes(searchInput)) )
  }
```
<br>

- textarea에 포커스를 제거하려면, DOM요소를 조작해야했음. 
글자 아래 붉은 밑줄 제거는 textarea에 spellcheck="false" 속성을 추가하면 됨(맞춤법 제거)


```
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
      }
    }
  };

```

<br>

- 필터링된 데이터가 없을 경우, 할 일이 없다는 문구를 렌더링 하고 싶었음. 
처음에 Main 컴포넌트가 아닌 Todoitem 컴포넌트에 삼항연산자를 사용하여 코드를 작성했었음. 하지만 어떤 이유에서 인지 문구가 렌더링 되지 않아서, 
Main 컴포넌트에 적었음. 이렇게 코드를 작성하는 게 적합하다고 느낌. 


```
  <Create/>
  <Search handleSearch={handleSearch}/>
  {filteredData.length > 0 ? (
        filteredData.map(todo => <Todoitem key={todo.id} todo={todo} />)
      ) : (
        <div>할 일이 없습니다</div>
      )}
  </>
  )

```





