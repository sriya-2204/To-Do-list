const tasker = {
  construct() {
    this.selectElements();
    this.bindEvents();
    this.scanTaskList();
  },
  selectElements() {
    this.taskInput = document.getElementById("input");
    this.taskList = document.getElementById("tasksContainer");
    this.submitBtn = document.getElementById("submit");
    this.alertMessage = document.querySelector(".alert");
    this.placeholder = document.querySelector(".placeholder");
  },
  buildTask() {
    const taskListItem = document.createElement("li");
    const taskMarkContainer = document.createElement("span");
    taskMarkContainer.classList.add("mark");

    const taskCompleted = document.createElement("input");
    taskCompleted.type = "checkbox";
    taskCompleted.classList.add("checkbox");

    taskMarkContainer.appendChild(taskCompleted);

    const taskValueContainer = document.createElement("div");
    taskValueContainer.classList.add("list");
    const taskValue = document.createElement("p");
    taskValue.textContent = this.taskInput.value;
    taskValueContainer.appendChild(taskValue);

    const taskDeleteContainer = document.createElement("span");
    taskDeleteContainer.classList.add("delete");
    const taskDelete = document.createElement("i");
    taskDelete.classList.add("las", "la-trash-alt");
    taskDeleteContainer.appendChild(taskDelete);

    taskListItem.append(taskMarkContainer, taskValueContainer, taskDeleteContainer);
    this.taskList.appendChild(taskListItem);
  },
  addTask() {
    const taskValue = this.taskInput.value.trim();
    if (!taskValue) {
      this.alertMessage.style.display = "block";
      setTimeout(() => this.alertMessage.style.display = "none", 2000);
    } else {
      this.buildTask();
      this.taskInput.value = "";
      this.placeholder.style.display = "none";
      this.alertMessage.style.display = "none";
      this.scanTaskList();
    }
  },
  enterKey(event) {
    if (event.key === "Enter") {
      this.addTask();
    }
  },
  bindEvents() {
    this.submitBtn.onclick = this.addTask.bind(this);
    this.taskInput.onkeypress = this.enterKey.bind(this);
  },
  scanTaskList() {
    Array.from(this.taskList.children).forEach((taskListItem, index) => {
      const markIcon = taskListItem.querySelector(".checkbox");
      const deleteIcon = taskListItem.querySelector(".delete");

      markIcon.onclick = () => {
        taskListItem.style.textDecoration = markIcon.checked ? "line-through" : "none";
      };

      deleteIcon.onclick = () => {
        taskListItem.remove();
        this.scanTaskList();
      };
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  tasker.construct();
  document.querySelector(".add svg").onclick = () => {
    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = formContainer.style.display === "block" ? "none" : "block";
    if (formContainer.style.display === "block") {
      document.querySelector("#input").focus();
    }
  };

  const today = new Date();
  const date = `${today.getDate()} ${today.toLocaleString("default", { month: "short" })}, ${today.getFullYear()}`;
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };
  setInterval(() => {
    document.querySelector(".date").textContent = date;
    document.querySelector(".time").textContent = formatAMPM(new Date());
  }, 1000);
});
