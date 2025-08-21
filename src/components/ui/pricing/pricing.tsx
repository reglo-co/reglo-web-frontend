'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: 'Exploração',
      description: 'Perfeito para começar e experimentar a plataforma',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        '1 projeto',
        '1GB de armazenamento',
        'Análises básicas',
        'Suporte por e-mail',
        'Recursos essenciais',
        'Domínio padrão',
      ],
      popular: false,
    },
    {
      name: 'Evolução',
      description: 'Ideal para empresas e equipes em crescimento',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        'Projetos ilimitados',
        '100GB de armazenamento',
        'Análises avançadas',
        'Suporte prioritário',
        'Certificados SSL',
        'Domínio personalizado',
        'Colaboração em equipe',
        'Acesso à API',
        'Integrações avançadas',
      ],
      popular: true,
    },
    {
      name: 'Empresarial',
      description: 'Para grandes organizações com necessidades personalizadas',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        'Tudo ilimitado',
        '1TB de armazenamento',
        'Análises personalizadas',
        'Suporte telefônico 24/7',
        'Certificados SSL',
        'Domínio personalizado',
        'Recursos avançados de equipe',
        'Acesso completo à API',
        'Integrações personalizadas',
        'Gerente de conta dedicado',
        'Garantia de SLA',
        'Contratos personalizados',
      ],
      popular: false,
    },
  ]

  return (
    <div className="px-4 py-12" id="planos">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Escolha seu Plano Perfeito
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Escale seu negócio com nossas opções flexíveis de preços. Comece
            gratuitamente e faça upgrade conforme seu crescimento.
          </p>

          {/* Billing Toggle */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <span
              className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
            >
              Anual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Economize 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'border-primary scale-105 shadow-lg' : 'border-border'}`}
            >
              {plan.popular && (
                <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  Mais Popular
                </Badge>
              )}

              <CardHeader className="pb-6 text-center">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  {plan.monthlyPrice === 0 ? (
                    <span className="text-foreground text-4xl font-bold">
                      Grátis
                    </span>
                  ) : (
                    <>
                      <span className="text-foreground text-4xl font-bold">
                        R${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">
                        /{isAnnual ? 'ano' : 'mês'}
                      </span>
                      {isAnnual && (
                        <div className="text-muted-foreground mt-1 text-sm">
                          ${Math.round(plan.annualPrice / 12)}/mês cobrado
                          anualmente
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="text-primary h-4 w-4 flex-shrink-0" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Empresarial'
                    ? 'Fale com Vendas'
                    : plan.name === 'Gratuito'
                      ? 'Começar Grátis'
                      : 'Começar Agora'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem teste grátis de 14 dias. Não é necessário
            cartão de crédito.
          </p>
          <div className="text-muted-foreground flex justify-center gap-6 text-sm">
            <span>✓ Cancele quando quiser</span>
            <span>✓ 99.9% de disponibilidade SLA</span>
            <span>✓ Suporte 24/7</span>
          </div>
        </div>
      </div>
    </div>
  )
}
