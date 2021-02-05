import { useState, useEffect } from "react";

function MessageForm(props) {
  const { getList } = props;
  const [text, setText] = useState("");
  const [alias, setAlias] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submitForm = () => {
    if (text.length === 0 || alias.length === 0) {
      return;
    }
    setDisabled(true);
    fetch("http://localhost:3001/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, alias }),
    }).then((resp) => {
      if (resp.status === 201) {
        getList();
        setText("");
        setAlias("");
      }
      setDisabled(false);
    });
  };

  return (
    <div>
      <label>Alias</label>
      <input value={alias} onChange={(e) => setAlias(e.target.value)} />
      <label>Message</label>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={disabled} onClick={() => submitForm()}>
        Submit
      </button>
    </div>
  );
}

export default MessageForm;
