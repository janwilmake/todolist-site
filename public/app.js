document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.className = 'flex items-center gap-2 p-3 bg-gray-50 rounded-lg';
            todoItem.innerHTML = `
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''} 
                    class="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                >
                <span class="flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}">${todo.text}</span>
                <button class="delete-btn text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;

            // Handle checkbox changes
            const checkbox = todoItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                todos[index].completed = checkbox.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
            });

            // Handle delete
            const deleteBtn = todoItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos();
            });

            todoList.appendChild(todoItem);
        });
    }

    // Handle form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            todos.push({
                text: todoText,
                completed: false
            });
            localStorage.setItem('todos', JSON.stringify(todos));
            todoInput.value = '';
            renderTodos();
        }
    });

    // Initial render
    renderTodos();
});