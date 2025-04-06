const partyList = document.querySelector("#partyList")
const partyForm =document.querySelector("#partyForm")

let parties = []

const render = () => {
    const events = parties.map((event) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const myDate = new Date(event.date)
        const myMonth = months[myDate.getMonth()]
        const myDay = myDate.getDate()
        const myYear = myDate.getFullYear()
        // console.log("myMonth", myMonth, myDay, myYear)
        return `
            <li class="party">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p>${myMonth} ${myDay}, ${myYear}<br/>${event.date}</p>
            <p>${event.location}</p>
            <button class="deleteButton" name=${event.id}>Delete</button>
            </li>
            <br/>
        `
    })
    partyList.innerHTML = events.join("")
}


const fetchParties = async () => {
    try{
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/events")
        const data = await response.json()
        parties = data.data
        // console.log(parties)
        render()
    } catch (error) {
        console.error(error)
    }
}

fetchParties()

partyForm.addEventListener("submit", async (event)=>{
    event.preventDefault()

    // const newParty = {x/
    //     name: event.target.name.value, 
    //     description: event.target.description.value,
    //     date: event.target.date.value,
    //     location: event.target.location.value,
    // }

    //Same as above but leads to shortcut in sending new object (newParty) with just commas
    const name = event.target.name.value 
    const description = event.target.description.value
    const date = new Date(event.target.date.value)
    const location = event.target.location.value

    const newParty = {
        name, 
        description,
        date,
        location,
    }
    
    try {
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newParty)
        })
        const data = await response.json()
        console.log(data.data)
        parties.push(data.data)
        render()

    } catch (error) {
        console.error(error)
    }

})

partyList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("deleteButton")){
        console.log(event.target.name)
        const partyId = event.target.name
        try {
            const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-am/events/${partyId}` , {
                method: "DELETE", 
            })
            console.log("response", response)
            event.target.parentElement.remove()
            // render()
        } catch (error) {
            
        }
    }


})