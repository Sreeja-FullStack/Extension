myLeads = []

const inputBtn = document.getElementById("input-btn")
const deletBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const UlEl = document.getElementById("ul-el")
let localStorageLead = JSON.parse(localStorage.getItem("myLeads"))
let tabs = document.getElementById("tab-btn")

tabs.addEventListener("click", function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


if(localStorageLead){
    myLeads = localStorageLead
    render(myLeads)
}

function render(leads){
    let listItems = ""
    for(let i= 0 ; i<leads.length; i++){
        listItems += `
                    <li> 
                        <a target='_blank'
                        href = '${leads[i]}'>
                        ${leads[i]}
                        </a>
                    <li> 
                    `
    }
    UlEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deletBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

