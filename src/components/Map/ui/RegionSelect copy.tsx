//debug dulu, kok bis ak etrigger reload
'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import { Button } from '#components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/ui/select'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function RegionSelect() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenDropdown = (e: React.MouseEvent) => {
    console.log('Dropdown triggered', e)
    // Tambahkan preventDefault untuk memastikan
    e.preventDefault()
    e.stopPropagation()
  }
  const handleOpenChange = (open: boolean) => {
    console.log('Dropdown state:', open)
    setIsOpen(open)
  }
  return (
    <>
      <div style={{ zIndex: 400 }} className="absolute top-10 left-72 w-full ">
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'outline'}
              className="text-black bg-[#fff]"
              onClick={e => {
                console.log('Button clicked', e)
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Open
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
