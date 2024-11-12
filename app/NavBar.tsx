'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBugFill } from "react-icons/bs"
import { useSession } from "next-auth/react"
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NavBar = () => {

  return (
    <nav className='border-b mb-4 px-4 py-3'>
        <Container>
            <Flex justify="between">
                <Flex align="center" gap="5">
                    <Link href={"/"}><BsBugFill /></Link>
                    <Navlink />
                </Flex>
                <AuthStatus />
            </Flex>

        </Container>
    </nav>
  )
}

const Navlink = () => {
    const currentPath = usePathname()


    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues/list"}
    ]

    return (
        <ul className='flex space-x-6'>
        {
            links.map((link, id) => 
                <li key={id} className={classNames({
                    'nav-link': true,
                    '!text-zinc-900': link.href === currentPath,
                })}>
                    <Link href={link.href}>{link.label}</Link>
                </li>)
        }
    </ul>
    )
}

const AuthStatus = () => {
    const {status, data: session} = useSession()

    if(status === "loading") return <Skeleton width="3rem" />

    if(status === "unauthenticated") return <Link className='class-link' href="/api/auth/signin">Login</Link>

    return (
        <Box>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar 
                            src={session!.user!.image!}
                            fallback="?"
                            className='cursor-pointer'
                            size="2"
                            radius='full'
                            referrerPolicy='no-referrer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>{session!.user?.email}</DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>
                            <Link href="/api/auth/signout">Logout</Link>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
        </Box>
    )
}

export default NavBar