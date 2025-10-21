import { KanbanData } from '../types/kanban.types'

export const kanbanData: KanbanData = {
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      items: [
        {
          id: '1',
          title: 'Implementar autenticação OAuth',
          shortDescription: 'Integrar sistema de login com Google e GitHub',
          detailedDescription:
            'Implementar autenticação OAuth 2.0 para permitir que usuários façam login usando suas contas do Google e GitHub. Isso inclui configurar as credenciais da aplicação, implementar os fluxos de autorização e gerenciar tokens de acesso.',
          reporters: ['João Silva', 'Maria Santos'],
          progressPercentage: 0,
        },
        {
          id: '2',
          title: 'Criar dashboard de métricas',
          shortDescription: 'Desenvolver painel com KPIs principais',
          detailedDescription:
            'Desenvolver um dashboard interativo que exiba as principais métricas do sistema, incluindo gráficos de performance, estatísticas de uso e indicadores de qualidade. O dashboard deve ser responsivo e permitir filtros por período.',
          reporters: ['Pedro Costa'],
          progressPercentage: 0,
        },
        {
          id: '3',
          title: 'Otimizar performance do banco',
          shortDescription: 'Melhorar consultas e adicionar índices',
          detailedDescription:
            'Analisar e otimizar as consultas mais lentas do banco de dados, adicionar índices apropriados e implementar cache para consultas frequentes. O objetivo é reduzir o tempo de resposta em pelo menos 50%.',
          reporters: ['Ana Oliveira', 'Carlos Ferreira'],
          progressPercentage: 0,
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'Em Progresso',
      items: [
        {
          id: '4',
          title: 'Refatorar componentes React',
          shortDescription: 'Migrar para TypeScript e melhorar estrutura',
          detailedDescription:
            'Refatorar todos os componentes React existentes para TypeScript, melhorar a estrutura de pastas, implementar padrões de design consistentes e adicionar testes unitários para garantir qualidade do código.',
          reporters: ['Lucas Mendes', 'Fernanda Lima'],
          progressPercentage: 65,
        },
        {
          id: '5',
          title: 'Implementar notificações push',
          shortDescription: 'Sistema de alertas em tempo real',
          detailedDescription:
            'Desenvolver sistema de notificações push que permita aos usuários receber alertas em tempo real sobre eventos importantes, com configurações personalizáveis de frequência e tipos de notificação.',
          reporters: ['Roberto Alves'],
          progressPercentage: 30,
        },
      ],
    },
    {
      id: 'blocked',
      title: 'Em Impedimento',
      items: [
        {
          id: '6',
          title: 'Integração com API externa',
          shortDescription: 'Aguardando documentação da API',
          detailedDescription:
            'A integração com a API externa está bloqueada devido à falta de documentação técnica completa. Estamos aguardando a equipe externa fornecer os endpoints, autenticação e exemplos de uso para prosseguir com o desenvolvimento.',
          reporters: ['Patricia Souza', 'Diego Rodrigues'],
          progressPercentage: 10,
          blockedDescription:
            'Aguardando documentação técnica da API externa. A equipe responsável pela API prometeu entregar a documentação até o final da semana, mas ainda não temos uma data confirmada.',
        },
      ],
    },
    {
      id: 'recently-completed',
      title: 'Finalizado Recentemente',
      items: [
        {
          id: '7',
          title: 'Configurar CI/CD pipeline',
          shortDescription: 'Automação de deploy e testes',
          detailedDescription:
            'Implementar pipeline de integração e deploy contínuo usando GitHub Actions, incluindo testes automatizados, análise de código, build e deploy automático para ambientes de desenvolvimento e produção.',
          reporters: ['Gabriel Martins', 'Juliana Rocha'],
          progressPercentage: 100,
        },
        {
          id: '8',
          title: 'Implementar sistema de logs',
          shortDescription: 'Centralizar e estruturar logs da aplicação',
          detailedDescription:
            'Desenvolver sistema centralizado de logs que capture eventos importantes da aplicação, com diferentes níveis de severidade, rotação automática de arquivos e integração com ferramentas de monitoramento.',
          reporters: ['Marcos Silva'],
          progressPercentage: 100,
        },
        {
          id: '9',
          title: 'Criar documentação da API',
          shortDescription: 'Documentar endpoints e exemplos de uso',
          detailedDescription:
            'Criar documentação completa da API REST, incluindo descrição de todos os endpoints, parâmetros, respostas, códigos de erro e exemplos práticos de uso para facilitar a integração por desenvolvedores externos.',
          reporters: ['Camila Santos', 'Rafael Oliveira'],
          progressPercentage: 100,
        },
      ],
    },
  ],
}
