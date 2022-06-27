import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AiFillDelete } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import '../Estilos/TodoFetch.css'

function TodoFetch() {

    const [tarea, setTarea] = useState({ label:'', done: false, id:uuidv4()})
    const [lista, setLista] = useState([])
    const [face, setFace] = useState(<FontAwesomeIcon icon={faLaughBeam} />);

    const getApi = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/mr", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return(json.msg ? crearUsuario() : setLista(json));
        })
    }

    const crearUsuario = async () => {
        const settings = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify([]),
        }; await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/mr",
          settings
        );
      };

    const agregarTarea = async (element) => {
        element.preventDefault();
      const nuevaLista = [...lista, tarea];
    setLista(nuevaLista);
    try {
      const settings = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(nuevaLista),
      };
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/mr",
        settings
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(Error);
    } 
  } 

    const borrarTarea = async (index) => {
        const nuevaLista = [...lista];
        nuevaLista.splice(index, 1);
        setLista(nuevaLista);
      
        const settings = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        };
        const request = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/mr",
          settings
        );
        const json = await request.json();
        console.log(json);
      };

    const borrarTodo = () => {
        setLista([]);
        fetch("https://assets.breatheco.de/apis/fake/todos/user/mr", {
          method: "DELETE",
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
        getApi();
    }, []);


    return (
          <>
            <form onSubmit={agregarTarea}>
              <div className="contenedor-tarea">
                  <h1>¿Plan para hoy?</h1>
                  <input  type="text" className="agregar-input"id="task"
                    value={tarea.label}
                    onChange={element => setTarea({label: element.target.value, done: false, id:uuidv4()})}
                    placeholder= "   Escribe una tarea...    "
                  />
                  <button type='submit' className='boton'>Agregar tarea {face} </button>
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
                      <div className="vacio">Vacio</div>
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






    
