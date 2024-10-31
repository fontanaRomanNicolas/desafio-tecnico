import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {

  const initialUser = JSON.parse(localStorage.getItem('user')) || null;
  const [user, setUser] = useState(initialUser);

  useEffect(() => {

    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  return useContext(UserContext);
};
