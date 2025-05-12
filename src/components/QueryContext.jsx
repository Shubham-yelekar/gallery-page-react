import React , {useContext, createContext, useState} from 'react'

const QueryContext = createContext()

export const QueryProvider = ({children}) =>{
  const [query, setQuery] = useState({
    search:"",
    color: ""
  })

  const updateQuery = (key, value) => {
    setQuery((prev)=>({
      ...prev, [key]: value,
    }));
  };

  return (
    <QueryContext.Provider value={{query, updateQuery}}>{children}</QueryContext.Provider>
  )
}

// Custom hook to use the QueryContext
export const useQuery = () => useContext(QueryContext);


