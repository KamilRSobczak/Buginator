import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import AppDetails from '../AppDetails/AppDetails';
import AppCreate from '../AppCreate/AppCreate';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Pagination from '../Pagination/Pagination';
const AppList = (props) => {

    const url = 'http://localhost:8100/api/buginator/application/by-user';
    const [appList, setAppList] = useState([]);
    const [appDetailId, setAppDetailId] = useState("");
    const [Loader, setLoader] = useState(true);

    let apps = [];

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPostPerPage] = useState(4);

    const indexOfLastPost = currentPage * totalPostPerPage;
    const indexOfFirstPost = indexOfLastPost - totalPostPerPage;



    useEffect(() => {
        axios.get(url).then(
            res => {
                setAppList(res.data)
                setLoader(false);
            }
        );
    }, [appList])

    if (!Loader) {
        const currentPost = appList.slice(indexOfFirstPost, indexOfLastPost);
        
        apps = currentPost.map(app => {
            return (<div className="appListTable" key={app.id}>

                <p className="appListTableEntity">{app.name}</p>
                <p className="appListTableEntity">{app.allErrorCount}</p>
                <p className="appListTableEntity">{app.lastWeekErrorCount}</p>
                <Link className="appListTableEntity"
                    to={`/Applications/${app.id}`}
                    onClick={e => { setAppDetailId(app.id); }}>
                    Details</Link>
            </div>)
        })
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Auxiliary>

            <Route path="/Applications" exact>
                <h2>AppList</h2>
                {props.permisionList.includes("create_application") ? <button><Link to="/Applications/Create-App">Create App</Link></button> : " "}

                <div className="appListTable">
                    <p className="appListTableEntity">name</p>
                    <p className="appListTableEntity">Errors</p>
                    <p className="appListTableEntity">Last Week Errors</p>
                    <p className="appListTableEntity"></p>
                </div>

                {apps}

                {appList.length <= totalPostPerPage ? " " :
                    <Pagination appDetails={appList}
                        postPerPage={totalPostPerPage}
                        paginate={paginate} />
                }
            </Route>
            <Switch>
                <Route path="/Applications/Create-App" exact>
                    <AppCreate />
                </Route>
                <Route path={"/Applications/:appDetailId"} exact>
                    <AppDetails />
                </Route>
            </Switch>
        </Auxiliary>);
}

export default AppList;

