import { useState } from "react";

function Header() {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const newData = {
      content: content,
      date: date,
      status: status,
      user_name: name,
    };

    fetch("http://localhost:3000/api/v1/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data submit thanh cong", data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="container-header">
        <div id="item-header" className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Content"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div id="item-header" className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="date"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div id="item-header" className="input-group mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option select="">Status</option>
            <option value="choose">Choose</option>
            <option value="Pending">Pending</option>
            <option value="Fullfill">Fullfill</option>
            <option value="Reject">Reject</option>
          </select>
        </div>

        <div id="item-header" className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button
            style={{ marginBottom: 16 }}
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
