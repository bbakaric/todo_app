class TodoList {
	constructor(title, notes = '') {
		this.title = title;
		this.notes = notes;
	}
}

class InputNewTodo {
	render() {
		const renderHook = document.getElementById('list-input');
		const inputForm = document.createElement('form');
		inputForm.innerHTML = `
            <input type="text" id="list-name" placeholder="Add new list ..."></input>
            <button id="submitBtn">Add</button
        `;
		renderHook.append(inputForm);
		const addNewList = document.querySelector('button');
		addNewList.addEventListener('click', (e) => {
			e.preventDefault();
			const inputValue = document.getElementById('list-name');
			const todoList = new TodoList();
			todoList.title = inputValue.value;
			console.log(`Add new todo clicked!`, todoList);
			const card = new TodoListCard(todoList);
			card.render();
			inputForm.reset();
		});
	}
}

class NewNotes {
	constructor(note) {
		this.note = note;
	}

	render(list) {
		const noteEl = document.createElement('li');
		noteEl.innerHTML = `
			<p>${this.note}</p>
			<button id="delete">X</button>
			<button id="completed">+</button>
		`;
		list.append(noteEl);
		const deleteNoteBtn = noteEl.querySelector('button');
		const completedBtn = document.getElementById('completed');
		deleteNoteBtn.addEventListener('click', () => {
			noteEl.remove();
		});
		completedBtn.addEventListener('click', () => {
			noteEl.querySelector('p').style.textDecoration = 'line-through';
		});

		console.log(`New note: ${this.note}`);
	}
}

class TodoListCard {
	constructor(todoInfo) {
		this.todoInfo = todoInfo;
	}

	render() {
		const renderHook = document.getElementById('list-container');
		const todoEl = document.createElement('div');
		todoEl.innerHTML = `
            <h3>${this.todoInfo.title}</h3>
			<button id="delete">X</button>
			<form>
            	<input type="text" placeholder="Add new note ..."></input>
            	<button>Add</button>
			</form>
            <ul></ul>
        `;
		renderHook.append(todoEl);
		const deleteListBtn = document.getElementById('delete');
		const form = todoEl.querySelector('form');
		const submitBtn = form.querySelector('button');
		const notesList = todoEl.querySelector('ul');
		deleteListBtn.addEventListener('click', () => {
			todoEl.remove();
		});
		submitBtn.addEventListener('click', (e) => {
			e.preventDefault();
			const inputNotes = todoEl.querySelector('input').value;
			const todoList = new TodoList(this.todoInfo.title, inputNotes);
			const displayNotes = new NewNotes(todoList.notes);
			console.log(`Add new notes clicked!`, todoList);
			displayNotes.render(notesList);
			form.reset();
		});
	}
}

class App {
	static init() {
		const render = new InputNewTodo();
		render.render();
	}
}

App.init();
