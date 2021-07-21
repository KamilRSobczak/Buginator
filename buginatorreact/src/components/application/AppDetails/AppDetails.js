import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import AppEntity from './AppEntity/AppEntity';
const AppDetails = () => {

    const detailUrl = window.location.href;
    const id = detailUrl.split("/").pop();;
    const url = `http://localhost:8100/api/buginator/application/${id}`;
    const [appDetails, setAppDetails] = useState([]);
    const [Loader, setLoader] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPostPerPage] = useState(5);

    const indexOfLastPost = currentPage * totalPostPerPage;
    const indexOfFirstPost = indexOfLastPost - totalPostPerPage;
    let errors = [];

    useEffect(() => {
        axios.get(url).then(
            res => {
                setAppDetails(res.data)
                setLoader(false);
            }
        );
    }, [])

    if (!Loader) {
        const currentPost = appDetails.errors.slice(indexOfFirstPost, indexOfLastPost);

        errors = currentPost.map(errors => {
            return (<div className="appBuggsTable" key={errors.id}>
                <AppEntity data={errors.title} />
                <AppEntity data={errors.description} />
                <AppEntity data={errors.status} />
                <AppEntity data={errors.severity} />
                <AppEntity data={errors.lastOccurrence} />
                <AppEntity data={errors.count} />
                <Link className="appBuggsTableEntity" to={'/Applications/'}>Details(inprogress)</Link>
            </div>)

        })
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Auxiliary>
            {Loader ? <p>Loading</p> :
                <div>
                    <h2> APP {appDetails.name} </h2>
                    <button><Link to={'/Applications'}>Back</Link></button>

                    <div>
                        <h2>Buggs</h2>
                        <div className="appBuggsTable">
                            <h3 className="appBuggsTableEntity">Title</h3>
                            <h3 className="appBuggsTableEntity">Desc</h3>
                            <h3 className="appBuggsTableEntity">Status</h3>
                            <h3 className="appBuggsTableEntity">Severity</h3>
                            <h3 className="appBuggsTableEntity">Last Occurrence</h3>
                            <h3 className="appBuggsTableEntity">Count</h3>
                            <p className="appBuggsTableEntity"></p>
                        </div>
                        {errors}
                    </div>

                    {appDetails.errors.length <= totalPostPerPage ? " " :
                        <Pagination appDetails={appDetails.errors}
                            postPerPage={totalPostPerPage}
                            paginate={paginate} />
                    }
                </div>}
        </Auxiliary>);
}

export default AppDetails;

