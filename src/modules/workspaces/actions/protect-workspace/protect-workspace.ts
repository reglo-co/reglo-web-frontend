'use server'

import type { WorkspaceParams } from '@/typings'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

async function workspaceExistsValidation(workspace: string) {
  const result = await api(`/api/workspaces/${workspace}/exists`)

  if (!result.exists) {
    notFound()
  }
}

async function workspaceHasAccessValidation(workspace: string) {
  const result = await api(`/api/workspaces/${workspace}/has-access`)

  if (!result.hasAccess) {
    notFound()
  }
}

export async function protectWorkspace(params: WorkspaceParams['params']) {
  const { workspace } = await params

  await workspaceExistsValidation(workspace.toLowerCase())
  await workspaceHasAccessValidation(workspace.toLowerCase())

  return true
}
