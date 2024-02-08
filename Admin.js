import React from 'react'
import { Link } from 'react-router-dom'


    const Admin = () => {
        return (
            <div>
                <Link to={`/addUser`}>Adding Users</Link>
                <Link to={`/addEducation`}>Adding Courses and its Details</Link>
                
            </div>
        )
    }
    
  


export default Admin

