import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useHistory  } from 'react-router-dom';

const AppCreate = () => {
    const [newAppName, setNewAppName] = useState('');
    const url = 'http://localhost:8100/api/buginator/application';
    const location  = useLocation();
    const history  = useHistory ();
    const isValid = () => {
        return newAppName.length > 0;
    }

    const submitHandler = e => {
        e.preventDefault();

        const formBody = [];
        formBody.push(newAppName);
        axios.post(url, { name: formBody.join('&') }).then(
            res => history.push("/applications")
        );

    }

    return (
        <div>
            <button><Link to={'/Applications'}>Back</Link></button>

            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input placeholder="App Name"
                    onChange={e => setNewAppName(e.target.value)}
                    autoFocus={true} />

                <button disabled={!isValid()}>Create</button>
            </form>
        </div>);
}

export default AppCreate;
