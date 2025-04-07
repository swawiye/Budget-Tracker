let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');
const totalAmountCell = document.getElementById('total-amount');

//Add transaction button
addBtn.addEventListener('click', function() {
    const category = categorySelect.ariaValueMax;
    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    //Input validation
    if(category === '') {
        alert('Please select a category');
        return;
    }
    if(description === '') {
        alert('Please enter an appropriate description');
        return;
    }
    if (isNaN(amount) || amount <=0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    //Create expense object
    const expense = {category, description, amount, date};
    expenses.push(expense);

    //Update the total amount
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    //Create a new row in the table
    const newRow = expensesTableBody.insertRow();

    //Insert table cells for each property
    const categoryCell = newRow.insertCell();
    const descriptionCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        // Remove the expense from the array and update the total amount
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1);
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;
            expensesTableBody.removeChild(newRow);
        }
    });

    // Set the content of the table cells
    categoryCell.textContent = expense.category;
    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});


//Used to update the table
for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const categoryCell = newRow.insertCell();
    const descriptionCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    categoryCell.textContent = expense.category;
    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
};