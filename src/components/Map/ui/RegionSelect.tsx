//debug dulu, kok bis ak etrigger reload
// tapi sudah dipastikan bawha di map/index, page/map/index dan map/_app.tsx tdak ada pen-trigger
'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import { Button } from '#components/ui/button'
import Dropdown, { MenuItem } from '#components/ui/dropdown-medium'

type Checked = DropdownMenuCheckboxItemProps['checked']

const menuItems: MenuItem[] = [
  {
    title: 'Products',
    children: [
      {
        title: 'Hinkle Horns',
        route: '/products/hinkle-horns',
      },
      {
        title: 'Doozers',
        route: '/products/doozers',
      },
      {
        title: 'Zizzer-zazzers',
        route: '/products/zizzer-zazzers',
      },
    ],
  },
]
export function RegionSelect() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div style={{ zIndex: 400 }} className="absolute top-10 left-72 w-full ">
        {menuItems.map(item => {
          return item.hasOwnProperty('children') ? (
            <Dropdown item={item} />
          ) : (
            <Button className="hover:text-blue-500">{item.title}</Button>
          )
        })}
      </div>
    </>
  )
}
