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
            <input type="text" id="list-name" placeholder="Add new list ..." autofocus="true"></input>
            <button>+</button>
        `;
		renderHook.append(inputForm);
		const addNewList = document.querySelector('button');
		addNewList.addEventListener('click', (e) => {
			e.preventDefault();
			const inputValue = document.getElementById('list-name');
			if (inputValue.value.trim() === '') {
				return;
			}
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
		<div>
			<p>${this.note}</p>
			<div id="btn">
				<button id="delete">
					<i class="fas fa-minus-circle fa-lg"></i>
				</button>
				<button id="completed">
					<i class="fas fa-check-circle fa-lg"></i>
				</button>
			</div>
		</div>
		`;
		list.append(noteEl);
		const deleteNoteBtn = noteEl.querySelector('button');
		const completedBtn = noteEl.querySelector('button:nth-of-type(2)');
		deleteNoteBtn.addEventListener('click', () => {
			noteEl.classList.add('delete');
			noteEl.addEventListener('transitionend', () => {
				noteEl.remove();
			});
		});
		completedBtn.addEventListener('click', () => {
			noteEl.querySelector('div').classList.add('completed');
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
		todoEl.classList.add('todo-list-card');
		todoEl.innerHTML = `
			<div id="card-header">
            	<p>${this.todoInfo.title}</p>
				<button>
					<i class="far fa-trash-alt fa-lg"></i>
				</button>
			</div>
			<form>
            	<input type="text" placeholder="Add new note ..."></input>
            	<button>+</button>
			</form>
            <ul></ul>
        `;
		renderHook.append(todoEl);
		const deleteListBtn = todoEl.querySelector('button');
		const form = todoEl.querySelector('form');
		const submitBtn = form.querySelector('button');
		const notesList = todoEl.querySelector('ul');
		deleteListBtn.addEventListener('click', () => {
			todoEl.classList.add('delete');
			todoEl.addEventListener('transitionend', () => {
				todoEl.remove();
			});
		});
		submitBtn.addEventListener('click', (e) => {
			e.preventDefault();
			const inputNotes = todoEl.querySelector('input').value;
			if (inputNotes.trim() === '') {
				return;
			}
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
