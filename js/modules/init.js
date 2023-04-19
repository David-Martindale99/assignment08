// init.js module

async function loadEmployees() {
    try {
      const response = await fetch('./data/employees.json');
      const employees = await response.json(); 
      return employees.employees;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
export { loadEmployees }
