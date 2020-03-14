

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

})





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