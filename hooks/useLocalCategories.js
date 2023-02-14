import { useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { getCategories } from 'firebaseApi/firestoreDB/categories'
import { useCommerce } from 'components/CommerceContext'

export default function useLocalCategories () {
  const { canIUseLocalStorage } = useLocalStorage()

  const saveCategories = categories => {
    if (canIUseLocalStorage()) {
      const storage = window.localStorage
      storage.setItem('categories', JSON.stringify(categories))
    }
    return categories
  }

  const useSaveLocalCategory = (categories) => {
    useEffect(() => {
      saveCategories(categories)
    }, [])
  }

  /**
     * verify if there are categories in localStorage
     * if there are set those categories in context
     * if there are not in locastorage and there are not in context,
     * it request to get categories and set in localstorage and contex
     */
  const useGetLocalCategories = () => {
    const [ctgoriesLocal, setCtgoriesLocal] = useState(null)
    const { setCategories, categories } = useCommerce()

    useEffect(() => {
      if (canIUseLocalStorage()) {
        const storage = window.localStorage
        const localCategories = storage.getItem('categories')
        if (localCategories) {
          setCtgoriesLocal(JSON.parse(localCategories))
        } else {
          setCtgoriesLocal([])
        }
      }
    }, [])

    useEffect(() => {
      if (ctgoriesLocal && categories.length === 0) {
        if (ctgoriesLocal.length === 0) {
          getCategories()
            .then(saveCategories)
            .then(setCategories)
        }
        if (ctgoriesLocal.length > 0) {
          setCategories(ctgoriesLocal)
        }
      }
    }, [ctgoriesLocal, categories])
  }

  return {
    useSaveLocalCategory,
    useGetLocalCategories
  }
}
