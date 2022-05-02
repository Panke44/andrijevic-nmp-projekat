/* Fetchovanje podataka iz db.json */

const promiseOfSomeData = fetch("data.json")
  .then((r) => r.json())
  .then((data) => {
    return data;
  });

/* Samopozivajuca asinhrona funkcija */

(async () => {
  let users = [];
  let someData = await promiseOfSomeData; // vraca se Promise od fetchovanja podataka
  users = someData; // smestaju se podaci u promenljivu users

  /* Kreira se dinamicka tabela na osnovu json fajla sa default vrednostima za niz i id elementa u koji se smesta */
  let createTable = (array = users, id = "showData") => {
    let col = [];
    for (let i = 0; i < array.length; i++) {
      for (let key in array[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }
    const table = document.createElement("table"); // Kreira se table element
    let tr = table.insertRow(-1); // Insertuje se row

    /* Dodaje se th element za svaki element u col nizu */
    for (let i = 0; i < col.length; i++) {
      let th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    /* Dodaje se celija za svaki element u col nizu */
    for (let i = 0; i < array.length; i++) {
      tr = table.insertRow(-1);
      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = array[i][col[j]];
      }
    }

    /* Appenduje se tabela */
    let element = document.getElementById(id);
    element.innerHTML = "";
    element.appendChild(table);
  };
  createTable();

  let searchBtn = document.getElementById("searchBtn"); // Kreiranje search buttona

  /* Kreiranje funckije viseg reda za konvertovanje velikih slova u mala */
  Array.prototype.malaSlova = function () {
    let i;
    for (i = 0; i < this.length; i++) {
      return (this[i] = this[i].toLowerCase());
    }
  };

  /* Kreiranje listenera na click buttona sa search funkcionalnosti, filteruju se elementi iz promenljive users i vracaju se elementi koji odgovaraju, split() - podeli string u niz, includes() - proverava da li niz sadrzi tu vrednost  */
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
    showData.style.display = "none"; // Sakrivanje prve tabele
  });

  let sortAsc = document.getElementById("sortAsc");
  let sortDesc = document.getElementById("sortDesc");

  /* Sortiranje po asc redu */
  sortAsc.addEventListener("click", () => {
    users.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    createTable();
  });
  /* Sortiranje po desc redu */
  sortDesc.addEventListener("click", () => {
    users.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
    createTable();
  });

  const avgAge = document.getElementById("avgAge");
  const showAvg = document.getElementById("showAvg");

  /* Izracunavanje prosecnog broja godina */
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

  /* Kreiranje nove tabele sa podacima usera cija je plata manja od 2500 sa forEach() */
  showLowSalaries.addEventListener("click", () => {
    let newUsers = [];
    users.forEach((el) => {
      if (el.balance < 2500) {
        newUsers.push(el);
      }
    });
    createTable(newUsers);
  });
  /* Kreiranje nove tabele sa podacima usera cija je plata veca od 2500 sa map() */
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

/* Samopozivajuca funkcija za prikazivanje modala odmah po ucitavanju stranice */
(function () {
  modal.style.display = "block";
})();

/* Funkcija koja se poziva na klik dugmeta (129. linija) */
const modalFunc = () => {
  modal.style.display = "none"; // uklanja modal

  /* Proverava da li je input prazan, ako jeste ispisuje Welcome, guest, u suprotnom ispisuje Welcome, i uneseno ime */

  ime.value === ""
    ? (resultDiv.innerHTML = `Welcome, guest`)
    : (resultDiv.innerHTML = `Welcome, ${ime.value}`);
  /* Countodwn */

  /* Link originalnog koda */
  /* https://stackoverflow.com/questions/37150291/recursive-countdown-timer */

  let target = 1500000; // postavljeno na 25min
  let current = 0;
  function countdown() {
    current += 1000;
    let diff = target - current; // izracunava 25min i prikazuje ih tako
    let min = Math.floor(diff / 1000 / 60); // izracunava minute
    let sec = (diff / 1000) % 60; // izracunava sekunde

    document.getElementById("txt").innerHTML = min + ":" + sec; // ispisuje sve to u div sa klasom txt
    if (diff > 0) setTimeout(countdown, 1000); // ako je ostalo minuta opet poziva countdown (rekurzija) posle jedne sekunde
  }

  countdown();
};

btn1.addEventListener("click", modalFunc);

/* Counter */
const counters = document.querySelectorAll("#counter");

counters.forEach((counter) => {
  counter.innerText = "0"; // postavlja se pocetna vrednost na 0

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target"); // uzima se data-target (maksimalna prikazana vrednost) i konvertuje se u int (zbog + ispred counter)
    const c = +counter.innerText; // ista prica kao i gore

    const increment = target / 200; // odredjuje se vrednost za koliko ce se povecavati target, ako hoces da se sporije povecava povecaj 200

    /* Dok god je c manji od target, povecavaj c za vrednost increment (zaokruzi ako je neka decimalna vrednost) i ponovo pozovi updateCounter (rekurzija) nakon 0.001s u suprotnom postavi innerText na vrednost target*/
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
