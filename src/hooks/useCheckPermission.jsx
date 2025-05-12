import { useEffect, useState } from "react"
import { useAuthValue } from "../context/AuthContext"
import { db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"


export const useCheckPermission = (docCollection, docId) => {

    const { user } = useAuthValue()
    const [hasPermission, setHasPermission] = useState(false)
    const [loading, setLoading] = useState(true)

     useEffect(() => {

        const checkPermission = async () => {
            try {
                const docRef = doc(db, docCollection, docId)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {

                    const data = docSnap.data()

                    if (data.uid === user.uid) {

                        setHasPermission(true)

                    } else {

                        setHasPermission(false)
                    }
                } else {

                    console.error("Documento não encontrado.")

                    setHasPermission(false)
                }
            } catch (error) {

                console.error("Erro ao verificar permissões:", error)

                setHasPermission(false)

            } finally {

                setLoading(false)
            }
        }

        if (user) {

            checkPermission()

        } else {

            setHasPermission(false)
            setLoading(false)
        }
    }, [docCollection, docId, user])

    return { hasPermission, loading }
}

export default useCheckPermission