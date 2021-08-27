import React, { useState } from "react";
import api from "../API";

const AddUsers = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  let color = users[1].qualities[2].color;
  // const handleDelete = (userId) => {
    
    // };
    const RanderPharse = (number) => {
      return <h1>12 человек тусанет с тобой сегодня</h1>
      };

  const styleWhite = {
    color: "white",
    margin: "8px",
    borderRadius: '5px',
    padding: '4px' 
  }

  const ViewUsersTable = () => {
      return (
          users.map(el => 
          <>
            <tr>
                <td key={el.name}>{el.name}</td>
                <td key={el.profession.name}>{el.profession.name}</td>
                {el.qualities.length === 1?
                <td><span style={styleWhite} className={'bg-' + el.qualities[0].color}>{el.qualities[0].name}</span></td>:
                <td>{el.qualities.map(e => <span style={styleWhite} className={'bg-'+e.color}>{e.name+' '}</span>)}</td>}
                <td key={el.completedMeetings}>{el.completedMeetings}</td>
                <td key={el.rate}>{el.rate}</td>
                <td >
                  <button className={'bg-'+ color} style={styleWhite}>delete</button>
                </td>
            </tr>
        </>        
        )
        )
  }
  return (
    <>
    <RanderPharse/>
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
          <ViewUsersTable />
        </tbody>
      </table>
    </>
  );
};
export default AddUsers;
