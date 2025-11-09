import { UpdatesRepository } from '@updates/repositories/updates.repo'

type BaseParams = {
  orgId?: string
  orgSlug: string
  actorId: string
  actorName: string
}

export async function recordOrganizationCreated(params: BaseParams) {
  const repo = new UpdatesRepository()
  await repo.create({
    orgId: params.orgId,
    orgSlug: params.orgSlug,
    projectSlug: null,
    type: 'organization_created',
    message: `A organização ${params.orgSlug} foi criada por ${params.actorName}.`,
    actorId: params.actorId,
    actorName: params.actorName,
  })
  return true
}

export async function recordMemberAdded(
  params: BaseParams & { memberEmail: string }
) {
  const repo = new UpdatesRepository()
  await repo.create({
    orgId: params.orgId,
    orgSlug: params.orgSlug,
    projectSlug: null,
    type: 'member_added',
    message: `${params.memberEmail} entrou na organização.`,
    actorId: params.actorId,
    actorName: params.actorName,
  })
  return true
}

export async function recordMemberRemoved(
  params: BaseParams & { memberEmail: string }
) {
  const repo = new UpdatesRepository()
  await repo.create({
    orgId: params.orgId,
    orgSlug: params.orgSlug,
    projectSlug: null,
    type: 'member_removed',
    message: `${params.memberEmail} saiu da organização.`,
    actorId: params.actorId,
    actorName: params.actorName,
  })
  return true
}

export async function recordProjectCreated(
  params: BaseParams & { projectSlug: string; projectName: string }
) {
  const repo = new UpdatesRepository()
  await repo.create({
    orgId: params.orgId,
    orgSlug: params.orgSlug,
    projectSlug: params.projectSlug,
    type: 'project_created',
    message: `O projeto ${params.projectName} foi criado.`,
    actorId: params.actorId,
    actorName: params.actorName,
  })
  return true
}

export async function recordProjectDeleted(
  params: BaseParams & { projectSlug: string; projectName: string }
) {
  const repo = new UpdatesRepository()
  await repo.create({
    orgId: params.orgId,
    orgSlug: params.orgSlug,
    projectSlug: params.projectSlug,
    type: 'project_deleted',
    message: `O projeto ${params.projectName} foi excluído.`,
    actorId: params.actorId,
    actorName: params.actorName,
  })
  return true
}
