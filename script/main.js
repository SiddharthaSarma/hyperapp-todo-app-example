const { h, app } = hyperapp;
// @jsx h

const state = {
  todos: [],
  todoText: ''
};

const actions = {
  reset: value => state => ({ todoText: '', todos: [] }),
  add: todo => state => ({
    todos: [...state.todos, { text: todo, completed: false }]
  }),
  completed: index => state => ({
    todos: state.todos.map((el, i) => {
      if (i === index) {
        el['completed'] = !el['completed'];
      }
      return el;
    })
  }),
  remove: index => state => ({
    todos: state.todos.filter((el, i) => i !== index)
  })
};

const view = (state, actions) => (
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h1
          align="center"
          style={{
            'margin-bottom': '20px'
          }}
        >
          HyperApp Todo Application
        </h1>
        <div class="col-md-10">
          <form
            onsubmit={(e, ele) => {
              e.preventDefault();
              if (e.target[0].value) {
                actions.add(e.target[0].value);
              }
            }}
          >
            <input
              type="text"
              placeholder="Add todo..."
              class="form-control"
              value={state.todoText}
            />
          </form>
        </div>
        <div class="col-md-2">
          <button
            class="btn btn-danger"
            disabled={state.todos.length === 0}
            onclick={actions.reset}
          >
            Clear all
          </button>
        </div>
      </div>
      <div
        class="col-md-6 col-md-offset-3"
        style={{
          'margin-top': '20px'
        }}
      >
        <ul class="list-group">
          {state.todos.map((e, i) => (
            <li class="list-group-item">
              <span
                style={{
                  'text-decoration': e.completed ? 'line-through' : 'none',
                  opacity: e.completed ? 0.5 : 1,
                  color: '#f00',
                  cursor: 'pointer'
                }}
                onclick={() => actions.completed(i)}
              >
                <span style={{ color: '#000' }}>{e.text}</span>
              </span>
              <button
                onclick={() => actions.remove(i)}
                type="button"
                class="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

app(state, actions, view, document.body);
