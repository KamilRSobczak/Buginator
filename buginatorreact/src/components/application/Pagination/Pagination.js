import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const Pagination = ({ appDetails, postPerPage, paginate }) => {

    const pageNumbers = [];
    const totalPost = appDetails.length;

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }

    const pagination = (
        <div className="pagination">
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className="pagination_number"
                    onClick={() => paginate(number)} >
                    {number}
                </button>
            ))}
        </div>
    );

    return (<Auxiliary> {pagination} </Auxiliary>)
}

export default Pagination;