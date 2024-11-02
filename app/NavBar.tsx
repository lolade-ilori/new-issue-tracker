'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBugFill } from "react-icons/bs"
import { useSession } from "next-auth/react"
import { Box } from '@radix-ui/themes'

const NavBar = () => {
    const currentPath = usePathname()
    const {status, data: session} = useSession()

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues/list"}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-4 px-4 h-14 items-center'>
        <Link href={"/"}><BsBugFill /></Link>

        <ul className='flex space-x-6'>
            {
                links.map((link, id) => 
                    <li key={id} className={classNames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>)
            }
        </ul>

        <Box>
            {
                status === "authenticated" && <Link href="/api/auth/signout">Login</Link>
            }

            {
                status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>
            }
        </Box>
    </nav>
  )
}

export default NavBar