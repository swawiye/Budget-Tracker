let expenses = [];
let totalAmount = 0;

//'window'- for the webpage
window.onload = function () {
    loadExpenseCookies();
};

const categorySelect = document.getElementById('category-select');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Add transaction button
addBtn.addEventListener('click', function() {
    const category = categorySelect.value; // Select category (Income or Expense)
    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Input validation
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (description === '') {
        alert('Please enter an appropriate description');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Create expense object
    const expense = { category, description, amount, date };

    // Add the expense to the expenses array
    expenses.push(expense);

    // Update the total amount
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    // Create a new row in the table
    const newRow = expensesTableBody.insertRow();

    // Insert table cells for each property
    const categoryCell = newRow.insertCell();
    const descriptionCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    
    // Create a delete button for this row
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Delete button functionality
    deleteBtn.addEventListener('click', function() {
        // Find the index of the expense to delete
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            // Remove the expense from the array
            expenses.splice(index, 1);
            // Update the total amount
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount.toFixed(2);
            // Remove the row from the table
            expensesTableBody.removeChild(newRow);
        }
    });

    // Append delete button to the delete cell
    deleteCell.appendChild(deleteBtn);

    // Set the content of the table cells
    categoryCell.textContent = expense.category;
    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;
});


// Update the table with existing expenses on page load
function updateTable() {
    expensesTableBody.innerHTML = '';  // Clear the table
    totalAmount = 0;  // Reset the total amount

    // Loop through all transactions and add them to the table
    for (const expense of expenses) {
        // Create a new row in the table
        const newRow = expensesTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const descriptionCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        
        deleteBtn.addEventListener('click', function() {
            // Remove the expense from the array
            const index = expenses.indexOf(expense);
            if (index !== -1) {
                expenses.splice(index, 1);
                totalAmount -= expense.amount;
                totalAmountCell.textContent = totalAmount.toFixed(2);
                expensesTableBody.removeChild(newRow);
            }
        });

        // Set the content of the table cells
        categoryCell.textContent = expense.category;
        descriptionCell.textContent = expense.description;
        amountCell.textContent = expense.amount.toFixed(2);
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }

    totalAmountCell.textContent = totalAmount.toFixed(2);
}

// Call updateTable on page load to show any existing expenses
updateTable();

//COOKIES
// Set the expiry of a cookie(typically lasts a year)- Expiry = 60 * 60 * 24 * 365
//Domain- example.com
//Path- /(means the root)
//Secure- 'http://'(insecure site), 'https://'(secure site) 

document.getElementsById('transaction-form').addEventListener('button', function (e) {
    e.preventDefault();//Prevents reloading of the page on submission of the form
    const category = document.getElementById('category-select').value;
    const description = document.getElementById('description').value.trim();//Remove the whitespaces
    const rawAmount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;

    if (!description || isNaN(rawAmount)) return;
    const amount = category === 'expense' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

    const transaction = {
        id: Date.now(), //set an ID for each item
        description,
        amount,
        date,
    };

    expenses.push(transaction);
    saveExpensesToCookies();
    loadExpenseCookies();
});

function saveExpensesToCookies() {
    //Saving the cookies
    document.cookie = `
    expenses=${JSON.stringify(expenses)}; 
    path=/;
    max-age=3600;` //'transactions'- the key, 'path'- setting the path, 'max-age'- setting the expiry, 'JSON'- set the cookie into strings
};

function loadExpenseCookies() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('expenses='));
    if(cookie) {
        expenses = JSON.parse(cookie.split('=')[1]);
        expenses = []; //set up an empty array that will store the cookies
    }
};
console.log(expenses);
  







