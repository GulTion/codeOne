import React from 'react'
import Editor from "./Editor/Editor"
import "./App.css"
import Header from './Chemistry/Header'
import RunButton from './Chemistry/RunButton'
export default function App() {

  return (
    <div className='App'>
     <Header />
      <Editor></Editor>
    </div>
  )
}
