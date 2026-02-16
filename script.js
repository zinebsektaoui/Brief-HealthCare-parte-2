let requests = [];
let count = 1;
let formAlerts = document.getElementsByClassName("form-alerts")[0];
let tableAlerts = document.getElementsByClassName("table-alerts")[0];
const allInputs = document.querySelectorAll("input"); // get all inputs
let arr = Array.from(allInputs); // convert to an array

document.querySelector("form").addEventListener("submit", addRequest);

function addRequest(e) {
  e.preventDefault();
  const fName = document.getElementById("fName").value;
  const sName = document.getElementById("sName").value;
  const tl = document.getElementById("tl").value;
  const mail = document.getElementById("mail").value;
  const motif = document.getElementById("motif").value;
  const date = document.getElementById("date").value;

  if (
    fName === "" ||
    sName === "" ||
    tl === "" ||
    mail === "" ||
    motif === "" ||
    date === ""
  ) {
    arr.forEach((input) => {
      if (input.value === "") {
        input.classList.add("red");
      }
    });
    formAlerts.innerHTML =
      "Veuillez remplir tous les champs avant de soumettre le formulaire !";
    formAlerts.classList.add("danger");
    return;
  } else {
    const request = {
      id: count++,
      fName: fName,
      sName: sName,
      tl: tl,
      mail: mail,
      motif: motif,
      date: date,
    };
    requests.push(request);
    console.log(requests);

    // calcule des demande 
    let total = document.querySelector(".total");
    total.innerHTML = requests.length + " Demande(s) au total";

    // msg a affiché
    formAlerts.innerHTML = "Demande bien ajouté :)";
    formAlerts.classList.add("success");
    arr.forEach((input) => {
      if (input !== "") {
        input.classList.remove("red");
      }
    });
    displayAll();
    document.getElementById("addRequestForm").reset();
  }
  setTimeout(() => {
    formAlerts.style.display = "none";
  }, 3000);
}

function displayAll() {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  requests.forEach((request) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${request.fName} ${request.sName}</td>
            <td>${request.tl}</td>
            <td>${request.date}</td>
            <td>${request.motif.slice(0, 40) + "..."}</td>
            <td><i onClick="drop(${request.id})" class="fa-solid fa-trash-can" style="color: #a30d11;"></i></td>
        `;
    tbody.appendChild(tr);
  });
}

function drop(id) {
  let request = requests.findIndex((request) => request.id === id);
  requests.splice(request, 1);
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  requests.forEach((request) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${request.fName} ${request.sName}</td>
            <td>${request.tl}</td>
            <td>${request.date}</td>
            <td>${request.motif}</td>
            <td><i onClick="drop(${request.id})" class="fa-solid fa-trash-can" style="color: #a30d11;"></i></td>
        `;
    tbody.appendChild(row);
  });
  tableAlerts.innerHTML = "Demande bien supprimé :)";
  tableAlerts.classList.add("success");
  console.log(requests);
  setTimeout(() => {
    tableAlerts.style.display = "none";
  }, 3000);
}

function search() {
  let inputValue = document.getElementsByClassName("search")[0].value;
  let result = requests.filter(
    (request) => request.motif.toLowerCase() === inputValue.toLowerCase(),
  )[0];
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  let row = document.createElement("tr");
  if (result) {
    tbody.innerHTML = `
      <td>${result.fName} ${result.sName}</td>
      <td>${result.tl}</td>
      <td>${result.date}</td>
      <td>${result.motif.slice(0, 40) + "..."}</td>
      <td><i onClick="drop(${result.id})" class="fa-solid fa-trash-can" style="color: #a30d11;"></i></td>
    `;
  } else {
    tbody.innerHTML = `
    <td colspan="5" style="text-align:center">Demande non trouvé</td>
    `;
  }
  tbody.appendChild(row);
  console.log(result);
}


// Dark and light mode :

let btn = document.getElementById("themeToggle");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    btn.innerHTML = "☀️";
  } else {
    btn.innerHTML = "🌙";
  }
});
