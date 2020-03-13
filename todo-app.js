

document.addEventListener('click', (event)=> {
    console.log(event.target)
    var id = event.target.getAttribute("id")
    console.log("id = ", id)
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