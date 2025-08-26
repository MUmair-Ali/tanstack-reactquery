import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {deletePost, fetchData, updatePost} from '../api/Api'
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FetchRQ = () => {


    const [pageNumber, setPageNumber] = useState(0)

    const queryClient = useQueryClient()

    const getPosts = async () => {
                const data = await fetchData(pageNumber);
                console.log(data)
                return data
    }


    const {data, isPending, isError } = useQuery(
        {
            queryKey:['posts', pageNumber], //useState
            queryFn: () => getPosts(pageNumber), //useEffect
            placeholderData: keepPreviousData, //this will only show next data when its loaded i.e. not show loading when paginating
            //gcTime: 1000,
            //staleTime: 5000, // 5sec stale time 
            //refetchInterval: 100, //refetching within 1ms
            //refetchIntervalInBackground: true //it wil refetch even if not on site
        }
    )


    //! Mutation 

    const dltMutation = useMutation(
        {
            mutationFn: (id) => deletePost(id),
            onSuccess: (data, id) => {
                queryClient.setQueryData(['posts', pageNumber], (posts) => {
                    return posts?.filter((currPost) => currPost.id !== id);
                })
            }
        })

    const updtMutation = useMutation(
        {
            mutationFn: (id) =>  updatePost(id),
            onSuccess: (apiData, postId) => {
                queryClient.setQueryData(['posts', pageNumber], posts => {
                    return posts?.map(currPost => {
                        return currPost.id === postId ? {...currPost, title:apiData.title} : currPost
                    })
                })
            }
        }
    )

    if (isPending) return <h1>Loading...</h1>
    if (isError) return <h1>Error!</h1>
    return ( 
        <section>
            <ul className="post-section">
                {
                    data?.map(currElem => {
                        const {id, title, body} = currElem;

                        return (
                            <li key={id}>
                                <NavLink to={`/rq/${id}`}>
                                    <p>{id}. </p>
                                    <p><strong>{title}</strong></p>
                                    <p>{body}</p>
                                </NavLink>
                                <div className="action-btns">
                                    <button className="btn-edt" onClick={() => updtMutation.mutate(id)}>Update</button>
                                    <button className="btn-dlt" onClick={() => dltMutation.mutate(id)}>Delete</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="pagination-container">
                <button disabled={pageNumber === 0} onClick={() => setPageNumber(prev => prev - 3)}>Prev</button>
                <span>{(pageNumber / 3) + 1}</span>
                <button onClick={() => setPageNumber(prev => prev + 3)}>Next</button>
            </div>
        </section>
        
        )
}

export default FetchRQ