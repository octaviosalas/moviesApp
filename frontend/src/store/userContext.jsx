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
    userQuantityNotifications: null,
    updateUserQuantityNotifications: () => {},
    userNotifications: [],
    updateUserNotifications: () => {}          
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

    
  const [userQuantityNotifications, setUserQuantityNotifications] = useState(() => { 
    const storedUserQuantityNotifications = sessionStorage.getItem("userQuantityNotifications")
    return storedUserQuantityNotifications !== null ? storedUserQuantityNotifications : null
  })

  const [userNotifications, setUserNotifications] = useState(() => { 
    const storedUserNotifications =  sessionStorage.getItem("userNotifications")
    return storedUserNotifications !== null ? storedUserNotifications : null
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

  const updateUserQuantityNotifications = (x) => { 
    setUserQuantityNotifications(x)
    sessionStorage.setItem("userQuantityNotifications", x)
  }

  const updateUserNotifications = (x) => { 
    setUserNotifications(x)
    sessionStorage.setItem("userNotifications", x)
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
      } else if (event.key === "userQuantityNotifications") { 
        setUserQuantityNotifications(event.newValue)
      } else if (event.key === "userNotifications") { 
        setUserNotifications(event.newValue)
      }
    };
    window.addEventListener('storage', handleStorageChange); 
    return () => {
      window.removeEventListener('storage', handleStorageChange); 
    };
  }, []);

  return (
    <UserContext.Provider 
        value={{
          userId, updateUser, userProfileImage,
          updateUserProfileImage, userName, 
          updateUserName, userEmail, updateUserEmail, 
          userQuantityNotifications, updateUserQuantityNotifications, 
          userNotifications, updateUserNotifications
        }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

          