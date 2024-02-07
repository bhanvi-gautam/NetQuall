import React from 'react'
import { useRegisterMutation } from './rtk/AddSlice';
const AddUser = () => {
    const [addData] = useRegisterMutation();
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        let first_name = e.target.elements.firstName.value;
        let last_name = e.target.elements.lastName.value;
        let phone_number = e.target.elements.phnNo.value;
        let address = e.target.elements.address.value;
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;
        let confirm_password = e.target.elements.confirm_password.value;
        const data = { first_name, last_name, phone_number, address, email, password, confirm_password };
        addData(data);
    }
    return (
        <div>
            <form onSubmit={handleRegisterSubmit} className='formStyle'>
                <div className="form-outline mb-4">
                    <input type="text"   className="form-control" name="firstName" />
                    <label className="form-label"  >
                        First Name
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="text"   className="form-control" name="lastName" />
                    <label className="form-label"  >
                        Last Name
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="tel"   className="form-control" name="phnNo" />
                    <label className="form-label"  >
                        Contact Number
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="text"   className="form-control" name="address" />
                    <label className="form-label"  >
                        Address
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input type="email"   className="form-control" name="email" />
                    <label className="form-label"  >
                        Email address
                    </label>
                </div>

                <div className="form-outline mb-4">
                    <input
                        type="password"
                          
                        className="form-control"
                        name="password"
                    />
                    <label className="form-label"   >
                        Password
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="password"
                          
                        className="form-control"
                        name="confirm_password"
                    />
                    <label className="form-label"   >
                        Confirm Password
                    </label>
                </div>


                <div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign up
                    </button>
                </div>
                <div>
                    <div className='smallText'> Already have an account?</div>
                    <button onClick={(e) => openRegisterForm(e)} className="btn btn-primary btn-block mb-4">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddUser
