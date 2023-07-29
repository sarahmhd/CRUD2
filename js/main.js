let name = document.querySelector("#prod_name");
let category = document.querySelector("#prod_category");
let price = document.querySelector("#prod_price");
let cnt = document.querySelector("#prod_cnt");
let description = document.querySelector("#prod_description");
let searchInput = document.querySelector("#search");
let addBtn = document.querySelector(".add");
let searchName = document.querySelector(".search-name");
let searchCg = document.querySelector(".search-cat");
let deleteAll = document.querySelector(".del-all");
let tableBody = document.querySelector(".products tbody");

let elements = localStorage.getItem("elements")
  ? JSON.parse(localStorage.getItem("elements"))
  : [];

let id = 0;
let tmp;

function validateData() {
  if (
    name.value != "" &&
    category.value != "" &&
    price.value != "" &&
    cnt.value != "" &&
    description.value
  ) {
    document.querySelector(".valid-feedback").style.display = "block";
    setTimeout(() => {
      document.querySelector(".valid-feedback").style.display = "none";
    }, 2000);
    addElements();
  } else {
    document.querySelector(".invalid-feedback").style.display = "block";
    setTimeout(() => {
      document.querySelector(".invalid-feedback").style.display = "none";
    }, 2000);
  }
}

function clearInputsVal() {
  name.value = "";
  category.value = "";
  price.value = "";
  cnt.value = "";
  description.value = "";
  searchInput.value = "";
}

function addElements() {
  let ele = {
    name: name.value,
    cat: category.value,
    price: price.value,
    cnt: cnt.value,
    des: description.value,
  };
  if (cnt.value > 1) {
    for (let i = 0; i < cnt.value; i++) {
      elements.push(ele);
    }
  } else {
    elements.push(ele);
  }
  addToLocal(elements);
  clearInputsVal();
  addItemsToPage(elements);
}

function addToLocal(item) {
  localStorage.setItem("elements", JSON.stringify(item));
}

function addItemsToPage(elements) {
  tableBody.innerHTML = "";
  id = 0;
  elements.forEach((el) => {
    tableBody.innerHTML += `
              <tr id="${id}">
                <td>${id + 1}</td>
                <td>${el.name}</td>
                <td>${el.cat}</td>
                <td>${el.price}</td>
                <td>${el.des}</td>
                <td>
                  <button class="btn del">delete</button>
                </td>
                <td>
                  <button class="btn edit">edit</button>
                </td>
              </tr>

    `;
    el.id = id;
    id++;
  });
}

addItemsToPage(elements);

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (addBtn.innerHTML == "add") {
    validateData();
  } else {
    elements[tmp].name = name.value;
    elements[tmp].cat = category.value;
    elements[tmp].price = price.value;
    elements[tmp].cnt = cnt.value;
    elements[tmp].des = description.value;
  }
});

searchName.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.focus();
  searchInput.placeholder = "Search By Name";
});

searchCg.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.focus();
  searchInput.placeholder = "Search By Category";
});

searchInput.addEventListener("input", () => {
  if (searchInput.value != "") {
    if (searchInput.placeholder.includes("Name")) {
      let searchElements = elements.filter((el) =>
        el.name.includes(searchInput.value)
      );
      addItemsToPage(searchElements);
    } else if (searchInput.placeholder.includes("Category")) {
      let searchElements = elements.filter((el) =>
        el.cat.includes(searchInput.value)
      );
      addItemsToPage(searchElements);
    }
  } else {
    addItemsToPage(elements);
  }
});

deleteAll.addEventListener("click", (e) => {
  localStorage.clear();
});

tableBody.addEventListener("click", (e) => {
  let target = e.target;
  let parent = target.parentElement.parentElement;
  if (target.innerHTML.includes("del")) {
    elements = elements.filter((el) => el.id != parent.id);
    addToLocal(elements);
    parent.remove();
    addItemsToPage(elements);
  } else if (target.innerHTML.includes("edit")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let editedItem = elements.filter((el) => el.id == parent.id);

    name.value = editedItem[0].name;
    category.value = editedItem[0].cat;
    price.value = editedItem[0].price;
    cnt.value = editedItem[0].cnt;
    description.value = editedItem[0].des;

    addBtn.innerHTML = "update";
    elements.forEach((el, i) => {
      if (i == parent.id) {
        tmp = i;
      }
    });
    addBtn.addEventListener("click", (e) => {
      if (addBtn.innerHTML == "update") {
        // fillData(editedItem[0]);

        addToLocal(elements);

        addItemsToPage(elements);

        clearInputsVal();

        addBtn.innerHTML = "Add";
      }
    });
  }
});
