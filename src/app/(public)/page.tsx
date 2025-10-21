'use client'

import { Footer, HeaderHero, Hero } from '@common/components'

export default function Home() {
  return (
    <div id="start" className="rg-max-container flex w-full flex-col">
      <HeaderHero />
      <Hero
        heading="Centralize suas regras de negócio"
        description="Centralize regras, decisões e condições do seu negócio de forma estruturada. Mantenha tudo documentado, atualizado e acessível apenas para quem precisa."
        badge="Potencialize o seu time"
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
