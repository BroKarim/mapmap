import Link from 'next/link'
import React, { useState } from 'react'

import { Button } from './button'

// import { MenuItem } from './Header'
export interface MenuItem {
  title: string
  route?: string
  children?: MenuItem[]
}

interface Props {
  item: MenuItem
}

export default function Dropdown(props: Props) {
  const { item } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menuItems = item?.children ? item.children : []

  const toggle = () => {
    setIsOpen(old => !old)
  }

  const transClass = isOpen ? 'flex' : 'hidden'

  return (
    <>
      <div className="relative">
        <Button className="hover:text-blue-400" onClick={toggle}>
          {item.title}
        </Button>
        <div
          className={`bg-zinc-400 absolute top-16 z-30 flex min-h-[100px] w-[250px] flex-col rounded-md bg-[#fff] py-4 ${transClass}`}
        >
          {menuItems.map(item => (
            <Link
              key={item.route}
              className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
              href={item?.route || ''}
              onClick={toggle}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {isOpen ? (
        <div className="bg-black/40 fixed top-0 right-0 bottom-0 left-0 z-20" onClick={toggle}></div>
      ) : (
        <></>
      )}
    </>
  )
}
