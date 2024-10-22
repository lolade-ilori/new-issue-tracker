'use client'

import { Issue } from '@prisma/client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueBtn = ({issueId}: {issueId: number}) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color='red'>Confirm Deletion</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content >
		<AlertDialog.Title>Delete Issue</AlertDialog.Title>
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
				<Button variant="solid" color="red">
					Delete Issue
				</Button>
			</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueBtn