import React from "react";

import Auth from '../../components/Auth/Auth';
import Dashboard from '../../components/Dashboard/Dashboard';



const buginator = () => {
    return (
        <div className="login">
            {localStorage.getItem('token') ? <Dashboard /> : <Auth />}
        </div>
    );
}

export default buginator;