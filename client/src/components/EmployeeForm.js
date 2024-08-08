import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee = {}, onAdd }) => {
  const [formEmployee, setFormEmployee] = useState({
    name: '',
    position: '',
    office: '',
    salary: ''
  });

  useEffect(() => {
    if (employee) {
      setFormEmployee(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEmployee({
      ...formEmployee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(formEmployee);
      setFormEmployee({
        name: '',
        position: '',
        office: '',
        salary: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formEmployee.name} onChange={handleChange} />
      <input type="text" name="position" placeholder="Position" value={formEmployee.position} onChange={handleChange} />
      <input type="text" name="office" placeholder="Office" value={formEmployee.office} onChange={handleChange} />
      <input type="number" name="salary" placeholder="Salary" value={formEmployee.salary} onChange={handleChange} />
      <button type="submit">{employee._id ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
};
// comment
export default EmployeeForm;
