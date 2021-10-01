import {useState} from 'react';
import './App.css';

function App() {
  //let [count, setCount] = useState(0);
  let [messageText, setMessageText] = useState("");
  let [messageList, setMessageList] = useState([]);
  let baseUrl = "https://pethu-chat.herokuapp.com?message=";
let textChange = (event) => {
  setMessageText(event.target.value);
}
let sendMessage = () => {
  fetch(`${baseUrl}${messageText}`).then((response)=>{return response.json()}).then(data=>setMessageList(data.message))
  setMessageText("");
}

setInterval(() => {
  fetch(`${baseUrl}`).then(response =>{return response.json()}).then(data=>setMessageList(data.message));
}, 1000);

  return (
    <div className="App" onSubmit={sendMessage}>
      <div className="topspace"></div>
      <form className="send-box">
        <input onChange={ textChange } type="text" className="message-input" />
        <input  className="send-button" type="submit"/>
      </form>
      <div className="response-box">
        {messageList.map(message=>{return <div className="texts">{message}</div>})}
      </div>
    </div>
  );
}

export default App;

