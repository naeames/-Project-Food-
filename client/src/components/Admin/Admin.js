import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {listUsers} from "../../Actions/action"
import axios from "axios"
import {Table} from 'react-bootstrap';
import Bc2 from '../../images/Bc2.jpg'

function Admin(props) {

    const handleEnable = (id) => {
        axios.put(`http://localhost:7000/api/users/enable/${id}`)

    }
    const handleDisable = (id) => {
        axios.put(`http://localhost:7000/api/users/disable/${id}`);

    }
    useEffect(() => {
        async function getUsers() {
            const response = await axios.get(" http://localhost:7000/api/users");
            props.listUsers(response.data)
        }

        getUsers();

    },)

    return (
        <div style={{ backgroundImage: "url(" + Bc2 + ")",width:'100%',height:'900px',padding:'50px'}}>
            <Table striped bordered hover>
                <thead >
                    <tr >
                        <th>Users email</th>
                        <th>Activate/Desactivate</th>
                    </tr>
                </thead>
                <tbody  style={{color:'white'}} > {
                    props.users.map(e => (
                        <tr>
                            <td  > {
                                e.email
                            } </td>
                            <td>

                                <button style={{margin:'25px',width:'100px',height:'50px'}} onClick={
                                        () => {

                                            (!e.activate) ? handleEnable(e._id) : handleDisable(e._id)
                                        }
                                    }
                                    variant="contained"
                                    className="info">
                                    {
                                    (!e.activate) ? <label className="enable">Enable</label> : <label className="disable">Disable</label>
                                }</button>
                            </td>
                        </tr>
                    ))
                } </tbody>
            </Table>
        </div>
    )
}
const mapStateToProps = state => ({users: state.listUsers})

export default connect(mapStateToProps, {listUsers})(Admin)
