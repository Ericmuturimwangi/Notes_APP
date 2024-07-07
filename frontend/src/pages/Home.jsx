import { useState, useEffect } from "react"
import api from "../api"

function Home() {
  const [notes, setNotes] =useState ([]); //sending an authorized request to send notes the user has created.
  const [content, setContent] = useState ("")
  const [title, setTitle] = useState("")

  useEffect(() =>{
    getNotes();
  }, [])

  const getNote = () =>{ //gets all the notes for us.
    api
    .get("/api/notes/")
    .then((res) => res.data)
    .then((data)=>{setNotes(data); console.log(data)})
    .catch((err)=> alert(err));

 
  }


  return (
  <div>Home</div>
  )
    
  
}

export default Home