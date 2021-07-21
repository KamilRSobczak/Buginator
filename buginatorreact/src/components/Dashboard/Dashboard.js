import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppList from '../application/AppList/AppList';
import { Switch, Route, Link } from "react-router-dom";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const Dashboard = () => {
    const url = 'http://localhost:8100/api/auth/session/user/current';
    const token = localStorage.getItem('token');
    const [permisionList, setPermisionList] = useState([]);

    useEffect(() => {
        axios.get(url).then(
            res => {
                setPermisionList(res.data.permissions)
            }
        );
    }, [])

    return (
        <Auxiliary>
            {!token ? window.location.href = "/" :
                <div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/Applications">Application</Link>
                    </nav>
                    <h1>Dashboard</h1>
                    <div>
                        <Switch>
                            <Route path="/" exact>
                                Home
                            </Route>
                            <Route path="/Applications">
                                <AppList permisionList={permisionList} />
                            </Route>
                        </Switch>
                    </div>

                </div>}
        </Auxiliary>
    );
}

export default Dashboard;