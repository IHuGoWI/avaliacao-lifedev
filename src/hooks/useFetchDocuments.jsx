import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where
} from "firebase/firestore"

export const useFetchDocuments = (docCollection, search = null, uid = null, text = "") => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        let cancelled = false

        const collectionRef = collection(db, docCollection)

        let queryRef

        
        if (search && Array.isArray(search) && search.length > 0) {

          queryRef = query(
            collectionRef,
            where("tags", "array-contains-any", search),
            orderBy("createdAt", "desc")
            )

        } else if (uid) {

          queryRef = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
            )

        } else {

          queryRef = query(collectionRef, orderBy("createdAt", "desc"))
            
        }

        const unsubscribe = onSnapshot(
            queryRef,
            (snapshot) => {
              if (!cancelled) {
                var results = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data()
                }))

              if (text) {
                results = results.filter((doc) => {
                  const title = removeAccents(doc.title || "")
                  const content = removeAccents(doc.content || "")
                  const queryText = removeAccents(text)

                  return title.includes(queryText) || content.includes(queryText)
                })
              }

                setDocuments(results)
                setLoading(false)
              }
            },
            (err) => {
              console.error("Erro ao buscar documentos:", err)
              if (!cancelled) {
                setError("Houve um erro ao carregar os dados.")
                setLoading(false)
              }
            }
          )

          return () => {
            cancelled = true
            unsubscribe()
          }

    }, [docCollection, search, uid, text])

    return { documents, loading, error }
}

const removeAccents = (str) =>
  str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()