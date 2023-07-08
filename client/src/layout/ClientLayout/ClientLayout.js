import React from 'react'
import Header from '../../components/Header/Header'

export default function ClientLayout({Component}) {
  return (
    <div>
        <Header/>
        <Component/>
    </div>
  )
}
