import { useState, useEffect } from "react";
import MessageForm from "./MessageForm.js";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [start, setStart] = useState(0);
  const [size, setSize] = useState(10);

  const getList = () => {
    fetch("http://localhost:3001/api/messages", { method: "GET" })
      .then((resp) => resp.json())
      .then((list) => {
        setMessages(list);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const makeButtons = () => {
    const buttons = [];
    for (let i = 0; i < Math.ceil(messages.length / size); i++) {
      buttons.push(
        <button key={i} onClick={() => setStart(i * size)}>
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <MessageForm getList={getList} />
      <button onClick={() => getList()}>Refresh</button>
      {makeButtons()}
      <select onChange={(e) => setSize(e.target.value)}>
        <option value="10">10</option>
        <option value="45">45</option>
        <option value="100">100</option>
      </select>
      <ul>
        {messages.slice(start, start + size).map((message, index) => {
          return (
            <li key={index}>
              {message.alias} {message.text} {message.postedAt}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MessageList;
