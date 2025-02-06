const table = document.getElementById("display");
const complete_table_div = document.getElementById("completedtaskdiv");
const complete_table = document.getElementById("completed");
const taskdiv = document.getElementById("task-div");
const submit = document.getElementById("submit");
const priority_filter = document.getElementById("priority-filter");
const date_filter = document.getElementById("duedate-filter");
const task_filter = document.getElementById("tasks-filter");
const search = document.getElementById("search");
priority_filter.addEventListener("change", () =>
  handleFilterTasks(priority_filter)
);
date_filter.addEventListener("change", () => handleFilterTasks(date_filter));
task_filter.addEventListener("change", () => handleFilterTasks(task_filter));
search.addEventListener("change", () => handleFilterTasks(search));
submit.addEventListener("click", (e) => handleDisplay(e));

let currentRow = null;

const handleDisplay = (e) => {
  if (taskdiv.classList.contains("hide")) {
    taskdiv.classList.remove("hide");
  }
  if (table.classList.contains("hide")) {
    table.classList.remove("hide");
  }
  e.preventDefault();
  const task = document.getElementById("tasktitle");
  const task_description = document.getElementById("description");
  const duedate = document.getElementById("duedate");
  const priority = document.querySelector('input[name="priority"]:checked');
  if (task && task_description && duedate && priority) {
    if (currentRow === null) {
      currentRow = table.insertRow();
      const cell1 = currentRow.insertCell(0);
      cell1.innerHTML = `<h1>${task.value}</h1>`;
      const cell2 = currentRow.insertCell(1);
      cell2.innerHTML = `<p>${task_description.value}</p>`;
      const cell3 = currentRow.insertCell(2);
      cell3.innerHTML = `<p>${duedate.value}</p>`;
      const cell4 = currentRow.insertCell(3);
      cell4.innerHTML = `<p>${priority.value}</p>`;
      const cell5 = currentRow.insertCell(4);
      const buttoncontainer = document.createElement("div");
      buttoncontainer.classList.add("btn-container");
      buttoncontainer.innerHTML = `<button onclick="handleEditTask(this)" class='btn'>Edit</button>
            <button onclick="handleDeleteTask(this)">Delete</button>
            <img src='./checked.png' onclick='handleCompletedTasks(this)' class='complete'></img>`;
      cell5.appendChild(buttoncontainer);
      saveTableData();
    } else {
      currentRow.cells[0].innerHTML = `<h1>${task.value}</h1>`;
      currentRow.cells[1].innerHTML = `<p>${task_description.value}</p>`;
      currentRow.cells[2].innerHTML = `<p>${duedate.value}</p>`;
      currentRow.cells[3].innerHTML = `<p>${priority.value}</p>`;
      saveTableData();
    }
    document.getElementById("form").reset();
    currentRow = null;
    submit.textContent = "Add task";
  } else {
    alert("Please select all the fields");
  }
};

const saveTableData = () => {
  const PendingData = [];
  const CompletedData = [];
  const PendingRows = table.querySelectorAll("tr:not(:first-child)");
  console.log(PendingRows);
  const CompletedRows = document.querySelectorAll("#completed thead tr");
  console.log(PendingRows);
  if(PendingRows.length > 0){
    PendingRows.forEach((row) => {
      const rowData = [];
      if (!row.classList.contains("strike")) {
        const cells = row.querySelectorAll("td:not(:last-child)");
        cells.forEach((cell) => rowData.push(cell.textContent));
        if (rowData.length > 0) {
          PendingData.push(rowData);
        }
      }
    });}
  

  CompletedRows.forEach((row) => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => rowData.push(cell.textContent));
    if (rowData.length > 0) {
      CompletedData.push(rowData);
    }
  });
  localStorage.setItem("PendingData", JSON.stringify(PendingData));
  localStorage.setItem("CompletedData", JSON.stringify(CompletedData));
};

const loadTableData = () => {
  const PendingData = JSON.parse(localStorage.getItem("PendingData"));
  console.log(PendingData);
  const CompletedData = JSON.parse(localStorage.getItem("CompletedData"));
  console.log(CompletedData);

  if (PendingData && PendingData.length > 0) {

    taskdiv.classList.remove("hide");

    PendingData.forEach((data) => {
      currentRow = table.insertRow();
      const cell1 = currentRow.insertCell(0);
      cell1.innerHTML = `<h1>${data[0]}</h1>`;
      const cell2 = currentRow.insertCell(1);
      cell2.innerHTML = `<p>${data[1]}</p>`;
      const cell3 = currentRow.insertCell(2);
      cell3.innerHTML = `<p>${data[2]}</p>`;
      const cell4 = currentRow.insertCell(3);
      cell4.innerHTML = `<p>${data[3]}</p>`;
      const cell5 = currentRow.insertCell(4);
      const buttoncontainer = document.createElement("div");
      buttoncontainer.classList.add("btn-container");
      buttoncontainer.innerHTML = `<button onclick="handleEditTask(this)" class='btn'>Edit</button>
            <button onclick="handleDeleteTask(this)">Delete</button>
            <img src='./checked.png' onclick='handleCompletedTasks(this)' class='complete'></img>`;
      cell5.appendChild(buttoncontainer);
    });
  }

  if (CompletedData && CompletedData.length > 0) {
    
    if (taskdiv.classList.contains("hide")) {
      taskdiv.classList.remove("hide");
    }
    if(PendingData.length == 0){
      table.classList.add('hide')
    }
    complete_table_div.classList.add("completed-task-div");

    CompletedData.forEach((data) => {
      let currentRow = complete_table.insertRow();
      const cell1 = currentRow.insertCell(0);
      cell1.innerHTML = `<h1>${data[0]}</h1>`;
      const cell2 = currentRow.insertCell(1);
      cell2.innerHTML = `<p>${data[1]}</p>`;
      const cell3 = currentRow.insertCell(2);
      cell3.innerHTML = `<p>${data[2]}</p>`;
      const cell4 = currentRow.insertCell(3);
      cell4.innerHTML = `<p>${data[3]}</p>`;
    });
  }
};
loadTableData();
const handleEditTask = (btn) => {
  const row = btn.parentNode.parentNode.parentNode;
  document.getElementById("tasktitle").value = row.cells[0].innerText;
  document.getElementById("description").value = row.cells[1].innerText;
  document.getElementById("duedate").value = row.cells[2].innerText;
  const priority_list = document.querySelectorAll('input[name="priority"]');
  for (let i = 0; i < priority_list.length; i++) {
    if (priority_list[i].value === row.cells[3].innerText) {
      priority_list[i].checked = true;
      break;
    }
  }

  currentRow = row;
  submit.textContent = "Save Edit";
};

const handleDeleteTask = (btn) => {
  const row = btn.parentNode.parentNode.parentNode;
  row.parentNode.removeChild(row);
  saveTableData();
  const row_array = table.querySelectorAll("tr:not(:first-child)");
  const completed_row_array = complete_table.querySelectorAll(
    "tr:not(:first-child)"
  );
  if (row_array.length === 0 && completed_row_array.length === 0) {
    taskdiv.classList.add("hide");
  }
  if (row_array.length === 0) {
    table.classList.add("hide");
  }
};
const handleCompletedTasks = (btn) => {
  const row = btn.parentNode.parentNode.parentNode;
  row.classList.add("strike");
  complete_table_div.classList.add("completed-task-div");
  let newrow = complete_table.insertRow();
  const cell1 = newrow.insertCell(0);
  cell1.textContent = row.children[0].textContent;
  const cell2 = newrow.insertCell(1);
  cell2.textContent = row.children[1].textContent;
  const cell3 = newrow.insertCell(2);
  cell3.textContent = row.children[2].textContent;
  const cell4 = newrow.insertCell(3);
  cell4.textContent = row.children[3].textContent;
  btn.parentNode.classList.add("disabled");
  saveTableData();
};

const tr = table.getElementsByTagName("tr");

const handleFilterTasks = () => {
  var priority = document.getElementById("priority-filter").value;
  var duedate = document.getElementById("duedate-filter").value;
  var date = new Date(duedate);
  var status = document.getElementById("tasks-filter").value;
  console.log(status);

  var taskvalue = document.getElementById("search").value;

  const row_array = table.querySelectorAll("tr:not(:first-child)");
  for (let i = 0; i < row_array.length; i++) {
    let match = true;
    if (priority !== "all") {
      console.log(row_array[i].children[3].textContent.trim());
      match = match && priority === row_array[i].children[3].textContent.trim();
    }
    if (duedate) {
      var taskdate = row_array[i].children[2].textContent.trim();
      var filter_date = new Date(taskdate);
      match = match && date <= filter_date;
    }
    if (taskvalue) {
      match =
        match &&
        row_array[i].children[0].textContent.trim().startsWith(taskvalue);
    }
    if (status === "completed") {
      match = match && row_array[i].classList.contains("strike");
    }
    if (status === "pending") {
      match = match && !row_array[i].classList.contains("strike");
    }
    row_array[i].style.display = match ? "" : "none";
  }
};
