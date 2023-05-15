'use client'

import { useNewsStore } from "@lib/stores/newsStore"
import { useEffect, useState } from "react"

export default function PageButton() {
  const [hasMounted, setHasMounted] = useState(false)
  const [page, setPage] = useState(1)
  const { fetchArticles } = useNewsStore()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted) fetchArticles(page)
  }, [page])

  return (
    <div className="flex flex-row justify-center m-2">
      <button className="btn" onClick={() => setPage(page + 1)}>Load More </button>
    </div>
  )
}
