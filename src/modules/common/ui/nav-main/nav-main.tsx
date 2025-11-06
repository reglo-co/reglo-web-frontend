'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/modules/common/ui/primitives/collapsible'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/modules/common/ui/primitives/sidebar'

type NavMainProps = {
  title: string
  urlPrefix?: string
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}

function NavText({ children }: PropsWithChildren) {
  return <span className="pt-0.5 font-medium tracking-wider">{children}</span>
}

export function NavMain({ items, title, urlPrefix }: NavMainProps) {
  const getUrl = (url: string) => {
    const sanitize = (s: string) => s.replace(/^\/+|\/+$/g, '')
    const target = sanitize(url)

    if (urlPrefix) {
      const prefix = sanitize(urlPrefix)
      if (!target) return `/${prefix}`

      const targetNoPrefix =
        target === prefix
          ? ''
          : target.startsWith(`${prefix}/`)
            ? target.slice(prefix.length + 1)
            : target

      return `/${prefix}${targetNoPrefix ? `/${targetNoPrefix}` : ''}`
    }

    return target ? `/${target}` : '/'
  }

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items ? (
              <Collapsible
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="text-support" />}
                    <NavText>{item.title}</NavText>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={getUrl(subItem.url)}>
                            <NavText>{subItem.title}</NavText>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={getUrl(item.url)}>
                  {item.icon && <item.icon className="text-support" />}
                  <NavText>{item.title}</NavText>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
