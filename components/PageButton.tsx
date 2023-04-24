'use client'

import { useNewsStore } from "@lib/stores/newsStore"

export default function PageButton() {

  const { incrementPage, page, fetchArticles } = useNewsStore()

  const clickHandler = () => {
    incrementPage()
    fetchArticles(page)
  }


  return (
    <div className="flex flex-row justify-center">
      <button onClick={() => clickHandler()}>Load More </button>
    </div>
  )
}
