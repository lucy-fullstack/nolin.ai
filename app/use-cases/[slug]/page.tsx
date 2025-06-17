import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { UseCaseTemplate } from "@/components/use-case-template"

// Define the use case data structure
type UseCase = {
  slug: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  audience: string
  painPoints: {
    title: string
    titleEs: string
    description: string
    descriptionEs: string
  }[]
  benefits: {
    title: string
    titleEs: string
    description: string
    descriptionEs: string
  }[]
  testimonials: {
    quote: string
    quoteEs: string
    author: string
    role: string
    roleEs: string
    company: string
  }[]
}

// Sample use case data with Spanish translations
const useCases: UseCase[] = [
  {
    slug: "linkedin-creators",
    title: "Social Media Content Creators",
    titleEs: "Creadores de Contenido para Redes Sociales",
    description: "Transform your content ideas into engaging LinkedIn posts without the hassle",
    descriptionEs: "Transforma tus ideas en publicaciones atractivas para LinkedIn sin complicaciones",
    audience: "Content Creators",
    painPoints: [
      {
        title: "Wasting hours on content management",
        titleEs: "Perdiendo horas en gestión de contenido",
        description: "Jumping between tools steals time you could spend creating valuable content",
        descriptionEs: "Saltar entre herramientas roba tiempo que podrías dedicar a crear contenido valioso"
      },
      {
        title: "Missing your posting rhythm",
        titleEs: "Perdiendo tu ritmo de publicación",
        description: "Forgetting to post or rushing content hurts your engagement and growth",
        descriptionEs: "Olvidar publicar o apresurar contenido daña tu engagement y crecimiento"
      },
      {
        title: "Flying blind without insights",
        titleEs: "Volando a ciegas sin información",
        description: "Guessing what works instead of knowing exactly what drives engagement",
        descriptionEs: "Adivinar qué funciona en lugar de saber exactamente qué impulsa el engagement"
      },
    ],
    benefits: [
      {
        title: "Create once, publish everywhere",
        titleEs: "Crea una vez, publica en todas partes",
        description: "Draft in Notion and watch your content flow to LinkedIn automatically",
        descriptionEs: "Redacta en Notion y ve cómo tu contenido fluye a LinkedIn automáticamente"
      },
      {
        title: "Set it and grow",
        titleEs: "Configúralo y crece",
        description: "Schedule weeks of content in minutes and never miss prime posting times",
        descriptionEs: "Programa semanas de contenido en minutos y nunca pierdas los mejores momentos para publicar"
      },
      {
        title: "Discover what makes your audience click",
        titleEs: "Descubre qué hace clic en tu audiencia",
        description: "Unlock engagement patterns with visual analytics that guide your strategy",
        descriptionEs: "Descubre patrones de engagement con análisis visuales que guían tu estrategia"
      },
      {
        title: "Reach every platform your audience loves",
        titleEs: "Llega a cada plataforma que ama tu audiencia",
        description: "Tailor and send your message to LinkedIn, X, and beyond from one command center",
        descriptionEs: "Personaliza y envía tu mensaje a LinkedIn, X y más desde un solo centro de control"
      },
    ],
    testimonials: [
      {
        quote: "Nolin gave me back my Sundays! I now schedule a month of LinkedIn content in one sitting while watching Netflix.",
        quoteEs: "¡Nolin me devolvió mis domingos! Ahora programo un mes de contenido para LinkedIn de una sentada mientras veo Netflix.",
        author: "Sarah Johnson",
        role: "Content Creator",
        roleEs: "Creadora de Contenido",
        company: "Tech Insights",
      },
      {
        quote: "I doubled my engagement in 3 weeks. Turns out I was posting at the wrong times for years!",
        quoteEs: "Dupliqué mi engagement en 3 semanas. ¡Resulta que estaba publicando en los momentos equivocados durante años!",
        author: "Michael Chen",
        role: "Social Media Influencer",
        roleEs: "Influencer de Redes Sociales",
        company: "Growth Hackers",
      },
    ],
  },
  {
    slug: "ghostwriters",
    title: "Social Media Ghostwriters",
    titleEs: "Ghostwriters para Redes Sociales",
    description: "Double your client capacity without doubling your workload",
    descriptionEs: "Duplica tu capacidad de clientes sin duplicar tu carga de trabajo",
    audience: "Ghostwriters",
    painPoints: [
      {
        title: "Client feedback purgatory",
        titleEs: "Purgatorio de retroalimentación del cliente",
        description: "Endlessly chasing approvals drains your energy and delays publishing",
        descriptionEs: "Perseguir aprobaciones sin fin drena tu energía y retrasa la publicación"
      },
      {
        title: "Login-logout madness",
        titleEs: "Locura de iniciar y cerrar sesión",
        description: "Switching between client accounts eats up your billable hours",
        descriptionEs: "Cambiar entre cuentas de clientes consume tus horas facturables"
      },
      {
        title: "Content chaos across clients",
        titleEs: "Caos de contenido entre clientes",
        description: "Mixing up deadlines and content pieces creates embarrassing mistakes",
        descriptionEs: "Confundir fechas límite y piezas de contenido crea errores vergonzosos"
      },
    ],
    benefits: [
      {
        title: "Turn approvals into one-click decisions",
        titleEs: "Convierte aprobaciones en decisiones de un clic",
        description: "Clients review and approve directly in Notion, no email chains needed",
        descriptionEs: "Los clientes revisan y aprueban directamente en Notion, sin necesidad de cadenas de correos"
      },
      {
        title: "Manage 10 clients from one dashboard",
        titleEs: "Gestiona 10 clientes desde un panel",
        description: "Switch between accounts instantly with zero login headaches",
        descriptionEs: "Cambia entre cuentas al instante sin dolores de cabeza por inicios de sesión"
      },
      {
        title: "Keep every client's content in perfect order",
        titleEs: "Mantén el contenido de cada cliente en perfecto orden",
        description: "Organize by client, campaign, or date with Notion's flexible databases",
        descriptionEs: "Organiza por cliente, campaña o fecha con las bases de datos flexibles de Notion"
      },
      {
        title: "Customize for each platform with one draft",
        titleEs: "Personaliza para cada plataforma con un borrador",
        description: "Create once in Notion, then tailor and send everywhere your clients need to be",
        descriptionEs: "Crea una vez en Notion, luego adapta y envía a todos los lugares donde tus clientes necesitan estar"
      },
    ],
    testimonials: [
      {
        quote: "I doubled my client roster and cut my admin time in half. My hourly rate effectively tripled!",
        quoteEs: "Dupliqué mi lista de clientes y reduje mi tiempo administrativo a la mitad. ¡Mi tarifa por hora se triplicó efectivamente!",
        author: "Alex Rivera",
        role: "Executive Ghostwriter",
        roleEs: "Ghostwriter Ejecutivo",
        company: "Executive Voice",
      },
      {
        quote: "A client called me a 'wizard' yesterday because I turned around urgent content so quickly. My secret? Nolin.",
        quoteEs: "Un cliente me llamó 'mago' ayer porque entregué contenido urgente tan rápidamente. ¿Mi secreto? Nolin.",
        author: "Priya Sharma",
        role: "Content Strategist",
        roleEs: "Estratega de Contenido",
        company: "Write & Grow",
      },
    ],
  },
  {
    slug: "community-managers",
    title: "Community Managers",
    titleEs: "Community Managers",
    description: "Build thriving communities with content that connects, not just collects followers",
    descriptionEs: "Construye comunidades prósperas con contenido que conecta, no solo recolecta seguidores",
    audience: "Community Managers",
    painPoints: [
      {
        title: "Team content confusion",
        titleEs: "Confusión de contenido en equipo",
        description: "When everyone posts their own way, your brand voice becomes a mess",
        descriptionEs: "Cuando todos publican a su manera, la voz de tu marca se convierte en un desastre"
      },
      {
        title: "Scrambling for content daily",
        titleEs: "Batallando por contenido diariamente",
        description: "The pressure to post something—anything—leads to mediocre engagement",
        descriptionEs: "La presión de publicar algo—cualquier cosa—lleva a un engagement mediocre"
      },
      {
        title: "Guessing what your community loves",
        titleEs: "Adivinando qué ama tu comunidad",
        description: "Without clear metrics, you can't tell if you're growing or just busy",
        descriptionEs: "Sin métricas claras, no puedes saber si estás creciendo o solo ocupado"
      },
    ],
    benefits: [
      {
        title: "Unify your team's voice instantly",
        titleEs: "Unifica la voz de tu equipo al instante",
        description: "Collaborate on content in Notion with approval flows that maintain quality",
        descriptionEs: "Colabora en contenido en Notion con flujos de aprobación que mantienen la calidad"
      },
      {
        title: "Build your content fortress",
        titleEs: "Construye tu fortaleza de contenido",
        description: "Create a month's worth of strategic posts in one planning session",
        descriptionEs: "Crea posts estratégicos para un mes entero en una sola sesión de planificación"
      },
      {
        title: "See exactly what makes your community click",
        titleEs: "Ve exactamente qué hace clic en tu comunidad",
        description: "Identify your highest-performing content types and engagement triggers",
        descriptionEs: "Identifica tus tipos de contenido de mayor rendimiento y disparadores de engagement"
      },
      {
        title: "Reach every corner of your community",
        titleEs: "Llega a cada rincón de tu comunidad",
        description: "Optimize each post for the platform where that segment of your audience lives",
        descriptionEs: "Optimiza cada publicación para la plataforma donde vive ese segmento de tu audiencia"
      },
    ],
    testimonials: [
      {
        quote: "Our community engagement jumped 78% in the first month. Members actually thank us for our content now!",
        quoteEs: "El engagement de nuestra comunidad aumentó un 78% en el primer mes. ¡Los miembros ahora realmente nos agradecen por nuestro contenido!",
        author: "Jordan Taylor",
        role: "Community Manager",
        roleEs: "Community Manager",
        company: "TechCommunity",
      },
      {
        quote: "I finally sleep at night knowing tomorrow's content is ready, optimized, and scheduled for the perfect time.",
        quoteEs: "Por fin duermo por la noche sabiendo que el contenido de mañana está listo, optimizado y programado para el momento perfecto.",
        author: "Emma Wilson",
        role: "Head of Community",
        roleEs: "Directora de Comunidad",
        company: "DevNetwork",
      },
    ],
  },
  {
    slug: "agencies",
    title: "Digital & Marketing Agencies",
    titleEs: "Agencias Digitales y de Marketing",
    description: "Scale your LinkedIn management service without scaling your team",
    descriptionEs: "Escala tu servicio de gestión de LinkedIn sin escalar tu equipo",
    audience: "Agencies",
    painPoints: [
      {
        title: "Drowning in client accounts",
        titleEs: "Ahogándote en cuentas de clientes",
        description: "Manually handling dozens of social accounts leads to mistakes and burnout",
        descriptionEs: "Manejar manualmente docenas de cuentas sociales lleva a errores y agotamiento"
      },
      {
        title: "Reporting nightmares",
        titleEs: "Pesadillas de informes",
        description: "Creating custom performance reports for each client eats up profitability",
        descriptionEs: "Crear informes de rendimiento personalizados para cada cliente consume la rentabilidad"
      },
      {
        title: "Internal-client workflow friction",
        titleEs: "Fricción en el flujo de trabajo interno-cliente",
        description: "Disjointed tools create confusion between your team and client stakeholders",
        descriptionEs: "Las herramientas desconectadas crean confusión entre tu equipo y los interesados del cliente"
      },
    ],
    benefits: [
      {
        title: "Manage 50+ client accounts effortlessly",
        titleEs: "Gestiona más de 50 cuentas de clientes sin esfuerzo",
        description: "Switch between clients and platforms with zero technical headaches",
        descriptionEs: "Cambia entre clientes y plataformas sin dolores de cabeza técnicos"
      },
      {
        title: "Create client-ready reports in two clicks",
        titleEs: "Crea informes listos para clientes en dos clics",
        description: "Generate beautiful, white-labeled performance reports automatically",
        descriptionEs: "Genera automáticamente hermosos informes de rendimiento con marca blanca"
      },
      {
        title: "Give clients their own view",
        titleEs: "Da a los clientes su propia vista",
        description: "Clients access their dashboard while you maintain full control behind the scenes",
        descriptionEs: "Los clientes acceden a su panel mientras tú mantienes el control total tras bastidores"
      },
      {
        title: "Standardize your agency workflow",
        titleEs: "Estandariza el flujo de trabajo de tu agencia",
        description: "Create templates and processes that ensure consistent quality across all clients",
        descriptionEs: "Crea plantillas y procesos que aseguren una calidad consistente en todos los clientes"
      },
    ],
    testimonials: [
      {
        quote: "We added LinkedIn management to our service offering without hiring anyone new. Clients love the results and we love the margins.",
        quoteEs: "Agregamos gestión de LinkedIn a nuestra oferta de servicios sin contratar a nadie nuevo. Los clientes adoran los resultados y nosotros amamos los márgenes.",
        author: "Daniel Fernandez",
        role: "Agency Owner",
        roleEs: "Dueño de Agencia",
        company: "Catalyst Digital",
      },
      {
        quote: "Our client retention jumped from 6 months to 18 months on average since we started showing them the analytics Nolin provides.",
        quoteEs: "Nuestra retención de clientes saltó de 6 meses a 18 meses en promedio desde que comenzamos a mostrarles los análisis que proporciona Nolin.",
        author: "Sophia Wang",
        role: "Client Success Director",
        roleEs: "Directora de Éxito del Cliente",
        company: "PeakSocial Agency",
      },
    ],
  },
]

// Configure the static generation for the use cases
export function generateStaticParams() {
  return useCases.map((useCase) => ({
    slug: useCase.slug,
  }))
}

// Fix for Next.js 14+ dynamic route parameters
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // In Next.js 14, params properties should be accessed after awaiting
  const slug = await Promise.resolve(params.slug);
  const useCase = findUseCase(slug);

  if (!useCase) {
    return {
      title: "Use Case Not Found",
      description: "The requested use case could not be found",
    }
  }

  return {
    title: `Nolin for ${useCase.audience} | Social Media Management`,
    description: useCase.description,
  }
}

// Helper function to find use case data to avoid repeating the find logic
function findUseCase(slug: string): UseCase | undefined {
  return useCases.find((uc) => uc.slug === slug);
}

// Main page component 
export default async function UseCasePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const useCase = findUseCase(params.slug)
  
  if (!useCase) {
    notFound()
  }
  
  return <UseCaseTemplate useCase={useCase} />
}
