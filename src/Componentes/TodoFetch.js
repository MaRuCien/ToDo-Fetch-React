import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import '../Estilos/TodoFetch.css'

function TodoFetch() {

  const [tarea, setTarea] = useState({ label: '', done: false })
  const [input, setInput] = useState("");
  const [lista, setLista] = useState([])
  const [face, setFace] = useState(<FontAwesomeIcon icon={faLaughBeam} />);


  const crearUsuario = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mr', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-type": "application/json",
      }
    }).then(response => response.json())
      .then(data => setTarea(data))
      .catch(error => console.error('Error:', error))
  };

  
  const agregarTarea = (element) => {
    element.preventDefault();
    if (input != null){ 
       const nuevaLista = [...lista, tarea];
    setLista(nuevaLista);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mr', {
      method: "PUT",
      body: JSON.stringify(nuevaLista),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    }
    setInput("");
  };


  const borrarTarea = (index) => {
    const nuevaLista = [...lista];
    nuevaLista.splice(index, 1);
    setLista(nuevaLista);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mr', {
      method: "PUT",
      body: JSON.stringify(nuevaLista),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };


  const borrarTodo = () => {
    setLista([]);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/mr', {
      method: "PUT",
      body: JSON.stringify([]),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    crearUsuario();
  }, []);


  return (
    <>
      <form onSubmit={agregarTarea}>
        <div className="contenedor-tarea">
          <h1>¿Plan para hoy?</h1>
          <input type="text" className="agregar-input" id="task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? setTarea({ label: e.target.value, done: false }) : "")}  
            placeholder="Presiona enter para agregar una tarea :)"
          />
        </div>
      </form>
      <div className="aplicacion-tarea">
        <ul className="lista-tarea">
          {!!lista &&
            lista.length > 0 ?
            lista.map((tarea, index) => {
              console.log('tarea', tarea);
              return (
                <li key={index} href="/#" className="tarea">
                  {tarea.label}
                  <button className="boton" onClick={() => borrarTarea(index)}>
                    <AiFillDelete />
                  </button>
                </li>
              )
            }) : (
              <div className="vacio">Vacío</div>
            )
          }
          <button type="button" className="boton"
            onClick={() => borrarTodo()}>Borrar todo</button>
          <footer className="contador"> Por hacer ({!!lista ? lista.length : 0}) {face} </footer>
        </ul>
      </div>
    </>
  );
}

export default TodoFetch;







