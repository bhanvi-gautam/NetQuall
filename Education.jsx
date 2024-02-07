import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetPostsMutation} from './rtk/AddSlice';


const Education = () => {
    const [getdata, { isLoading, isSuccess, post }] = useGetPostsMutation();
    // const [addData]=useRegisterMutation();
    const [posts, setPosts] = useState(post);

    const abc = async () => {
        const fetchPosts = await getdata().unwrap();
        setPosts(fetchPosts.data);
    }

    useEffect(() => {
        abc();
    }, []);
    
    // console.log("posts==",posts);
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <>
            <table class="table table-hover">

               
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Course</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.map(
                            (data, index) =>
                               
                                    <tr key={data.id}>
                                        <td>{index + 1}.</td>
                                        <td>{data.courseName}</td>
                                        <td><Link to={`/addEducation/edit/${data.id}`}>Edit</Link></td>
                                    </tr>
                               
                        )
                        }
                    </tbody>
                    </table>
                
            </>
        )


    }

    return (
        <>
            {content}
        </>
    );
};

export default Education;