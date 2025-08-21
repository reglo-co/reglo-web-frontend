import { Notebook, Settings, User } from 'lucide-react'

export const NAV_USER_MENU_ITEMS = [
  {
    label: 'Minha conta',
    icon: User,
    href: '/minha-conta',
  },
  {
    label: 'Projetos',
    icon: Notebook,
    href: '/minha-conta#projetos',
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/minha-conta#configuracoes',
  },
] as const
