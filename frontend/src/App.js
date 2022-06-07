import './App.css';
import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import UpdatetodoList from './Components/updatetodoList/updatetodoList';
import CreateTodo from './Components/CreateTodo/createTodo';
import TodoList from './Components/todoList/todoList';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Routes>
          <Route path="/" exact element={<TodoList />} />
          <Route path="/edit/:id" element={<UpdatetodoList />} />
          <Route path="/create" element={<CreateTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
