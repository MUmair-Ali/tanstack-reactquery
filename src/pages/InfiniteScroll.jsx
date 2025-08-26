import { useInfiniteQuery } from "@tanstack/react-query"
import { getUsers } from "../api/Api"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"


const InfiniteScroll = () => {

    const {data, hasNextPage, fetchNextPage, status, isFetchingNextPage} = useInfiniteQuery(
        {
            queryKey: ['users'],
            queryFn: getUsers,
            getNextPageParam: (lastPage, allPages) => {
                console.log(lastPage, allPages)
                return lastPage.length === 10 ? allPages.length + 1 : undefined;
            }
        }
    )

    console.log(data)

    //! This is core javascript way to handle user scrolling to bottom

    // const handleScroll = () => {
    //     const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight -1 ;

    //     if (bottom && hasNextPage){
    //         fetchNextPage()
    //     }
    // }



    //! React intersection observer - recommended way to handle infinite scrolling
    const {ref, inView} = useInView(
        {
            threshold: 1,
        }
    )

    useEffect(() => {
        // window.addEventListener('scroll', handleScroll);

        if(inView && hasNextPage) {
            fetchNextPage();
        }

        // return () => window.removeEventListener("scroll", handleScroll)
    },[inView, fetchNextPage, hasNextPage])
    

    if (status === 'loading') return <div>Loading...</div>
    if (status === 'error') return <div>Error...</div>

    return (
        <div className="container">
            <h1>Users</h1>

            {
                data?.pages?.map((page, index) => (
                    <ul className="users-list" key={index}>
                        {
                            page.map(user => (
                                <li key={user.id}>
                                    <img src={user.avatar_url} alt={user.login} width={50} height={50} />
                                    <p>{user.login}</p>
                                </li>
                            ))
                        }
                    </ul>
                ))
            }
            <div ref={ref}>
            {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll down to laod more" : "no more users"}
            </div>
        </div>
    )
}

export default InfiniteScroll