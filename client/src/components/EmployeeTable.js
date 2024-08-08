import React from 'react';

const EmployeeTable = ({ employees, onDelete, onUpdate }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>{employee.office}</td>
            <td>{employee.salary}</td>
            <td>
              <button className="edit" onClick={() => onUpdate(employee)}>Edit</button>
              <button className="delete" onClick={() => onDelete(employee._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
