import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import './TableUserPaginate.scss'
import _ from "lodash";
import { debounce } from 'lodash';
import { useEffect } from 'react';
import Lightbox from "react-awesome-lightbox";


const TableUserPaginate = (props) => {

    const { listUsers, pageCount, setListUsers,
        fetchListUsersWithPaginate, currentPage
    } = props;

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
    };
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id")

    const [keyword, setKeyword] = useState("");


    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers)
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.username.includes(term));
            setListUsers(cloneListUsers)
        } else {
            fetchListUsersWithPaginate(1)
        }
    }, 300)






    return (
        <>
            <div className='table-container'>
                <div className='col-4 my-3'>
                    <input
                        className='form-control'
                        placeholder='Search user by Name....'
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th >
                                <div className="sort-header">
                                    <span>ID</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "id")}
                                        ></i>

                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "id")}
                                        ></i>
                                    </span>
                                </div>


                            </th>
                            <th>
                                <div className="sort-header">
                                    <span> Name</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "username")}
                                        ></i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "username")}
                                        ></i>
                                    </span>
                                </div>

                            </th>
                            {/* <th scope="col">Email</th> */}
                            <th scope="col">Image</th>
                            <th scope="col">Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={`table-users-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.username}</td>

                                            <td className='img-preview'>
                                                {item.image &&
                                                    <img
                                                        style={{ cursor: 'pointer' }}
                                                        src={`data:image/png;base64, ${item.image}`} alt="" />
                                                }
                                            </td>
                                            {/* <td>{item.email}</td> */}
                                            <td>{item.role}</td>
                                            <td>
                                                {/* <button className='btn btn-secondary'>View</button> */}
                                                <button className='btn btn-warning mx-3'
                                                    onClick={() => props.handleClickBtnUpdate(item)}
                                                >
                                                    Update
                                                </button>
                                                <button className='btn btn-danger'
                                                    onClick={() => props.handleClickBtnDelete(item)}
                                                >Delete</button>
                                            </td>
                                        </tr>

                                    </>
                                )
                            })

                        }
                        {listUsers && listUsers.length === 0 &&
                            <tr>
                                <td colSpan={'5'}> Not found data</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className='user-pagination'>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< Prev"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={props.currentPage - 1}
                    />
                </div>

            </div >

        </>
    )
}
export default TableUserPaginate;