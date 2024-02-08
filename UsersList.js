import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useGetUsersMutation} from './rtk/AddSlice';

const UsersList = () => {
  // const [getdata, { isLoading, isSuccess, post }] = useGetUsersMutation();
  // const [posts, setPosts] = useState(post);

  // const abc = async () => {
  //     const fetchPosts = await getdata().unwrap();
  //     setPosts(fetchPosts);
  // }

  // useEffect(() => {
  //     abc();
  // }, []);
  // console.log("posts==",posts);
  let content;
  // if (isLoading) {
  //     content = <p>Loading...</p>;
  // } else if (isSuccess) {
  content = (
    <>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>email</th>
            <th>Address</th>
            <th>Contact No.</th>
          </tr>
        </thead>
        {/* <tbody>
                        {posts?.map(
                            (data, index) =>
                               
                                    <tr key={data.id}>
                                        <td>{index + 1}.</td>
                                        <td>{data.first_name+" "+data.last_name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.address}</td>
                                        <td>{data.phone_number}</td>
                                    </tr>
                               
                        )
                        }
                    </tbody> */}
      </table>
    </>
  );

  // }

  return (
    <>
      <h1>List of Users</h1>
      {content}
    </>
  );
};

export default UsersList;
