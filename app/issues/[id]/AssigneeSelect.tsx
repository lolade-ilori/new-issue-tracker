'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({issue}: {issue: Issue}) => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60seconds,
    retry: 3
  })

  if (isLoading) return <Skeleton />

  if (error) return null

  const assignIssue = (userId:string) => {
    axios
      .patch('/api/issues/' + issue.id, {assignedUserId: userId || null})
      .catch(() => {
        toast.error("Changes could not be saved")
      })
  }

  return (
    <>
      <Select.Root defaultValue={issue.assignedUserId || ""} onValueChange={assignIssue}>
        {/* @ts-ignore */}
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {
              users?.map((user) => (<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>))
            }
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssigneeSelect