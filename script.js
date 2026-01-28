let requests = []
let count = 1

document.querySelector("form").addEventListener("submit", addRequest)

function addRequest(e){
    e.preventDefault()
    const fName = document.getElementById("fName").value
    const sName = document.getElementById("sName").value
    const tl = document.getElementById("tl").value
    const mail = document.getElementById("mail").value
    const motif = document.getElementById("motif").value
    const date = document.getElementById("date").value
    
    if(fName === "" || sName === "" || tl === "" || mail === "" || motif === "" || date === "") {
        // alert("vous devez remplir tous les champs !!")
        const allInputs = document.querySelectorAll("input")
        let arr = Array.from(allInputs)
        arr.forEach(input => {
            if(input.value === ""){
                input.classList.add("red")
            }
        })
        let alert = document.getElementsByClassName("form-alerts")[0]
        alert.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <p>Veuillez remplir tous les champs avant de soumettre le formulaire !</p>
            </div>
        `
        return;
    }
    const request = {
        id : count++,
        fName : fName,
        sName : sName,
        tl : tl,
        mail : mail,
        motif : motif,
        date : date
    }
    requests.push(request)
    console.log(requests);
    displayAll()
}


function displayAll(){
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = ""
    requests.forEach(request => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${request.fName} ${request.sName}</td>
            <td>${request.tl}</td>
            <td>${request.date}</td>
            <td>${request.motif}</td>
            <td><button class="delete-btn"><i class="fa-solid fa-trash-can" style="color: #a30d11;"></i></button></td>
        `
        tbody.appendChild(tr)
    })
}