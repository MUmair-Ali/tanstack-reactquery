import { useEffect, useState } from "react";
import {fetchData} from '../api/Api'

const FetchOld = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)
            const data = await fetchData();
            console.log(data)
            setPosts(data)
            setLoading(false)
        }

        getPosts()
    },[])

    if(loading) return <h1>Loading...</h1>

    return (
        <ul className="post-section">
            {
                posts?.map(currElem => {
                    const {id, title, body} = currElem;

                    return (
                        <li key={id}>
                            <p>{title}</p>
                            <p>{body}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default FetchOld