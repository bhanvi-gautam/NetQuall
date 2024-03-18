import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import backgroundImage from "../../assets/img/register_bg_2.png";
import {
  useRegisterMutation,
  useGetFileIdMutation,
  useUploadImageMutation,
} from "../../components/rtk/AddSlice";
import { encryptData } from "../../assets/security/encryDecrypt";
import CourseDropDown from "../../components/Forms/Parts/CourseDropDown";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SubjectDropDown from "../../components/Forms/Parts/SubjectDropDown";

const Register = () => {
  const [value, setValue] = useState("");
  const [addData] = useRegisterMutation();
  const [showError, setShowError] = useState(false);
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");
  const [uploadImage] = useUploadImageMutation();
  const [sendFileName, { isLoading, isSuccess, post }] = useGetFileIdMutation();
  const [files, setFiles] = useState([]);
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileId, setFileId] = useState("");
  const [course, setCourse] = useState("");
  const [subjects, setSubjects] = useState([""]);
  const [length, setLength] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword);
  };

  const handleCourseChange = (value1) => {
    console.log("value1", value1);
    setCourse(value1);
  };

  const onDrop = (acceptedFiles) => {
    let file = acceptedFiles[0];
    const size = file.size;
    console.log("file :>> ", file);
    if (file) {
      setFileUploaded(file.name);
      setShowName(true);
      setName(file.name);
      setFileSize(size);
      setFileName(file.name);
      setLength(file.length);
      // const selectedFiles = Array.from(e.target.files);
      setFiles(acceptedFiles);
      if (size >= 52428800) {
        setShowError(true);
      }
      handleUpload();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const myStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // This will cover the full height of the viewport
    width: "100vw",
  };
  const handleSubjectChange = (index, value2) => {
    const values = [...subjects];
    values[index] = value2;
    setSubjects(values);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const handleRemoveSubject = (index) => {
    const values = [...subjects];
    values.splice(index, 1);
    setSubjects(values);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const size = e.target.files[0].size;
    if (file) {
      setFileUploaded(file.name);
      setShowName(true);
      setName(file.name);
      setFileSize(size);
      setFileName(file.name);
      setLength(e.target.files[0].length);
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      if (size >= 52428800) {
        setShowError(true);
      }
      handleUpload();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let profile = fileName;
    let profile = "";
    if (fileId) {
      profile = `file-${fileId}-${fileName}`;
    }
    let first_name = e.target.elements.firstName.value;
    let last_name = e.target.elements.lastName.value;
    let phone_number = e.target.elements.phnNo.value;
    let address = e.target.elements.address?.value;
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let confirm_password = e.target.elements.confirm_password.value;
    let occupation = value === "Teacher" ? 2 : 3;
    // console.log(fileName);

    const data = {
      profile,
      occupation,
      first_name,
      last_name,
      phone_number,
      address,
      email,
      password,
      confirm_password,
      subjects,
    };

    console.log("data", data);
    // return;
    const start = 0;
    const end = fileSize;
    try {
      if (profile) {
        for (const file of files) {
          const fileData = new FormData();
          fileData.append("file", file);
          await uploadImage({
            x: fileData,
            y: fileId,
            z: `bytes=${start}-${end}/${fileSize}`,
          });
        }
      }
      const encryptedData = encryptData(data);
      await addData({ data: encryptedData });
    } catch (error) {
      console.error("Error in upload or add operations", error);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleUpload = () => {
    console.log("hie1");
    // if (length > 0) {
    console.log("hie2");
    if (fileSize < 52428800) {
      sendFileName(fileName)
        .unwrap()
        .then((fetchFileId) => {
          console.log("fetchFileId :>> ", fetchFileId);
          setFileId(fetchFileId.fileId);
        })
        .catch((error) => {
          console.error("Error fetching FileId: ", error);
        });
      // }
    } else {
      // Set default fileId and fileName when no file is selected
      setFileId(null);
      setFileName(null);
      setShowError(true);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full" style={myStyle}>
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-1/2 lg:w-6/12 px-4 text-left">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="mb-3">
                  <h6 className="text-blueGray-700 text-lg font-bold text-center">
                    Sign up
                  </h6>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="w-full">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="roleSelect"
                        >
                          What is the Role?
                        </label>
                        <select
                          id="roleSelect"
                          name="roleSelect"
                          defaultValue=""
                          value={value}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          required
                        >
                          <option value="Select-a-role">Select a role</option>
                          <option value="Student">Student</option>
                          <option value="Teacher">Teacher</option>
                        </select>
                      </div>

                      {value !== "" && (
                        <>
                          <div className="flex space-x-4 mt-4 my-4">
                            <div className="w-1/2">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="name"
                              >
                                First_Name
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                className="border-0 px-3 py-3  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/4 ease-linear transition-all duration-150"
                                placeholder="First Name"
                                required
                              />
                            </div>

                            <div className="w-1/2">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="name"
                              >
                                Last_Name
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                className="border-0 px-3 py-3  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-3/4 ease-linear transition-all duration-150"
                                placeholder="Last Name"
                                required
                              />
                            </div>
                          </div>

                          <div className="w-full">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="phnNo"
                            >
                              Contact Number
                            </label>
                            <input
                              id="phnNo"
                              type="tel"
                              name="phnNo"
                              pattern="[0-9]*"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              required
                            />
                          </div>

                          <div className="w-full mt-4">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <input
                              id="address"
                              type="text"
                              name="address"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              required
                            />
                          </div>
                          <div className="w-full mt-4">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              required
                            />
                          </div>
                          <div className="w-full mt-4">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              required
                            />
                            {showPassword ? (
                              <VisibilityOff
                                onClick={handleClickShowPassword}
                              />
                            ) : (
                              <Visibility onClick={handleClickShowPassword} />
                            )}
                          </div>
                          <div className="w-full mt-4">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="confirm_password"
                            >
                              Confirm Password
                            </label>
                            <input
                              id="confirm_password"
                              type={showPassword1 ? "text" : "password"}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              required
                            />
                            {showPassword1 ? (
                              <VisibilityOff
                                onClick={handleClickShowPassword1}
                              />
                            ) : (
                              <Visibility onClick={handleClickShowPassword1} />
                            )}
                          </div>

                          {value === "Teacher" && (
                            <>
                              <div className="w-full mt-4">
                                {subjects.map((subject, index) => (
                                  <div key={index}>
                                    <SubjectDropDown
                                      title={"Select Subject"}
                                      onSubjectChange={(value2) =>
                                        handleSubjectChange(index, value2)
                                      }
                                    />
                                    {subjects.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveSubject(index)
                                        }
                                      >
                                        -
                                      </button>
                                    )}
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={handleAddSubject}
                                >
                                  +
                                </button>
                              </div>
                            </>
                          )}

                          {value === "Student" && (
                            <div className="w-full mt-4">
                              <CourseDropDown
                                title={"Select Course"}
                                onCourseChange={handleCourseChange}
                              />
                            </div>
                          )}

                          <div className="w-full mt-4">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="Choose_profile"
                            >
                              Choose Profile:
                            </label>
                            <div {...getRootProps()} className="relative">
                              <input
                                {...getInputProps()}
                                onChange={handleFileChange}
                                accept=".png,.jpg,.jpeg"
                                multiple={false}
                                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                              />
                              <p>
                                Drag and drop files here or click to browse.
                              </p>
                              <ul>{fileUploaded && <li>{fileUploaded}</li>}</ul>

                              {showError && (
                                <div className="mt-4">
                                  <p className="text-red-500 text-sm">
                                    Max size: 5MB
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                          />
                        </div>

                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                              I agree with the{" "}
                              <a
                                href="#pablo"
                                className="text-lightBlue-500"
                                onClick={(e) => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div> */}

                          <div className="text-center mt-6">
                            <button
                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Create Account
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
