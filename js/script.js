// app.js module

import { loadEmployees } from '../js/modules/init.js'

// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees')
let empCount    = document.querySelector('#empCount')
let employees   = []
// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
loadEmployees().then((data) => {
    if (data) {
      employees = data;
      buildGrid(employees);
    } else {
      console.error('Failed to load employee data');
    }
  });

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM TABLE AND EMPLOYEES OBJECT
            empTable.deleteRow(rowIndex)
            employees.splice(rowIndex - 1, 1)
            empCount.value = `(${employees.length})`
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid(employees) {
    // CHECK IF EMPLOYEES IS ITERABLE
    if (!employees || !Symbol.iterator in Object(employees)) {
      console.error('Invalid employee data');
      return;
    }
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${employees.length})`;
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of employees) {
      tbody.innerHTML += `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.extension}</td>
          <td>${employee.email}</td>
          <td>${employee.department}</td>
          <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
      `;
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);
  }
  

