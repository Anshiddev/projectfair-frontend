import React, { useState } from 'react'
import { createContext } from 'react'

export const addProjectResponseContext=createContext()
export const editProjectResponseContext = createContext()
export const deleteProjectResponseContext = createContext()

function ContextShare({children}) {
    const [addResponse,setAddResponse] = useState("")
    const [editResponse,setEditResponse] = useState("")
    const [deleteResponse,setDeleteResponse] = useState("")
  return (
    <>
    <addProjectResponseContext.Provider value={{addResponse,setAddResponse}}>
        <editProjectResponseContext.Provider value={{editResponse,setEditResponse}}>
          <deleteProjectResponseContext.Provider value={{deleteResponse,setDeleteResponse}}>
            {children}
          </deleteProjectResponseContext.Provider>
        </editProjectResponseContext.Provider>
    </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare