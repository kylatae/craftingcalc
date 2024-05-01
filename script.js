// Load JSON data
fetch('./craftable.json')
  .then(response => response.json())
  .then(craftableItems => populateCraftableList(craftableItems));

fetch('./items.json')
   .then(response => response.json())
   .then(allItems => storeAllItems(allItems));


// Data storage
let craftingItems = []; 
let itemData = {};
console.log(craftingItems)
// Function to populate the select dropdown
function populateCraftableList(items) {
    craftingItems = items; // Store craftable items data 

    const selectList = document.getElementById('craftable-items');
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.Name;
        option.textContent = item.Name;
        selectList.appendChild(option);
    });

    selectList.addEventListener('change', displayRecipe); 
}

// Store all item info
function storeAllItems(items) {
    itemData = items.reduce((acc, item) => {
       acc[item.Name] = item;
       return acc;
    }, {});
}

// Display the recipe
function displayRecipe() {
    const selectedItemName = document.getElementById('craftable-items').value;
    const selectedItem = craftingItems.find(item => item.Name === selectedItemName);

    const recipeDetails = document.getElementById('recipe-details');
    recipeDetails.innerHTML = ''; // Clear previous recipe

    // Recipe Header
    const recipeHeader = document.createElement('h2');
    recipeHeader.textContent = `Craft ${selectedItem.Name}`;
    recipeDetails.appendChild(recipeHeader);

    // Ingredient List
    const ingredientList = document.createElement('ul');
    selectedItem.Recipe.forEach((ingredient, index) => {
        if (index % 2 === 0) { // Even indices are ingredient names
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient} x${selectedItem.Recipe[index + 1]}`;

            // Add tooltip functionality
            listItem.addEventListener('mouseover', () => showTooltip(ingredient));
            listItem.addEventListener('mouseout', hideTooltip);

            ingredientList.appendChild(listItem);
        }
    });
    recipeDetails.appendChild(ingredientList);

    // Workbench
    const workbench = document.createElement('p');
    workbench.textContent = selectedItem.Workbench[0]; 
    recipeDetails.appendChild(workbench);
}

function showTooltip(ingredientName) {
  const item = itemData[ingredientName];

  // Create tooltip element (modify styling as needed)
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip'); 
  tooltip.innerHTML = `
    <strong>Name:</strong> ${item.Name}<br>
    <strong>Type:</strong> ${item.Type}<br>
    <strong>Obtain:</strong> ${item.Obtain.join(', ')}<br>
    <strong>Description:</strong> ${item.Description}
  `;
  document.body.appendChild(tooltip);

  // Position tooltip near the mouse (implementation omitted for brevity) 
  // ...
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) tooltip.remove();
}

