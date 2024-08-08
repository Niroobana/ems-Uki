import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import './App.css'; // Import the CSS file

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const response = await axios.patch(`http://localhost:8000/employees/${updatedEmployee._id}`, updatedEmployee);
      setEmployees(employees.map((employee) => (employee._id === updatedEmployee._id ? response.data : employee)));
      setEditingEmployee(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      {editingEmployee ? (
        <EmployeeForm employee={editingEmployee} onAdd={handleUpdateEmployee} />
      ) : (
        <EmployeeForm onAdd={handleAddEmployee} />
      )}
      <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} onUpdate={handleEditEmployee} />
    </div>
  );
};

export default App;
