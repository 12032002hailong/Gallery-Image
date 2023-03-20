import ModalCreateUser from "./ModalCreateUser.js";
import './ManageUser.scss';
import { useState } from 'react';
import { useEffect } from 'react';

import ModalUpdateUser from "./ModalUpdateUser.js";
import ModalDeleteUser from "./ModalDeleteUser.js";
import TableUserPaginate from "./TableUserPaginate.js";
import { getAllUsers, getUserWithPaginate } from "../services/apiService.js";
import { Container } from "react-bootstrap";

const ManageUser = (props) => {
    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)

        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <>
            <Container>
                <div className="manage-user-container">
                    <div className="title">
                        Manage Gallery
                    </div>
                    <div className='users-content'>
                        <div className="btn-add-new">
                            <button className="btn btn-outline-primary"
                                onClick={() => setShowModalCreateUser(true)}>
                                Add New Image</button>
                        </div>
                        <div className="table-users-container">
                            {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                            <TableUserPaginate
                                listUsers={listUsers}
                                setListUsers={setListUsers}
                                handleClickBtnUpdate={handleClickBtnUpdate}
                                handleClickBtnDelete={handleClickBtnDelete}
                                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                                pageCount={pageCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                getUserWithPaginate={getUserWithPaginate}

                            />
                        </div>
                        <ModalCreateUser
                            show={showModalCreateUser}
                            setShow={setShowModalCreateUser}
                            fetchListUsers={fetchListUsers}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <ModalUpdateUser
                            show={showModalUpdateUser}
                            setShow={setShowModalUpdateUser}
                            dataUpdate={dataUpdate}
                            fetchListUsers={fetchListUsers}
                            resetUpdateData={resetUpdateData}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <ModalDeleteUser
                            show={showModalDeleteUser}
                            setShow={setShowModalDeleteUser}
                            dataDelete={dataDelete}
                            fetchListUsers={fetchListUsers}
                            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}
export default ManageUser;