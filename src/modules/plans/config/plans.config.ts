import { Plan } from '@plans/types'

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'starter',
    show: true,
    description: 'Ideal para explorar a Reglo e testar as funcionalidades.',
    features: {
      maxCollaborators: 1,
      maxProjects: 2,
      maxRules: 40,
      maxTeams: 1,
      maxFileUploadSize: 10, // 10MB
    },
    monthlyPrice: 0,
    yearlyPrice: 0,
  },
]
