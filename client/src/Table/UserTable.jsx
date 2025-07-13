import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import Table from '../Component/Table'
import AddUser from '../Component/AddUser'
import UpdatedUser from '../Component/UpdatedUser'
import DeletUser from '../Component/DeletUser'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function UserTable() {
    const [userId, setUserId] = useState()
    const [updatedUserId, setUpdatedUserId] = useState()
    const [value, setValue] = useState({
        name: "",
        email: "",
        department: "",
        designation: "",
        password: ""
    })

    // Initialize the useNavigate hook for routing
    const navigate = useNavigate()

    const deletuser = (userid) => {
        setUserId(userid)
    }

    const handleUserDelet = async () => {
        try {
            const DeletUser = await axios.delete(`http://10.51.20.77:3000/api/delete/${userId}`)
            const response = DeletUser.data
            if (response.success) {
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlechange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const UpadteUserData = (Updatedid) => {
        setUpdatedUserId(Updatedid)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const UpdatedUser = await axios.put(`http://10.51.20.77:3000/api/update/${updatedUserId}`, value)
            const response = UpdatedUser.data

            if (response.success) {
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* Back Button */}
            <button
                onClick={() => navigate('/admin-home')}
                style={styles.backButton}
            >
                Back to Admin Home
            </button>

            <Table Deletuser={deletuser} UpdatedUser={UpadteUserData}></Table>
            <AddUser></AddUser>
            <UpdatedUser handleOnSubmit={handleOnSubmit} value={value} handlechange={handlechange}></UpdatedUser>
            <DeletUser handleUserDelet={handleUserDelet}></DeletUser>
        </div>
    )
}

// Styling for the Back button
const styles = {
    backButton: {
        margin: "10px 0",
        padding: "10px 20px",
        background: "#1f184c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
}
