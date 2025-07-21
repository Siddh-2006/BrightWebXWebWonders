import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/UI/Layout'
import Home from "./components/Home"
import PlayerCard from './components/Home'
import ClubCard from './components/ClubCard'
import { RouterProvider,createBrowserRouter ,Routes,createRoutesFromElements, Route} from 'react-router'
import LiveScores from './components/LiveScores'
function App() {
  const [count, setCount] = useState(0)
  const router=createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="LiveScores/" element={<LiveScores/>}/>
      </Route>
      </>
    )
  )
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
