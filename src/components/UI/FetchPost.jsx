import { useQuery } from "@tanstack/react-query"
import { fetchDataById } from "../../api/Api"
import { NavLink, useParams } from "react-router-dom"


const FetchPost = () => {

    const {id} = useParams()

    const getPostByID = async () => {
        const data = await fetchDataById(id)
        return data
    }

    const {data, isPending, isError} = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostByID(id)
    })

    if(isPending) return <h1>Loading...</h1>
    if(isError) return <h1>Error!</h1>

    return (
        <section className="details-section">
            <div className="container">
                <div className="post-details">
                    <h1>Post ID: {data.id}</h1>
                    <h1>{data.title}</h1>
                    <p>{data.body}</p>
                </div>
                <NavLink to='/rq' className='btn-back'>
                    <button>Go Back</button>
                </NavLink>
            </div>
        </section>
    )
}

export default FetchPost