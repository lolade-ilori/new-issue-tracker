import Link from 'next/link'
import React from 'react'
import { BsBugFill } from "react-icons/bs"

const NavBar = () => {
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-4 px-4 h-14 items-center'>
        <Link href={"/"}><BsBugFill /></Link>

        <ul className='flex space-x-6'>
            {
                links.map((link, id) => 
                    <li key={id} className='text-gray-500 hover:text-slate-900 transition-colors'>
                        <Link href={link.href}>{link.label}</Link>
                    </li>)
            }
        </ul>
    </nav>
  )
}

export default NavBar