

var tasks_container = document.getElementsByClassName("tasks-container")[0]
var ITEMS_KEY = "TO-DO-APP-0.4226353638288256"
var TASKS = []

//Local storage functions----------------------------------------------------------
function save(){
    localStorage.setItem(ITEMS_KEY, JSON.stringify(TASKS))
}

function addTask(id , value){
    if (!TASKS) {
        TASKS = []
    }
    TASKS.push({id, value})
}

function getTasks(){
    return JSON.parse(localStorage.getItem(ITEMS_KEY))
}
//-------------------------------------------------------------------------

//Load Tasks on document load----------------------------------------------------------
function loadTasks(){
    TASKS = getTasks()
    if( (TASKS) && TASKS.length > 0) {
        TASKS.forEach(task => {
            tasks_container.append(generateTaskContainer(task.id, task.value))
        })
    }
}
loadTasks()
//-------------------------------------------------------------------------------------

document.addEventListener('click', (event)=> {
    var id = event.target.getAttribute("id")

    if(event.target.classList.contains("fa-edit")) {
        console.log("edit..............")
        console.log("id = "+id)
        var taskItem = document.getElementById(id).getElementsByClassName("itemTask")[0]
        var text = taskItem.innerText
        console.log(taskItem)
        console.log(text)




        var div_edited_task = document.createElement("div")
        div_edited_task.classList.add("edited-task")

        var content = `<input id="3" class="on-edit-input" type="text" value="${text}">
                        <i id="${id}" class="fas fa-save fa-2x saveBtn"></i>
                        `
        
        div_edited_task.innerHTML = content

        console.log(div_edited_task)

        taskItem.replaceWith(div_edited_task)

        event.target.style.setProperty("pointer-events", "none")
        //console.log(event.target.setAttribute("disabled", "ture"))
    }



    if(event.target.classList.contains("saveBtn")){
        var task_container = document.getElementById(id)
        console.log("on save333333333333")
        var prevElement = event.target.previousElementSibling
        var newText = prevElement.value


        console.log(prevElement.value)


        var div = document.createElement("div")
        div.setAttribute("id", id)
        div.classList.add("itemTask")
        div.innerText = newText

        console.log(div)

        var edited_task = event.target.parentElement
        edited_task.replaceWith(div)

        console.log(task_container)
        var edit_task_btn = task_container.getElementsByClassName("fa-edit")[0]
        console.log(edit_task_btn)
        edit_task_btn.style.removeProperty("pointer-events")
    }

    


    //Remove Task-------------------------------------------------------------
    if(event.target.classList.contains("fa-trash-alt")){
        var task_container = document.getElementById(id)
        console.log("delete me" , id)
        task_container.remove()
    }

    //-----------------------------------------------------------------------------


    //Add Task--------------------------------------------------------------------------
    if(event.target.classList.contains("addTaskBtn") || (event.target.parentElement && event.target.parentElement.classList.contains("addTaskBtn"))) {
        event.preventDefault()
        var input = document.getElementsByClassName("task-input")[0]
        var id = Math.random()
        
        if(input.value.length > 0){
            addTask(id, input.value)
            save()
            tasks_container.insertBefore(generateTaskContainer(id, input.value), tasks_container.children[0])
        }
    }
    //---------------------------------------------------------------------------------
    
    //Search Task--------------------------------------------------------------------------------
    if(event.target.classList.contains("searchBtn") || (event.target.parentElement && event.target.parentElement.classList.contains("searchBtn"))) {
        event.preventDefault()
        var input = document.getElementsByClassName("search-input")[0]
        
        if(input.value.length > 0){
            console.log("search")
        }
    }
    //------------------------------------------------------------------------------------------

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



/*

var remove = document.getElementsByClassName("fa-trash-alt")
console.log(remove)
console.log(remove.length)


for(i=0; i<remove.length; i++){
    console.log(remove[i])
    remove[i].addEventListener('click', onRemove)
}

function onRemove(event){
    console.log(event.target)
}

*/