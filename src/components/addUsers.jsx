import React, { useState } from "react";
import api from "../API";

const AddUsers = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    let newUsers = users.filter(user => {
      if(user._id !== userId){
        return user;

      }
    })
    setUsers(newUsers);
  };

  const renderPharse = (number) => {
    if(number === 0){
      return (
        <span className="badge bg-danger">никто с тобой не тусанет</span>
      )
    }
    if(number > 1 && number <5){
      return (
        <span className="badge bg-primary">{number} человека тусанут с тобой сегодня</span>
      )
    }
    return (
      <span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span>
    )
  };
      
const styleMainText = {
  textAlign: 'center',
  width: '28vw',
  margin: '15px auto',
  fontSize: '26px',
}

const styleWhite = {
  color: "white",
  margin: "8px",
  borderRadius: '5px',
  padding: '4px',
  background: '#DC3545' 
}

  const ViewUsersTable = () => {
      return (
        <>
        <h1 style={styleMainText}>{renderPharse(users.length)}</h1>
          <table className="table table-info table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => 
                <tr key={user._id} id={user._id}>
                    <td >{user.name}</td>
                    <td >{user.profession.name}</td>
                    {user.qualities.length === 1?
                    <td><span style={styleWhite} className={'bg-' + user.qualities[0].color}>{user.qualities[0].name}</span></td>:
                    <td>{user.qualities.map(e => <span key={e.name} style={styleWhite} className={'bg-' + e.color}>{e.name + ' '}</span>)}</td>}
                    <td >{user.completedMeetings}</td>
                    <td >{user.rate}</td>
                    <td >
                      <button  onClick={() => handleDelete(user._id)} style={styleWhite}>delete</button>
                    </td>
                </tr>     
              )}
            </tbody>
          </table>
        </>
  )
  }
  return  <ViewUsersTable />
};
export default AddUsers;
