function showItems(items) {
  const itemList = document.querySelector("#items");
  itemList.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function sortItems(event, items) {
  const dataValue = event.target.dataset.value;
  if (!dataValue) return;
  const filtered = items.filter((v) => {
    if (dataValue === v.color || dataValue === v.type) {
      return true;
    }
  });
  showItems(filtered);
}

function createHTMLString(item) {
  return `
  <li class="item" data-type="${item.type}" data-color="${item.color}">
    <img src="${item.image}" alt="${item.type}" class="item__img" />
    ${item.gender}, ${item.size}
  </li>
  `;
}

function setEventListeners(items) {
  document.querySelector("#logo").addEventListener("click", () => {
    showItems(items);
  });
  document.querySelector("#buttons").addEventListener("click", (event) => {
    sortItems(event, items);
  });
}

// json 파일로부터 data를 받아옴
async function fetchItems() {
  const itemsPath = "../data/data.json";
  try {
    const response = await fetch(itemsPath);
    const itemsObj = await response.json();
    items = itemsObj.items;
    showItems(items);
    setEventListeners(items);
  } catch (error) {
    // Catch Error Here
  }
}

fetchItems();
