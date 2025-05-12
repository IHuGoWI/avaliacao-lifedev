import { useRef, useEffect, useReducer } from "react"
import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"

const initialState = {
    loading: false,
    error: null,
}

const updateReducer = (state, action) => {

    switch (action.type) {

      case "LOADING":
        return { loading: true, error: null }

      case "UPDATED_DOC":
        return { loading: false, error: null }

      case "ERROR":
        return { loading: false, error: action.payload }

      default:
        return state
    }
}

export const useUpdateDocument = (docCollection) => {

    const [response, dispatch] = useReducer(updateReducer, initialState)
    const cancelled = useRef(false)

    const safeDispatch = (action) => {

        if (!cancelled.current) {

          dispatch(action)

        }
    }

    const updateDocument = async (uid, data) => {

        safeDispatch({ type: "LOADING" })
    
        try {

          const docRef = doc(db, docCollection, uid)
          await updateDoc(docRef, data)
    
          safeDispatch({ type: "UPDATED_DOC" })

        } catch (error) {

          safeDispatch({ type: "ERROR", payload: error.message })

        }
      }

      useEffect(() => {

        return () => {
          cancelled.current = true
        }

      }, [])

    return { updateDocument, response }
}