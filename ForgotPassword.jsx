import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import { useVerifyEmailMutation, useVerifyOTPMutation, useClearOTPMutation } from './rtk/AddSlice';

const ForgotPassword = () => {
    let navigate = useNavigate();
    const [sendEmail, { isLoading, isSuccess, isError }] = useVerifyEmailMutation();
    const [sendOtp] = useVerifyOTPMutation();
    const [clearOTP] = useClearOTPMutation();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');

    const handleOtp = async (e) => {
        e.preventDefault();
        let OTP = e.target.elements.otp.value;
        console.log("emailCheck===", email);
        try {
            const check = await sendOtp({ email: email, otp: OTP }).unwrap();
            console.log(check);

            if (check) {
                navigate(`/change-password/${email}`);

            }


            else {
                window.alert('Wrong OTP');
            }
        } catch (error) {
            console.error(error);
            window.alert('Wrong OTP');
        }
        // console.log(OTP);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // email = e.target.elements.email.value;
        console.log(email);
        try {
            const verify = await sendEmail(email).unwrap();
            //timer of 50sec ... n after refresh also same
            setTimeout(async () => {
                await clearOTP({ email: email });
            }, 60000);
            console.log(verify);
            if (verify.code === 200) {
                console.log("hie");
                setShow(true);
            }
            else {
                window.alert('Error sending email');
            }
        } catch (error) {
            console.error(error);
            window.alert('Error sending email');
        }

    }

    useEffect(() => {

    }, [show]);
    return (
        <div>
            <h1>Hello</h1>
            <h1>Enter your Registered Email address</h1>

            <form onSubmit={handleSubmit} className='formStyle'>

                <div className="form-outline mb-4">
                    <input type="email" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} />
                    <label className="form-label" htmlFor="form2Example1">
                        Email address
                    </label>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Send OTP
                    </button>
                </div>
            </form>
            {show &&
                <>
                    <form onSubmit={handleOtp} className='formStyle'>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" name="otp" />
                            <label className="form-label" htmlFor="form2Example1">
                               <span> Enter OTP</span> <span><Timer/></span>
                            </label>
                        </div>
                        <button type='submit' className="btn btn-primary btn-block mb-4">Verify</button>
                    </form>
                </>

            }



        </div>
    )
}

export default ForgotPassword
