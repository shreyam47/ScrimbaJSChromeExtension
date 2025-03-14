let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//adds to list if it isn't already there
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

tabBtn.addEventListener("click", function() {
    //gets current URL from chrome
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) //adding links to database
        render(myLeads)
    })
})

//takes any array and renders it
function render(leads) {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {        
        listItems += 
            `<li>
                <a target = '_blank' href = '${leads[i]}'> 
                    ${myLeads[i]} 
                </a>
            </li>`

        
        /* alt method
        const li = document.createElement("li")
        li.textContent = myLeads[i]
        ulEl.append(li)
        */
    }
    ulEl.innerHTML = listItems 
}

deleteBtn.addEventListener("dbclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//input button
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})



