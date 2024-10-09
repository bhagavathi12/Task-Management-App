function toggleTableVisibility(){
    const table = document.getElementById('mytable')
    const tbody = document.querySelector('tbody')
    if(tbody.children.length > 0){
        table.style.display = 'table';
    }
    else{
        table.style.display = 'none'
    }
}
let currentRow = null

function EditTask(button){
    const row = button.parentElement.parentElement.parentElement
    console.log(row)
    const tasktitle = row.cells[0].innerText;
    const description = row.cells[1].innerText;
    const date = row.cells[2].innerText;
    const priority = row.cells[3].innerText;

    document.getElementById('task-title').value = tasktitle;
    document.getElementById('description').value = description;
    document.getElementById('due').value = date;
    document.querySelector(`input[name="priority"][value="${priority}"]`).checked = true;

    currentRow = row;
    const submitButton = document.getElementById('btn')
    submitButton.addEventListener('click',fetchvalues)
    
}
const fetchvalues = (e) => {
    e.preventDefault();
    const tasktitle =  document.getElementById('task-title')
    const description = document.getElementById('description')
    const date = document.getElementById('due')
    const priority = document.querySelector('input[name="priority"]:checked')
    if(currentRow){
        currentRow .cells[0].innerText= tasktitle.value;
        currentRow .cells[1].innerText = description.value;
        currentRow .cells[2].innerText = date.value;
        currentRow .cells[3].innerText = priority.value;
        currentRow = null;
        tasktitle.value = '';
        description.value = '';
        date.value='';
        priority.checked = false;

    }
    else{
        const table = document.getElementById('mytable').getElementsByTagName('tbody')[0]
        const row =  document.createElement('tr')
        const cell0 =document.createElement('td')
        cell0.classList.add('task-title-cell')
        const cell1 =document.createElement('td')
        cell1.classList.add('description-cell')
        const cell2 =document.createElement('td')
        cell2.classList.add('due-date-cell')
        const cell3 =document.createElement('td')
        cell3.classList.add('priority-cell')
        const cell4 = document.createElement('td')
        cell4.classList.add('action-cell')
        cell0.innerText = `${tasktitle.value}`
        cell1.innerText = `${description.value}`
        cell2.innerText = `${date.value}`
        cell3.innerText = `${priority.value}`
        
        const actiondiv = document.createElement('div')
        actiondiv.classList.add('action-button-div')
        actiondiv.innerHTML = `<button class="action-button" onclick="EditTask(this)">Edit</button>  
        <button class="action-button"  onclick="DeleteTask(this)">Delete</button> 
        <button class="action-button" onclick="Complete(this)">Mark as Completed</button>`
    
        cell4.appendChild(actiondiv)
    
        row.appendChild(cell0);
        tasktitle.value = '';
        row.appendChild(cell1);
        description.value = '';
        row.appendChild(cell2);
        date.value='';
        row.appendChild(cell3);
        priority.checked = false;
        row.appendChild(cell4)
        table.appendChild(row)
        
    }
  
    toggleTableVisibility();
}




function DeleteTask(button){
    const row=button.parentElement.parentElement.parentElement;
    row.remove();
    toggleTableVisibility();
}

function Complete(button){
    const row = button.parentElement.parentElement.parentElement;
    const tasktitle = row.cells[0].innerText;
    
    const description = row.cells[1].innerText;
    const date = row.cells[2].innerText;
    const priority = row.cells[3].innerText;

    const adddiv = document.createElement('div')
    adddiv.innerHTML = `<h1> Completed Tasks </h1>
    <p><b>Task:</b> ${tasktitle}-${description}</p>
    <p><b>Due Date:</b>${date}</p> <p><b>priority:</b>${priority}</p>`
    const parentdiv = document.getElementsByClassName('container')[0]
    console.log(parentdiv)
    parentdiv.appendChild(adddiv)    
}

toggleTableVisibility(); /* Initial check */
const button = document.getElementById('btn')
button.addEventListener('click',fetchvalues)