import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MainLayout from './components/layouts/MainLayout'
import Home from './pages/Home'
import FetchOld from './pages/FetchOld'
import FetchRQ from './pages/FetchRQ'
import FetchPost from './components/UI/FetchPost'
import InfiniteScroll from './pages/InfiniteScroll'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/trad',
        element: <FetchOld />
      },
      {
        path: '/rq',
        element: <FetchRQ />
      },
      {
        path: '/rq/:id',
        element: <FetchPost />
      },
      {
        path: '/infinite',
        element: <InfiniteScroll />
      }
    ]
  }
])

const App = () => {

  const queryClient = new QueryClient();

  return (
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
  )
        
}

export default App;