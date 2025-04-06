const partyList = document.querySelector("#partyList")
// console.log(partyList)

let parties = []

const render = () => {
    const events = parties.map((event) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const myDate = new Date(event.date)
        const myMonth = months[myDate.getMonth()]
        const myDay = myDate.getDate()
        const myYear = myDate.getFullYear()
        return `
            <li class="party">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p>${myMonth} ${myDay}, ${myYear}</p>
            <button name=${event.id}>Delete</button>
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
        console.log(parties)
        render()
    } catch (error) {
        console.error(error)
    }
}

fetchParties()