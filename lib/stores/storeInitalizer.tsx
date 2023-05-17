'use client'

import { NewsArticle } from '@lib/NewsApi'
import { useRef } from 'react'
import { useNewsStore } from './newsStore'

function StoreInitalizer({ articles }: { articles: Array<NewsArticle> }) {
  const initalized = useRef(false)

  if (!initalized.current) {
    useNewsStore.setState({ articles })
    initalized.current = true
  }

  return null
}

export default StoreInitalizer
