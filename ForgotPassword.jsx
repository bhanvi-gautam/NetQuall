import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import backgroundImage from "../../assets/img/register_bg_2.png";
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
    const myStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // This will cover the full height of the viewport
    width: "100vw",
  };

    useEffect(() => {

    }, [show]);
    return (
        <div>
           <div className="container mx-auto px-4 h-full" style={myStyle}>
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h2 className="text-blueGray-700 text-lg font-bold">
                    Forgot Password?
                  </h2>
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Input your Email to reset password</small>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  {show && (
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="otp"
                      >
                        OTP
                      </label>
                         <Timer/>
                      <input
                        type="text"
                          name="otp"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="OTP"
                      />
                         <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Enter otp just sent to you</small>
                  </div>
                    </div>
                  )}

                  <div className="text-center mt-6">
                    {!show ? (
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShow(true)}
                      >
                        Reset
                      </button>
                    ) : (
            <>
                      // <Link to="/resetPassword">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                            onCLick={handleOtp}
                        >
                          Verify OTP
                        </button>
                         
                          </>
                      // </Link>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ForgotPassword
