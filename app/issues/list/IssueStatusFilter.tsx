'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
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
    const searchParams = useSearchParams()

  return (
    <>
        <Select.Root 
            defaultValue={searchParams.get("status") || ""}
            onValueChange={(status) => {
                const params = new URLSearchParams()

                if(status) params.append('status', status)
                if(searchParams.get("orderBy"))
                    params.append("orderBy", searchParams.get("orderBy")!)

                const query = params.size ? `?${params.toString()}` : '' 
                router.push('/issues/list' + query)
            }}
        >
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