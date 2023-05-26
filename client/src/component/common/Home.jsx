import { useEffect, useState } from "react";
import Header from "./Heaser";
import "./Home.css";

function Home() {
  const [title, setTitle] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user")
      .then((res) => res.json())
      .then((data) => setTitle(data.users))
      .then((err) => console.log(err));
  }, []);
  console.log(title);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/v1/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User deleted successfully:", data);
        setUsers(users.filter((user) => user.users_id !== id));
        window.location.reload();
      })
      .catch((error) => {
        console.log("An error occurred while deleting the user:", error);
      });
  };
  // const handleUpdate = (id) => {
  //   const updateData = {
  //     content: "Updated content",
  //     date: "Updated date",
  //     status: "Updated status",
  //     user_name: "Updated username",
  //   };
  //   fetch(`http://localhost:3000/api/v1/user/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updateData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("update success", data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <div>
      <Header />
      {/*  */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
            <th scope="col">Name</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {title.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.users_id}</th>
              <td>{user.content}</td>
              <td>{user.date}</td>
              <td>{user.status}</td>
              <td>{user.user_name}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.users_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  DELETE
                </button>
                <button
                  // onClick={() => handleUpdate(user.users_id)}
                  type="button"
                  className="btn btn-success"
                  style={{ marginLeft: 20 }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
