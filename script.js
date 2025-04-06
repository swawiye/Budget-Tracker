let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const btn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.ariaValueMax;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if(category === '') {
        alert('Please selct a category');
        return;
    }
    if (isNaN(amount) || amount <=0) {
        alert('Please enter a valid number');
        return;
    }
    if (date === '') {
        alert('Please slect a date');
        return;
    }
})