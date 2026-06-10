import React from 'react'
import { Outlet } from 'react-router-dom'
import ProducerLayout from '../../components/layouts/producer/ProducerLayout';

const Producer = () => {
  return (
    <main>
      <ProducerLayout>
        <Outlet />
      </ProducerLayout>
    </main>
  )
}

export default Producer