import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({ 
    userId: null,             
    updateUser: () => {},
    userProfileImage: null,
    updateUserProfileImage: () => {},
    userName: null,
    updateUserName: () => {},
    userEmail: null,
    updateUserEmail: () => {},    
});


const UserProvider = ({ children }) => {                   

const [userId, setUserId] = useState(() => {          
     const storedUserId = sessionStorage.getItem('userId');
     return storedUserId !== null ? storedUserId : null;    
 });

 const [userProfileImage, setUserProfileImage] = useState(() => { 
      const storedUserProfileImage = sessionStorage.getItem('userProfileImage');
     return storedUserProfileImage !== null ? storedUserProfileImage : null;    

 })

 const [userName, setUserName] = useState(() => { 
  const storedUserName= sessionStorage.getItem("userName")
  return storedUserName!== null ? storedUserName: null;
 })


 const [userEmail, setUserEmail] = useState(() => { 
  const storedUserEmail = sessionStorage.getItem("userEmail")
  return storedUserEmail !== null ? storedUserEmail : null
 })

const updateUser = (id) => {                   
    setUserId(id)
    sessionStorage.setItem('userId', id);     
};

const updateUserProfileImage = (x) => { 
    setUserProfileImage(x)
    sessionStorage.setItem("userProfileImage", x)
}

const updateUserName = (name) => { 
  setUserName(name)
  sessionStorage.setItem("userName", name)
}


const updateUserEmail = (x) => { 
  setUserEmail(x)
  sessionStorage.setItem("userEmail", x)
}

useEffect(() => {
    const handleStorageChange = (event) => {    
      if (event.key === 'userId') {            
        setUserId(event.newValue);
      } else if (event.key === 'userProfileImage') {            
        setUserProfileImage(event.newValue);
      } else if (event.key === 'userName') {            
        setUserName(event.newValue);
      } else if (event.key === "userEmail") { 
        setUserEmail(event.newValue)
      } 
    };
    window.addEventListener('storage', handleStorageChange); 
    return () => {
      window.removeEventListener('storage', handleStorageChange); 
    };
  }, []);

  return (
    <UserContext.Provider value={{ userId, updateUser, userProfileImage, updateUserProfileImage, userName, updateUserName, userEmail, updateUserEmail, }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

          