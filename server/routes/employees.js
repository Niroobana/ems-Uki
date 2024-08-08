const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
// comment 
// Create Employee
router.post('/', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.status(201).send(employee);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update Employee
router.patch('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Search Employees
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const employees = await Employee.find({ name: new RegExp(query, 'i') });
    res.send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
