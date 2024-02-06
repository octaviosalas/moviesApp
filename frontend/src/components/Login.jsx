import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../store/userContext'
import NavBarComponent from './Navbar'
import {Input, Button} from "@nextui-org/react";

const Login = () => { 

    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [succesMessagge, setSuccesMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [textMessage, setTextMessage] = useState(false)

  

  const loginMySession = () => { 
      if(email.length === 0 || password.length === 0) { 
        setErrorMessage(true)
        setTextMessage("Debes completar todos los campos")
        setTimeout(() => { 
          setErrorMessage(false)
          setEmail("")
          setPassword("")
        }, 2500)
      } else  { 
        const userData = ({ 
          email,
          password
        })
        axios.post("http://localhost:4000/users/login", userData)
             .then((res) => { 
              console.log(res.data)
              if(res.data.message === "El email no se encuentra registrado") { 
                setErrorMessage(true)
                setTextMessage("El email ingresado no es correcto")
                setTimeout(() => { 
                  setErrorMessage(false)
                  setEmail("")
                  setPassword("")
                }, 2500)
              } else if (res.data.message === "La contraseña es incorrecta") { 
                setErrorMessage(true)
                setTextMessage("La contraseña es incorrecta")
                setTimeout(() => { 
                  setErrorMessage(false)
                  setEmail("")
                  setPassword("")
                }, 2500)
              } else { 
                setSuccesMessage(true)       
                userCtx.updateUser(res.data.id) 
                userCtx.updateUserEmail(res.data.email)
                userCtx.updateUserProfileImage(res.data.photo)
                userCtx.updateUserName(res.data.name)      
                setTimeout(() => {
                    navigate("/main")
                }, 2000);
              }            
             })
             .catch((err) => { 
              console.log(err)
             })
      }
    } 


    useEffect(() => { 
       console.log(userCtx.userEmail)
       console.log(userCtx.userId)
       console.log(userCtx.userName)
       console.log(userCtx.userProfileImage)
    }, [userCtx.userEmail, userCtx.userId, userCtx.userName, userCtx.userProfileImage])
     
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <NavBarComponent/>              
        <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">  
                <div className=" flex text-center h-16 w-16 justify-center rounded-full" style={{backgroundColor:"#D3D3D3"}}>
                  <img src="https://cdn-icons-png.flaticon.com/512/2991/2991494.png" className="h-12 w-12 m-2"/>
                </div>
                <div>
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight " style={{color:"#7D38D1"}}>INICIAR SESION</h2>
                </div>
        </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">    
         <div>
              
                <div className="mt-2">
                    
                   <Input  label="Email" variant="bordered" 
                    name="email" type="email"
                    autoComplete="email" 
                    value={email}
                    required 
                    className="block w-full text-center rounded-md border-0  sm:text-sm sm:leading-6" 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>

            <div>
                
            <div className="mt-2">
                <Input 
                id="password" 
                name="password" 
                label="Contraseña"
                type="password" 
                autoComplete="current-password" 
                value={password}
                variant="bordered" 
                required 
                className="block w-full text-center rounded-md border-0  sm:text-sm sm:leading-6" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>


                <div className="text-sm flex justify-end">
                <a href="#" className="text-black text-xs hover:text-gray-400 underline mt-2"> ¿Olvido su contraseña? </a>
                </div>
        </div>

        {succesMessagge ? 
       
          <div className='mt-8'>
            <p className='text-sm font-bold' style={{color:"#728EC3"}}>Iniciando sesion</p>
          </div>    
          :
          <>
            <div className='mt-6'>
                   
                    <Button color="secondary" onClick={() => loginMySession()} className='w-72 font-medium'>
                      INICIAR SESION
                    </Button> 
            </div>

        <div className='mt-6'>
        <Link to={"/register"}> 
             <Button style={{backgroundColor:"#C4ACD5"}}  className="w-72 text-white font-medium">
                 REGISTRARME
              </Button> 
          </Link> 
        </div>
        </>
      }

      {errorMessage ? <p className='mt-8 font-bold text-xs' style={{color:"#728EC3"}} >{textMessage}</p> : null}

      

    </div>
  </div>
  )
}

export default Login