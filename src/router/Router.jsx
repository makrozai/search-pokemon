import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Search, Items, Item } from '../pages'

export const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="items" element={<Items />} />
      <Route path="items/:name" element={<Item />} />
    </Routes>
  )
}
