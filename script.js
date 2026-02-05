function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}
