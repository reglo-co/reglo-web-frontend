import { Button } from '@/components/ui/button'
import { withGlobalLoading } from '@/modules/common/components/global-loading'
import { Plus, User } from 'lucide-react'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'John Doe',
    title: 'Founder & CEO',
    imageUrl:
      'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Jane Doe',
    title: 'Engineering Manager',
    imageUrl:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Bob Smith',
    title: 'Product Manager',
    imageUrl:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Peter Johnson',
    title: 'Frontend Developer',
    imageUrl:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'David Lee',
    title: 'Backend Developer',
    imageUrl:
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Sarah Williams',
    title: 'Product Designer',
    imageUrl:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Michael Brown',
    title: 'UX Researcher',
    imageUrl:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Equipe
        </h2>
      </div>

      <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary flex h-20 w-20 items-center justify-center rounded-full">
            <User strokeWidth={1.25} className="h-10 w-10" />
          </div>
          <Button className="mt-7" variant="outline">
            <Plus className="size-4" />
            Adicionar membro
          </Button>
        </div>

        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <Image
              src={member.imageUrl}
              alt={member.name}
              className="bg-secondary mx-auto h-20 w-20 rounded-full object-cover"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withGlobalLoading(Page)
