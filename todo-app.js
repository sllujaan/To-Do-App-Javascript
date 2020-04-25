

var tasks_container = document.getElementsByClassName("tasks-container")[0]
var ITEMS_KEY = "TO-DO-APP-0.4226353638288256"
var TASKS = []
//var oldText
var oldTextArr = []

//Local storage functions----------------------------------------------------------
function save(){
    localStorage.setItem(ITEMS_KEY, JSON.stringify(TASKS))
}

function addTask(id , value){
    if (!TASKS) {
        TASKS = []
    }
    TASKS.unshift({id, value})
}

function getTasks(){
    return JSON.parse(localStorage.getItem(ITEMS_KEY))
}

function removeTask(id){
    TASKS = getTasks()
    if( (TASKS) && TASKS.length > 0) {
        TASKS.find((task, index) => {
            if(task.id == id) {
                TASKS.splice(index, 1)
                return task
            }
        })
        save()
    }
}


//Save new Text in localstorage------------------------------------------
function replaceTextLocalStorage(id, newText) {
    console.log(id, newText)
    TASKS = getTasks()
    if( (TASKS) && TASKS.length > 0) {
        TASKS.find((task) => {
            if(task.id == id) {
                //TASKS.splice(index, 1)
                console.log("task found.......<<<<<<<<<<<<<")
                task.value = newText
                return task
            }
        })
        save()
    }
}
//------------------------------------------------------------

//-------------------------------------------------------------------------

//Load Tasks on document load----------------------------------------------------------
function loadTasks(){
    TASKS = getTasks()
    if( (TASKS) && TASKS.length > 0) {
        TASKS.forEach(task => {
            tasks_container.append(generateTaskContainer(task.id, task.value))
        })
    }
    else{
        tasks_container.innerHTML = null
        tasks_container.innerHTML = `<h1 id="00000">No Tasks Found.</h1>`
    }
}

document.addEventListener('DOMContentLoaded', loadTasks)
//-------------------------------------------------------------------------------------

document.addEventListener('click', (event)=> {
    var id = event.target.getAttribute("id")
    //console.log(oldText)

    //Edit task----------------------------------------------------------------------------
    if(event.target.classList.contains("fa-edit")) {
        console.log("edit..............")
        console.log("id = "+id)
        var taskItem = document.getElementById(id).getElementsByClassName("itemTask")[0]
        var oldText = taskItem.innerText
        console.log(taskItem)
        //console.log(oldText)

        oldTextArr.push({id:id, text:oldText})




        var div_edited_task = document.createElement("div")
        div_edited_task.classList.add("edited-task")

        var content = `<input id="${id}" class="on-edit-input" type="text" value="${oldText}">
                            <div class="editCancelBtns">
                                <i id="${id}" class="fas fa-save fa-2x saveBtn"></i>
                                <i id="${id}" class="fas fa-ban fa-2x cancelBtn"></i>
                            </div>
                        `
        
        div_edited_task.innerHTML = content

        console.log(div_edited_task)

        taskItem.replaceWith(div_edited_task)

        event.target.style.setProperty("pointer-events", "none")

        //focus input when user edits a taks------------------------
        var on_edit_container = document.getElementById(id)
        var on_edit_input = on_edit_container.getElementsByClassName("on-edit-input")[0]
        on_edit_input.focus()
        //------------------------------------------------------
    }
    //----------------------------------------------------------------------------------------



    //Save button task-----------------------------------------------------------------------
    if(event.target.classList.contains("saveBtn")){
        var task_container = document.getElementById(id)
        console.log("on save333333333333")
        //var prevElement = event.target.previousElementSibling
        var inputElement = event.target.parentElement.parentElement.children[0]
        var newText = inputElement.value

        console.log(newText)

        //check if length is not zero save text----------------------
        if(newText && newText.length > 0) {
            var div = document.createElement("div")
            div.setAttribute("id", id)
            div.classList.add("itemTask")
            div.innerText = newText

            console.log(div)

            var edited_task = event.target.parentElement.parentElement
            edited_task.replaceWith(div)

            console.log(task_container)
            var edit_task_btn = task_container.getElementsByClassName("fa-edit")[0]
            console.log(edit_task_btn)
            edit_task_btn.style.removeProperty("pointer-events")

            replaceTextLocalStorage(id, newText)
        }
        else{
            alert("The field is empty.")
        }


        
        
    }
    //---------------------------------------------------------------------------------------
    

    //Cancel task-----------------------------------------------------------------------
    if(event.target.classList.contains("cancelBtn")){
        var task_container = document.getElementById(id)
        console.log("cancelling tasks........")
        //console.log(oldText)
        //console.log("on save333333333333")
        //var prevElement = event.target.previousElementSibling
        //var inputElement = event.target.parentElement.parentElement.children[0]
        //var newText = inputElement.value

        //console.log(newText)

        var oldTextObj = getOldTextById(id)        


        var div = document.createElement("div")
        div.setAttribute("id", id)
        div.classList.add("itemTask")
        div.innerText = (oldTextObj) ? (oldTextObj.text) : ("")

        console.log(div)

        var edited_task = event.target.parentElement.parentElement
        edited_task.replaceWith(div)

        console.log(task_container)
        var edit_task_btn = task_container.getElementsByClassName("fa-edit")[0]
        console.log(edit_task_btn)
        edit_task_btn.style.removeProperty("pointer-events")
        
    }
    //---------------------------------------------------------------------------------------


    //Remove Task-------------------------------------------------------------
    if(event.target.classList.contains("fa-trash-alt")){
        var task_container = document.getElementById(id)
        console.log("delete me" , id)
        removeTask(id)
        task_container.remove()

        TASKS = getTasks()
        if( (TASKS) && TASKS.length == 0) {
            showNoTasksfound()
        }
        
    }

    //-----------------------------------------------------------------------------


    //Add Task--------------------------------------------------------------------------
    if(event.target.classList.contains("addTaskBtn") || (event.target.parentElement && event.target.parentElement.classList.contains("addTaskBtn"))) {
        event.preventDefault()
        var input = document.getElementsByClassName("task-input")[0]
        var id = Math.random()
        
        if(input.value.length > 0){
            var generatedTaskContainer = generateTaskContainer(id, input.value)
            console.log(tasks_container.lastElementChild)
            if(tasks_container.lastElementChild.id == '00000'){
                tasks_container.innerHTML = null
            }
            addTask(id, input.value)
            save()
            tasks_container.insertBefore(generateTaskContainer(id, input.value), tasks_container.children[0])
            input.value = ''
            tasks_container.children[0].classList.add("task-container-active")
        }
        else{
            alert("The field is empty.")
        }
    }
    //---------------------------------------------------------------------------------
    
    //Search Task--------------------------------------------------------------------------------
    if(event.target.classList.contains("searchBtn") || (event.target.parentElement && event.target.parentElement.classList.contains("searchBtn"))) {
        event.preventDefault()
        var input = document.getElementsByClassName("search-input")[0]

        if(input.value.length === 0) {alert("The field is empty.");return}

        var regEx = genRegEx(input.value)
        console.log(regEx)
        
        if(regEx) {
            TASKS = getTasks()
            if( (TASKS) && TASKS.length > 0) {
                tasks_container.innerHTML = null
                TASKS.forEach(task => {
                    if(regEx.test(task.value)){
                        var taskContainer = generateTaskContainer(task.id, task.value)
                        var itemTask = taskContainer.querySelector(".itemTask")
                        
                        itemTask.innerHTML = itemTask.innerText.replace(regEx, `<span class="highlighted">$1</span>`)

                        //console.log(taskText.replace(regEx, `<span class="highlighted">$1</span>`))

                        tasks_container.append(taskContainer)
                    }
                })

                if(tasks_container.innerHTML.trim() == "") {
                    tasks_container.innerHTML = `<h1 id="00000">No Tasks Found.</h1>`
                }
            }
        }
        else{
            console.log("false RegEx..")
            tasks_container.innerHTML = `<h1 id="00000">No Tasks Found.</h1>`
        }

        /*
        if(input.value.length > 0){
            TASKS = getTasks()
            if( (TASKS) && TASKS.length > 0) {
                tasks_container.innerHTML = null
                TASKS.forEach(task => {
                    if(task.value.includes(input.value)){
                        tasks_container.append(generateTaskContainer(task.id, task.value))
                    }
                })

                if(tasks_container.innerHTML.trim() == "") {
                    tasks_container.innerHTML = `<h1 id="00000">No Tasks Found.</h1>`
                }
            }
        }*/
    }
    //------------------------------------------------------------------------------------------

    //Generate Regular Expression----------------------------------------------------
    function genRegEx(words) {
        if(words) {
            var regEx = '('
            wordsArr = words.match(/[^\s\\]{1,}/g)
            console.log(wordsArr)
            if (wordsArr) {
                    wordsArr.forEach((word, index) => {
                    regEx += word + '|'
                })
                regEx.replace(/.$/, "\.")
                regEx = regEx.slice(0, regEx.length-1)
                regEx += ')'
                var newRegEx = new RegExp(regEx, 'gi')
                return newRegEx
            }
        }
    }
    //------------------------------------------------------------------------------

})

function generateTaskContainer(id, value) {
    
    var task_container = document.createElement("div")
    task_container.setAttribute("id", id)
    task_container.classList.add("task-container")
    
    var content = `
                <div id="${id}" class="itemTask">
                    ${value}
                </div>

                <div class="task-btns">
                    <div class="edit-Task">
                        <i id="${id}" class="fas fa-edit"></i>
                    </div>
                    <div class="remove-Task">
                        <i id="${id}" class="fas fa-trash-alt"></i>
                    </div>
                </div>
                `
    task_container.innerHTML = content
    return task_container
}


//on edit event listener----------------------------------------------
document.addEventListener('keyup', (event) => {
    if(event.target.classList.contains("on-edit-input")){
        console.log(event.target.nextElementSibling)
        if(event.key == "Enter") {
            console.log("Enter....")
            event.target.nextElementSibling.children[0].click()
        }
        console.log(event)
        console.log(event.target.value)
    }
})
//----------------------------------------------------------------------

//--------------------
function showNoTasksfound() {
    tasks_container.innerHTML = null
    tasks_container.innerHTML = `<h1 id="00000">No Tasks Found.</h1>`
}

//------------------


//get old text by id --------------------------------
function getOldTextById(id) {
    return oldTextArr.find(obj => parseFloat(obj.id) === parseFloat(id))
}
//------------------------------------