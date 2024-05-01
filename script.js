// Load JSON data using fetch
fetch('craftable.json')
  .then(response => response.json())
  .then(craftableData => {
    const itemSelect = document.getElementById('item-select');

    // Populate the select list with items from craftable.json
    craftableData.forEach(item => {
      const option = document.createElement('option');
      option.value = item.Name;
      option.text = item.Name;
      itemSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error loading craftable.json:', error));