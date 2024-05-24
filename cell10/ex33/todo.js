// Função para gerenciar cookies
function manageCookie(name, value = undefined) {
    if (value === undefined) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : null;
    } else {
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/; max-age=" + (60*60*24*365);
    }
}

// Carregar tarefas do cookie
function loadTasks() {
    const tasks = manageCookie('tasks');
    if (tasks) {
        JSON.parse(tasks).forEach(addTaskToDOM);
    }
}

// Salvar tarefas no cookie
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#ft_list .task')).map(task => task.textContent);
    manageCookie('tasks', JSON.stringify(tasks));
}

// Adicionar tarefa no DOM
function addTaskToDOM(taskText) {
    const task = document.createElement('div');
    task.textContent = taskText;
    task.className = 'task';
    task.onclick = () => {
        if (confirm('Deseja remover esta tarefa?')) {
            task.remove();
            saveTasks();
        }
    };
    document.getElementById('ft_list').prepend(task);
}

// Adicionar nova tarefa
function addTask() {
    const taskText = prompt('Digite a nova tarefa:');
    if (taskText) {
        addTaskToDOM(taskText);
        saveTasks();
    }
}

// Eventos
document.getElementById('add_task_btn').onclick = addTask;
document.addEventListener('DOMContentLoaded', loadTasks);
