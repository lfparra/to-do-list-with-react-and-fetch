import React, { useState, useEffect } from 'react';

const App = () => {

    const [state, setState] = useState({
        inputTasks: [],
        tareasAPI: [{
            label: null,
            done: null
        }],
    })

    const getTasks = (url) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.msg) {
                    postTask(url)
                } else {
                    setState(prevState => {
                        return { ...prevState, tareasAPI: result }
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    const postTask = (url) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify([]);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.msg) {
                    getTasks(url)
                } else {
                    getTasks(url)
                }
            })
            .catch(error => console.log('error', error));
    }

    const putTasks = (url) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(...state.tareasAPI),
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getTasks("https://assets.breatheco.de/apis/fake/todos/user/lfparra")
    }, []);

    const handleChangeInput = e => {
        /* console.log(e.key) */
        if (e.key === "Enter" && e.target.value !== "") {
            /* console.log(e.target.value); */
            let task = { 
                label: e.target.value, 
                done: false 
            }
            let data = {
                tareasAPI: [...state.tareasAPI, task] //["tarea1", "tarea2", "tarea3", "nuevaTarea"],
            }
            setState(prevState => {
                return { ...prevState, ...data }
            })

            e.target.value = "";
            putTasks("https://assets.breatheco.de/apis/fake/todos/user/lfparra");
        }
    }

    const deleteTask = e => {
        console.log(e.target.id);
        let index = e.target.id;
        console.log(index);
        let data = state.tareasAPI.splice(e.target.id, 1);

        setState(prevState => {
            return { ...prevState, ...data }
        });

        putTasks("https://assets.breatheco.de/apis/fake/todos/user/lfparra");
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="post-it">
                    <h3>To-Do List</h3>
                    <input type="text" placeholder="Press enter" onKeyPress={handleChangeInput} />
                    <ul>
                        {
                            state.tareasAPI.length > 0 ?
                                (
                                    state.tareasAPI.map((elem, index, arr) => {
                                        return (

                                            <li key={index}>{elem.label}<i className="fas fa-trash-alt" onClick={deleteTask} id={index}></i></li>

                                        )
                                    })
                                ) :
                                (
                                    <li>No hay tareas Pedientes</li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default App;