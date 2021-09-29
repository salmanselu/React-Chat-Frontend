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
  fetch(`${baseUrl}`).then(response =>{return response.json()}).then(data=>console.log(data));
}, 1000);

  return (
    <div className="App">
      <div className="send-box">
        <input onChange={ textChange } type="text" className="message-input" />
        <button onClick={sendMessage} className="send-button">send</button>
      </div>
      <div className="response-box">
        {messageList.map(message=>{return <div>{message}</div>})}
      </div>
    </div>
  );
}

export default App;

