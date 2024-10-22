'use client'

import { Issue } from '@prisma/client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueBtn = ({issueId}: {issueId: number}) => {
    const router = useRouter()
    const [error, setError] = useState(false)
  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content >
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This issue will no longer be accessible.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={async () => {
                            try {
                                await axios.delete('/api/issues/' + issueId)
                                router.push("/issues")
                                router.refresh()  
                            } catch (error) {
                                setError(true)
                            }
                        }}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>


        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Oops, Error</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    The issue could not be deleted
                </AlertDialog.Description>
                <Button color='gray' variant='soft' mt="4" onClick={() => setError(false)}>OK</Button>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueBtn