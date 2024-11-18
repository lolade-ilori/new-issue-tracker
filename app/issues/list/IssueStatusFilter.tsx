'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

// This type signifies an array of objects
const status: {label: string, value?: Status}[] = [
    {label: "All"},
    {label: "Open", value: "OPEN"},
    {label: "In Progress", value: "IN_PROGRESS"},
    {label: "Closed", value: "CLOSED"}
]

const IssueStatusFilter = () => {
    const router = useRouter()

  return (
    <>
        <Select.Root onValueChange={(status) => {
            const query = status ? `?status=${status}` : '' 
            router.push('/issues/list' + query)
        }}>
            {/* @ts-ignore */}
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                <Select.Group>
                    {
                        status.map((status, id) => (
                        <Select.Item key={id} value={status.value || ""}>
                            {status.label}
                        </Select.Item>))
                    }
                </Select.Group>
            </Select.Content>

        </Select.Root>
    </>
  )
}

export default IssueStatusFilter