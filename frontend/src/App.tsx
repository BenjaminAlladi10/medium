import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import {Blogs} from './pages/Blogs'
import { Publish } from './components/Publish'
import { Main } from './pages/Main'
import { Test } from './pages/Test'

function App() {
  
  return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/main?" element= {<Main/>}></Route>
          <Route path="/signup" element= {<Signup/>}></Route>
          <Route path="/signin" element= {<Signin/>}></Route>
          <Route path="/Blog/:id?" element = {<Blog/>}></Route>
          <Route path="/Blogs" element = {<Blogs/>}></Route>
          <Route path="/publish" element = {<Publish/>}></Route>
          <Route path='/test' element = {<Test/>}></Route>
        </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
