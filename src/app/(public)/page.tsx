'use client'

import { Footer, HeaderHero, Hero } from '@common/components'
import { useEffect } from 'react'

export async function testFirestore() {
  try {
    // 👤 Cria ou atualiza dados do usuário autenticado
    const saveResponse = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello Firestore!' }),
    })

    if (!saveResponse.ok) {
      throw new Error('Erro ao salvar dados no Firestore')
    }

    console.log('✅ Dados salvos com sucesso')

    // 📖 Busca os dados do usuário autenticado
    const getResponse = await fetch('/api/user-data')
    if (!getResponse.ok) {
      throw new Error('Erro ao buscar dados do Firestore')
    }

    const userData = await getResponse.json()
    console.log('📄 Dados do Firestore:', userData)

    return userData
  } catch (error) {
    console.error('🔥 Erro no testFirestore:', error)
    throw error
  }
}

export default function Home() {
  useEffect(() => {
    testFirestore()
  }, [])

  return (
    <div id="start" className="rg-max-container flex w-full flex-col">
      <HeaderHero />
      <Hero
        heading="Centralize suas regras de negócio"
        description="Centralize regras, decisões e condições do seu negócio de forma estruturada. Mantenha tudo documentado, atualizado e acessível apenas para quem precisa."
        badge="Potencialize o seu projeto"
        buttons={{
          secondary: {
            text: 'Entrar na lista de espera',
            url: '/waitlist',
          },
        }}
        image={{
          src: '/images/office.jpg',
          alt: 'Office',
        }}
      />

      <section
        id="what-we-are"
        className="rg-container-medium mx-auto -mt-20 flex flex-col items-center justify-center gap-16 pt-30"
      >
        <h2 className="text-6xl font-bold">O que é a Reglo?</h2>

        <span className="text-rg-label-support text-center text-lg">
          A Reglo foi desenvolvida para dar forma e clareza às regras de negócio
          em projetos de software. Crie projetos, envolva sua equipe e mantenha
          tudo documentado em um espaço colaborativo que une simplicidade e
          eficiência.
        </span>
      </section>

      <Footer />
    </div>
  )
}
