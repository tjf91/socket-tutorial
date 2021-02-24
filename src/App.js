import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client'
const socket = io.connect('/')

function App() {  
  const [state,setState]=useState({message:'',name:''})
  const [chat,setChat]=useState([]) 
  
  

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const handleUserInput=e=>{          
    setState({...state,[e.target.name]:e.target.value})    
  }

  const handleSend=e=>{
    e.preventDefault()    
    const {name,message}=state    
    socket.emit('message', {name,message})
    setState({message:'',name})           
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }
    
  

 

  
  return (
    <div className="App">
      <form  onSubmit={handleSend}>
        Name<input onChange={e=>handleUserInput(e)} name='name' value={state.name} type='text'/>
        Message<input onChange={e=>handleUserInput(e)} name='message' value={state.message} type='text'/>
        <input value="Submit" type='submit'/>
        
      </form>      
    <div>
      {renderChat()}
    </div>
    </div>
  );
}

export default App;
