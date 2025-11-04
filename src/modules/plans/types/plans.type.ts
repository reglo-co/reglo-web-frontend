export type PlanNames = 'starter'

export interface Plan {
  id: PlanNames
  name: PlanNames
  show: boolean
  description: string
  features: {
    maxCollaborators: number
    maxProjects: number
    maxRules: number
    maxTeams: number
    maxFileUploadSize: number // in MB
  }
  monthlyPrice: number
  yearlyPrice: number
}
