import {useState} from 'react';
import './App.css';

function App() {
  //let [count, setCount] = useState(0);

  let [messageText, setMessageText] = useState("");
  let [messageList, setMessageList] = useState([]);
  let [username, setUsername] = useState(null);
  let baseUrl = "https://pethu-chat.herokuapp.com";
let textChange = (event) => {
  setMessageText(event.target.value);
}
let sendMessage = (event) => {
  event.preventDefault();
  fetch(`${baseUrl}?message=${messageText}&username=${username}`).then((response)=>{return response.json()}).then(data=>setMessageList(data))
  setMessageText("");
}

let usernameSetting = () => {
  setUsername(messageText);
  setMessageText("");
}

setInterval(() => {
  fetch(`${baseUrl}`).then(response =>{return response.json()}).then(data=>setMessageList(data));
}, 2000);

  return (
    <div className="App">
    { username !== null && 
    <div>
      <div className="topspace">
        <form className="send-box" onSubmit={sendMessage}>
          <input onChange={ textChange } type="text" className="message-input" />
          <input  className="send-button" type="submit"/>
        </form>
      </div>
      <div className="response-box">
        {messageList.map(message=>{
          return  <div className="texts">
           <div className="username">{message.username}:</div>
           <div className="text">{message.message}</div>
          </div>
          })}
      </div>
    </div>
    } 
    { username === null && 
    <>
      <div className="topspace">
        <h1 className="username-heading">Set Username</h1>
        <form className="send-box" onSubmit={usernameSetting}>
          <input onChange={ textChange } type="text" className="message-input" />
          <input  className="send-button" type="submit"/>
        </form>
      </div>
    </>
    } 
    </div>

  );
}

export default App;

