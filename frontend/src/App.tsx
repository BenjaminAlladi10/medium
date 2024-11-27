import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import {Blogs} from './pages/Blogs'
import { Publish } from './components/Publish'
import { Appbar } from './components/Appbar'

function App() {
  
  return (
      <>
      <BrowserRouter>
        <Appbar></Appbar>
        <Routes>
          <Route path="/signup" element= {<Signup/>}></Route>
          <Route path="/signin" element= {<Signin/>}></Route>
          <Route path="/Blog/:id?" element = {<Blog/>}></Route>
          <Route path="/Blogs" element = {<Blogs/>}></Route>
          <Route path="/publish" element = {<Publish/>}></Route>
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
