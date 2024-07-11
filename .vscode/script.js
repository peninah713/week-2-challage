let shoppingList = [];
let selectedIndex = -1;

const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const markPurchasedBtn = document.getElementById('markPurchasedBtn');
const editBtn = document.getElementById('editBtn');
const clearBtn = document.getElementById('clearBtn');
const shoppingListEl = document.getElementById('shoppingList');

function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function loadFromLocalStorage() {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        shoppingList = JSON.parse(savedList);
        renderList();
    }
}

function renderList() {
    shoppingListEl.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        if (index === selectedIndex) {
            li.classList.add('selected');
        }
        li.addEventListener('click', () => selectItem(index));
        shoppingListEl.appendChild(li);
    });
    saveToLocalStorage();
}

function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingList.push({ name: itemName, purchased: false });
        itemInput.value = '';
        renderList();
    }
}

function selectItem(index) {
    selectedIndex = index;
    renderList();
}

function markPurchased() {
    if (selectedIndex !== -1) {
        shoppingList[selectedIndex].purchased = !shoppingList[selectedIndex].purchased;
        renderList();
    }
}

function editItem() {
    if (selectedIndex !== -1) {
        const newName = prompt("Edit item:", shoppingList[selectedIndex].name);
        if (newName !== null && newName.trim() !== "") {
            shoppingList[selectedIndex].name = newName.trim();
            renderList();
        }
    }
}

function clearList() {
    shoppingList = [];
    selectedIndex = -1;
    renderList();
}

addBtn.addEventListener('click', addItem);
markPurchasedBtn.addEventListener('click', markPurchased);
editBtn.addEventListener('click', editItem);
clearBtn.addEventListener('click', clearList);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

// Load saved list on page load
loadFromLocalStorage();
