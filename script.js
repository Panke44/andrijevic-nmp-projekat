

const promiseOfSomeData = fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    return data;
  });


(async () => {
  let users = [];
  let someData = await promiseOfSomeData; 
  users = someData; 


  let createTable = (array = users, id = "showData") => {
    let col = [];
    for (let i = 0; i < array.length; i++) {
      for (let key in array[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }
    const table = document.createElement("table"); 
    let tr = table.insertRow(-1);

    
    for (let i = 0; i < col.length; i++) {
      let th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    
    for (let i = 0; i < array.length; i++) {
      tr = table.insertRow(-1);
      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = array[i][col[j]];
      }
    }

 
    let element = document.getElementById(id);
    element.innerHTML = "";
    element.appendChild(table);
  };
  createTable();

  let searchBtn = document.getElementById("searchBtn");


  Array.prototype.malaSlova = function () {
    let i;
    for (i = 0; i < this.length; i++) {
      return (this[i] = this[i].toLowerCase());
    }
  };

  searchBtn.addEventListener("click", () => {
    let search = document.getElementById("search");
    let filteredPeople = users.filter(function (currentElement) {
      return (
        currentElement.name
          .split()
          .malaSlova()
          .includes(search.value.split().malaSlova()) ||
        currentElement.email
          .split()
          .malaSlova()
          .includes(search.value.split().malaSlova()) ||
        currentElement.company
          .split()
          .malaSlova()
          .includes(search.value.split().malaSlova()) ||
        currentElement.gender.split().malaSlova() ===
          search.value.split().malaSlova()
      );
    });
    createTable(filteredPeople, "showData2");
    showData.style.display = "none"; 
  });

  let sortAsc = document.getElementById("sortAsc");
  let sortDesc = document.getElementById("sortDesc");

  
  sortAsc.addEventListener("click", () => {
    users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    createTable();
  });
 
  sortDesc.addEventListener("click", () => {
    users.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
    createTable();
  });

  const avgAge = document.getElementById("avgAge");
  const showAvg = document.getElementById("showAvg");


  avgAge.addEventListener("click", () => {
    const startValue = 0;
    const sumAge = users.reduce(
      (previousValue, currentValue) => previousValue + currentValue.age,
      startValue
    );
    showAvg.innerHTML = `Average age is: ${sumAge / users.length}`;
  });

  const showLowSalaries = document.getElementById("showLowSalaries");
  const showHighSalaries = document.getElementById("showHighSalaries");


  showLowSalaries.addEventListener("click", () => {
    let newUsers = [];
    users.forEach((el) => {
      if (el.balance < 2500) {
        newUsers.push(el);
      }
    });
    createTable(newUsers);
  });

  showHighSalaries.addEventListener("click", () => {
    let newUsers = [];
    users.map((el) => {
      if (el.balance > 4000) {
        newUsers.push(el);
      }
    });
    createTable(newUsers);
  });
})();

const modal = document.getElementById("myModal");
const ime = document.getElementById("ime");
const btn1 = document.getElementById("btn1");
const resultDiv = document.getElementById("resultDiv");


(function () {
  modal.style.display = "block";
})();


const modalFunc = () => {
  modal.style.display = "none"; 

  

  ime.value === ""
    ? (resultDiv.innerHTML = `Welcome, guest`)
    : (resultDiv.innerHTML = `Welcome, ${ime.value}`);


  let target = 1500000; 
  let current = 0;
  function countdown() {
    current += 1000;
    let diff = target - current; 
    let min = Math.floor(diff / 1000 / 60); 
    let sec = (diff / 1000) % 60; 

    document.getElementById("txt").innerHTML = min + ":" + sec; 
    if (diff > 0) setTimeout(countdown, 1000); 
  }

  countdown();
};

btn1.addEventListener("click", modalFunc);

const counters = document.querySelectorAll("#counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target"); 
    const c = +counter.innerText; 

    const increment = target / 200; 

    
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
