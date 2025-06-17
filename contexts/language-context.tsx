"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  
  // Load language preference from localStorage on client-side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])
  
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translations object
export const translations = {
  en: {
    // Hero section
    "hero_title": "Schedule Your LinkedIn Content From",
    "hero_subtitle": "The first tool that lets LinkedIn creators, ghostwriters, and agencies schedule and manage content directly from Notion.",
    "join_waitlist": "Join Waitlist",
    "see_features": "See Features",
    "social_banner": "Join +50 LinkedIn creators",
    "one_place": "One Place",
    "anywhere": "Anywhere",
    
    // Features section
    "features_title": "Why LinkedIn Creators Love nolin.ai",
    "features_subtitle": "Designed specifically for LinkedIn content creators, ghostwriters, and agencies",
    
    "notion_integration": "Notion Integration",
    "notion_integration_desc": "Schedule posts directly from your Notion workspace without switching tools",
    
    "time_saving": "Time-Saving Automation",
    "time_saving_desc": "Set it and forget it - your content publishes automatically at optimal times",
    
    "content_calendar": "Content Calendar",
    "content_calendar_desc": "Visual calendar to plan and organize your LinkedIn content strategy",
    
    "agency_ready": "Agency-Ready",
    "agency_ready_desc": "Manage multiple LinkedIn accounts and clients from a single dashboard",
    
    "lightning_fast": "Lightning Fast",
    "lightning_fast_desc": "No more copy-pasting between tools - publish in seconds, not minutes",
    
    "analytics_dashboard": "Analytics Dashboard",
    "analytics_dashboard_desc": "Track performance and engagement metrics to optimize your content",
    
    // How it works section
    "how_it_works_title": "How nolin.ai Works",
    "how_it_works_subtitle": "A seamless workflow from content creation to publishing",
    
    // Process section
    "process_title": "Step-by-Step Process",
    "process_subtitle": "A seamless workflow from Notion to Social Media in three simple steps",
    
    // Waitlist section
    "waitlist_title": "Join the Waitlist",
    "waitlist_subtitle": "Be among the first to try nolin.ai and transform how you manage LinkedIn content",
    
    // Footer
    "rights_reserved": "© 2025 nolin.ai. All rights reserved.",
    "privacy_policy": "Privacy Policy",
    
    // Not found page
    "not_found": "Not Found!",
    "error": "Error",
    "something_wrong": "Something went wrong!",
    "not_found_desc": "We couldn't find the page you were looking for. The page might have been moved, deleted, or never existed in the first place.",
    "back_home": "Back to Homepage",
    
    // Loading
    "loading": "Loading...",
    "loading_desc": "Please wait while we prepare your content",
    
    // Language
    "language": "Language",
    "en": "EN",
    "es": "ES",
    
    // Meta tags
    "meta_title": "nolin.ai | Schedule Social Media Content from Notion",
    "meta_description": "Transform your social media publishing workflow with nolin.ai - schedule posts from Notion to X and LinkedIn. The essential tool for content creators, ghostwriters, and agencies.",
    
    // Navigation
    "use_cases": "Use Cases",
    "pricing": "Pricing",
    
    // Use cases
    "linkedin_creators": "LinkedIn Creators",
    "ghostwriters": "Ghostwriters",
    "community_managers": "Community Managers",
    "agencies": "Agencies",
    
    // Integration Showcase
    "integration_title": "Seamless Integration",
    "integration_subtitle": "nolin.ai connects your Notion workspace directly to LinkedIn for effortless content publishing",
    "content_creation_platform": "Content Creation Platform",
    "linkedin_content_database": "LinkedIn Content Database",
    "last_edited": "Last edited: Today at 2:45 PM",
    "post_count": "25 posts",
    "thought_leadership_post": "Thought Leadership Post",
    "post_preview": "The future of AI in content creation is not about replacing humans, but augmenting their capabilities...",
    "ready_to_publish": "Ready to publish",
    "scheduled_time": "May 17, 10:00 AM",
    "next_weeks": "Next 2 weeks planned",
    "scheduled_posts": "8 scheduled posts",
    "content_data": "Content data",
    "publishing_platform": "Publishing Platform",
    "company_page": "Company Page",
    "followers": "5,280 followers",
    "growth_rate": "+12% this month",
    "your_company": "Your Company",
    "just_now": "Just now",
    "analytics": "Analytics",
    "last_30_days": "Last 30 days",
    "impressions": "28.5k impressions",
    "integration_feature_1_title": "Write in Notion",
    "integration_feature_1_desc": "Create and organize your LinkedIn content in your familiar Notion workspace",
    "integration_feature_2_title": "Schedule with nolin.ai",
    "integration_feature_2_desc": "Set publishing dates or use AI to determine optimal posting times",
    "integration_feature_3_title": "Publish to Social Media",
    "integration_feature_3_desc": "Content is automatically formatted and published to X and LinkedIn at scheduled times",
    
    // Workflow diagram
    "workflow_step1_title": "Schedule",
    "workflow_step1_desc": "Set publishing times or use AI suggestions",
    "workflow_step2_title": "Publish to social media",
    "workflow_step2_desc": "Content goes live automatically",
    "workflow_step3_title": "Track results",
    "workflow_step3_desc": "Monitor engagement and performance",

    // Notion LinkedIn Flow Demo
    "notion_flow_title": "Schedule social media content directly from Notion",
    "notion_flow_create": "CREATE",
    "notion_flow_schedule": "SCHEDULE", 
    "notion_flow_publish": "PUBLISH",
    "notion_flow_analyze": "ANALYZE",

    // Comparison Chart
    "comparison_title": "Why Choose nolin.ai?",
    "comparison_subtitle": "See how nolin.ai compares to traditional LinkedIn scheduling tools",
    "notion_to_linkedin": "Notion to LinkedIn",
    "other_tools": "Other Tools",
    "traditional_schedulers": "Traditional Schedulers",
    "limited": "Limited",
    "comparison_feature1": "Schedule posts from Notion",
    "comparison_feature2": "Direct Notion integration",
    "comparison_feature3": "No copy-pasting required",
    "comparison_feature4": "AI-powered scheduling",
    "comparison_feature5": "Content calendar",
    "comparison_feature6": "Analytics dashboard",
    "comparison_feature7": "Multi-account management",
    "comparison_feature8": "Team collaboration",
    "comparison_feature9": "Content approval workflow",

    // Dashboard Mockup
    "dashboard_title": "nolin.ai Dashboard",
    "search_content": "Search content...",
    "scheduled_content": "Scheduled Content",
    "upcoming": "Upcoming (12)",
    "published": "Published (45)",
    "weekly_schedule": "Weekly Schedule",
    "notion_drafts": "Notion Drafts",
    "connected_accounts": "Connected Accounts",
    "active": "Active",
    "personal_profile": "Personal Profile",
    "x_profile": "X Profile",
    "content_calendar": "Content Calendar",
    "may_2024": "May 2024",
    "filter": "Filter",
    "month": "Month",
    "new_post": "New Post",
    "weekdays": "Mon,Tue,Wed,Thu,Fri,Sat,Sun",

    // Analytics Graph
    "analytics_title": "Powerful Analytics & Insights",
    "analytics_subtitle": "Track your LinkedIn performance and optimize your content strategy with data-driven insights",
    "engagement": "Engagement",
    "time_saved": "Time Saved",
    "content_performance": "Content Performance",
    "timeframe": "Timeframe:",
    "days_7": "7 days",
    "days_30": "30 days",
    "days_90": "90 days",
    "engagement_metrics": "Engagement Metrics",
    "engagement_metrics_desc": "Track impressions, likes, and comments over the last 30 days",
    "impressions": "Impressions",
    "likes": "Likes",
    "comments": "Comments",
    "time_saved_with_nolin": "Time Saved with nolin.ai",
    "time_per_post": "Average time spent per post (in minutes)",
    "manual_process": "Manual Process",
    "with_nolin": "With nolin.ai",
    "saved_per_post": "saved per post",
    "faster_with_nolin": "faster with nolin.ai",
    "content_performance_type": "Content Performance by Type",
    "engagement_by_category": "Engagement rate by content category",
    "best_performing": "Best Performing",
    "average_engagement": "Average Engagement",
    "lowest_performing": "Lowest Performing",
    "text_post": "Text Post",
    "carousel": "Carousel",
    "video": "Video",
    "poll": "Poll",
    "engagement_percent": "% engagement",
    "insight_carousel": "Carousels drive the highest engagement—try more visual storytelling!",
    "insight_video": "Videos perform well—consider sharing more dynamic content.",
    "insight_text": "Text posts are solid, but visuals may boost engagement.",
    "insight_poll": "Polls can spark interaction, but may not always drive the highest engagement.",
    
    // Use Case Template
    "nolin_for": "Nolin for",
    "try_free": "Join Waitlist",
    "view_pricing": "View Pricing",
    "unlock_your_potential": "Unlock Your Potential",
    "discover_plans": "Discover Plans",
    "get_started_free": "Get Started Free",
    "common_challenges": "Common Challenges for",
    "understand_challenges": "We understand the unique challenges you face when managing social media content",
    "how_nolin_helps": "How Nolin Helps",
    "hear_from": "Hear from",
    "start_managing_social": "Elevate Your Social Media Strategy",
    "try_nolin_today": "Try Nolin today and experience the difference in your workflow",
    "start_free_trial": "Start Free Trial",
    "see_pricing": "See Pricing",
    
    // Use case audience-specific intro texts
    "content_creators_intro": "Perfect for content creators who want to streamline their workflow and save time",
    "ghostwriters_intro": "Designed for ghostwriters managing multiple clients and content streams",
    "community_managers_intro": "Helping community managers engage their audience with consistent content",
    "agencies_intro": "Enabling agencies to scale their social media management efficiently",
    "join_thousands": "Join thousands of professionals who are transforming their social media workflow",
    
    // Audience-specific CTA blocks
    "scale_agency_title": "Scale Your Agency Without Scaling Overhead",
    "scale_agency_text": "Take on more clients while keeping your team lean and processes efficient",
    "create_once_title": "Create Once, Publish Everywhere",
    "create_once_text": "Focus on creating quality content while Nolin handles the distribution",
    "streamline_workflow_title": "Streamline Your Client Workflow",
    "streamline_workflow_text": "Manage more clients with less effort and better organization",
    "stronger_communities_title": "Build Stronger Communities",
    "stronger_communities_text": "Keep your community engaged with consistent, strategic content",
    "get_started": "Get started",
    "get_started_title": "Ready to Get Started?",
    "get_started_text": "Join thousands of professionals who are saving time and improving their social media content strategy",

    // Pricing Page
    "pricing_title": "Simple, transparent pricing",
    "pricing_subtitle": "Choose the plan that's right for you and start streamlining your LinkedIn workflow",
    "waitlist_free_month": "Sign up for the waitlist to get 1 month for free once we launch",
    "monthly": "Monthly",
    "yearly": "Yearly",
    "save_percent": "Save 30%",
    "most_popular": "Most Popular",
    "mo_billed_yearly": "mo, billed yearly",
    "month": "month",
    "join_waitlist_free_month": "Join Waitlist",
    "no_credit_card": "No credit card required",
    "included_all_plans": "Included in all plans",
    "included_all_plans_desc": "Every plan comes with these essential features to streamline your LinkedIn workflow",
    "early_access": "Early Access",
    "early_access_desc": "Be among the first to experience nolin.ai",
    "secure_free_month": "Join Waitlist",
    "faq_title": "Frequently Asked Questions",
    "faq_more_questions": "Have more questions? Contact us at",
  },
  es: {
    // Hero section
    "hero_title": "Programa Tu Contenido de LinkedIn Desde",
    "hero_subtitle": "La primera herramienta que permite a creadores de LinkedIn, ghostwriters y agencias programar y gestionar contenido directamente desde Notion.",
    "join_waitlist": "Únete al Waitlist",
    "see_features": "Ver Características",
    "social_banner": "Únete a +50 creadores de LinkedIn",
    "one_place": "Un Solo Lugar",
    "anywhere": "Cualquier Lugar",
    
    // Features section
    "features_title": "Por Qué Los Creadores de LinkedIn Aman nolin.ai",
    "features_subtitle": "Diseñado específicamente para creadores de contenido de LinkedIn, ghostwriters y agencias",
    
    "notion_integration": "Integración con Notion",
    "notion_integration_desc": "Programa publicaciones directamente desde tu espacio de Notion sin cambiar de herramientas",
    
    "time_saving": "Automatización que Ahorra Tiempo",
    "time_saving_desc": "Configúralo y olvídate - tu contenido se publica automáticamente en horarios óptimos",
    
    "content_calendar": "Calendario de Contenido",
    "content_calendar_desc": "Calendario visual para planificar y organizar tu estrategia de contenido en LinkedIn",
    
    "agency_ready": "Listo para Agencias",
    "agency_ready_desc": "Gestiona múltiples cuentas de LinkedIn y clientes desde un solo panel",
    
    "lightning_fast": "Extremadamente Rápido",
    "lightning_fast_desc": "No más copiar y pegar entre herramientas - publica en segundos, no minutos",
    
    "analytics_dashboard": "Panel de Análisis",
    "analytics_dashboard_desc": "Sigue métricas de rendimiento y engagement para optimizar tu contenido",
    
    // How it works section
    "how_it_works_title": "Cómo Funciona nolin.ai",
    "how_it_works_subtitle": "Un flujo de trabajo sin interrupciones desde la creación hasta la publicación",
    
    // Process section
    "process_title": "Proceso Paso a Paso",
    "process_subtitle": "Un flujo de trabajo sin interrupciones de Notion a Redes Sociales en tres simples pasos",
    
    // Waitlist section
    "waitlist_title": "Únete a la Lista de Espera",
    "waitlist_subtitle": "Sé de los primeros en probar nolin.ai y transformar cómo gestionas el contenido de LinkedIn",
    
    // Footer
    "rights_reserved": "© 2025 nolin.ai. Todos los derechos reservados.",
    "privacy_policy": "Política de Privacidad",
    
    // Not found page
    "not_found": "¡No Encontrado!",
    "error": "Error",
    "something_wrong": "¡Algo salió mal!",
    "not_found_desc": "No pudimos encontrar la página que estabas buscando. Es posible que la página haya sido movida, eliminada o nunca existió.",
    "back_home": "Volver a la Página Principal",
    
    // Loading
    "loading": "Cargando...",
    "loading_desc": "Por favor espera mientras preparamos tu contenido",
    
    // Language
    "language": "Idioma",
    "en": "EN",
    "es": "ES",
    
    // Meta tags
    "meta_title": "nolin.ai | Programa Contenido para Redes Sociales desde Notion",
    "meta_description": "Transforma tu flujo de trabajo de publicaciones en redes sociales con nolin.ai - programa publicaciones desde Notion a X y LinkedIn. La herramienta esencial para creadores de contenido, ghostwriters y agencias.",
    
    // Navigation
    "use_cases": "Casos de Uso",
    "pricing": "Precios",
    
    // Use cases
    "linkedin_creators": "Creadores de LinkedIn",
    "ghostwriters": "Ghostwriters",
    "community_managers": "Community Managers",
    "agencies": "Agencias",
    
    // Integration Showcase
    "integration_title": "Integración Perfecta",
    "integration_subtitle": "nolin.ai conecta tu espacio de trabajo de Notion directamente con LinkedIn para publicar contenido sin esfuerzo",
    "content_creation_platform": "Plataforma de Creación de Contenido",
    "linkedin_content_database": "Base de Datos de Contenido de LinkedIn",
    "last_edited": "Última edición: Hoy a las 2:45 PM",
    "post_count": "25 publicaciones",
    "thought_leadership_post": "Publicación de Liderazgo de Pensamiento",
    "post_preview": "El futuro de la IA en la creación de contenido no se trata de reemplazar a los humanos, sino de aumentar sus capacidades...",
    "ready_to_publish": "Listo para publicar",
    "scheduled_time": "17 de mayo, 10:00 AM",
    "next_weeks": "Próximas 2 semanas planificadas",
    "scheduled_posts": "8 publicaciones programadas",
    "content_data": "Datos de contenido",
    "publishing_platform": "Plataforma de Publicación",
    "company_page": "Página de Empresa",
    "followers": "5,280 seguidores",
    "growth_rate": "+12% este mes",
    "your_company": "Tu Empresa",
    "just_now": "Justo ahora",
    "analytics": "Análisis",
    "last_30_days": "Últimos 30 días",
    "impressions": "28.5k impresiones",
    "integration_feature_1_title": "Escribe en Notion",
    "integration_feature_1_desc": "Crea y organiza tu contenido de LinkedIn en tu espacio familiar de Notion",
    "integration_feature_2_title": "Programa con nolin.ai",
    "integration_feature_2_desc": "Establece fechas de publicación o usa IA para determinar horarios óptimos",
    "integration_feature_3_title": "Publica en Redes Sociales",
    "integration_feature_3_desc": "El contenido se formatea y publica automáticamente en X y LinkedIn en los horarios programados",
    
    // Workflow diagram
    "workflow_step1_title": "Programa",
    "workflow_step1_desc": "Establece horarios de publicación o usa sugerencias de IA",
    "workflow_step2_title": "Publica en redes sociales",
    "workflow_step2_desc": "El contenido se publica automáticamente",
    "workflow_step3_title": "Rastrea resultados",
    "workflow_step3_desc": "Monitorea el engagement y rendimiento",

    // Notion LinkedIn Flow Demo
    "notion_flow_title": "Programa contenido de redes sociales directamente desde Notion",
    "notion_flow_create": "CREAR",
    "notion_flow_schedule": "PROGRAMAR", 
    "notion_flow_publish": "PUBLICAR",
    "notion_flow_analyze": "ANALIZAR",

    // Comparison Chart
    "comparison_title": "¿Por Qué Elegir nolin.ai?",
    "comparison_subtitle": "Mira cómo nolin.ai se compara con las herramientas tradicionales de programación de LinkedIn",
    "notion_to_linkedin": "Notion a LinkedIn",
    "other_tools": "Otras Herramientas",
    "traditional_schedulers": "Programadores Tradicionales",
    "limited": "Limitado",
    "comparison_feature1": "Programar publicaciones desde Notion",
    "comparison_feature2": "Integración directa con Notion",
    "comparison_feature3": "No requiere copiar y pegar",
    "comparison_feature4": "Programación potenciada por IA",
    "comparison_feature5": "Calendario de contenido",
    "comparison_feature6": "Panel de análisis",
    "comparison_feature7": "Gestión de múltiples cuentas",
    "comparison_feature8": "Colaboración en equipo",
    "comparison_feature9": "Flujo de aprobación de contenido",

    // Dashboard Mockup
    "dashboard_title": "Panel de Control nolin.ai",
    "search_content": "Buscar contenido...",
    "scheduled_content": "Contenido Programado",
    "upcoming": "Próximo (12)",
    "published": "Publicado (45)",
    "weekly_schedule": "Programación Semanal",
    "notion_drafts": "Borradores de Notion",
    "connected_accounts": "Cuentas Conectadas",
    "active": "Activo",
    "personal_profile": "Perfil Personal",
    "x_profile": "Perfil de X",
    "content_calendar": "Calendario de Contenido",
    "may_2024": "Mayo 2024",
    "filter": "Filtrar",
    "month": "Mes",
    "new_post": "Nueva Publicación",
    "weekdays": "Lun,Mar,Mié,Jue,Vie,Sáb,Dom",

    // Analytics Graph
    "analytics_title": "Análisis e Insights Poderosos",
    "analytics_subtitle": "Rastrea tu rendimiento en LinkedIn y optimiza tu estrategia de contenido con insights basados en datos",
    "engagement": "Engagement",
    "time_saved": "Tiempo Ahorrado",
    "content_performance": "Rendimiento de Contenido",
    "timeframe": "Período:",
    "days_7": "7 días",
    "days_30": "30 días",
    "days_90": "90 días",
    "engagement_metrics": "Métricas de Engagement",
    "engagement_metrics_desc": "Rastrea impresiones, me gusta y comentarios durante los últimos 30 días",
    "impressions": "Impresiones",
    "likes": "Me gusta",
    "comments": "Comentarios",
    "time_saved_with_nolin": "Tiempo Ahorrado con nolin.ai",
    "time_per_post": "Tiempo promedio por publicación (en minutos)",
    "manual_process": "Proceso Manual",
    "with_nolin": "Con nolin.ai",
    "saved_per_post": "ahorrado por publicación",
    "faster_with_nolin": "más rápido con nolin.ai",
    "content_performance_type": "Rendimiento de Contenido por Tipo",
    "engagement_by_category": "Tasa de engagement por categoría de contenido",
    "best_performing": "Mejor Rendimiento",
    "average_engagement": "Engagement Promedio",
    "lowest_performing": "Menor Rendimiento",
    "text_post": "Publicación de Texto",
    "carousel": "Carrusel",
    "video": "Video",
    "poll": "Encuesta",
    "engagement_percent": "% de engagement",
    "insight_carousel": "Los carruseles generan el mayor engagement—¡prueba a contar más historias visuales!",
    "insight_video": "Los videos funcionan bien—considera compartir más contenido dinámico.",
    "insight_text": "Las publicaciones de texto son sólidas, pero los elementos visuales pueden aumentar el engagement.",
    "insight_poll": "Las encuestas pueden generar interacción, pero puede que no siempre generen el mayor engagement.",
    
    // Use Case Template
    "nolin_for": "Nolin para",
    "try_free": "Únete al Waitlist",
    "view_pricing": "Ver Precios",
    "unlock_your_potential": "Desbloquea Tu Potencial",
    "discover_plans": "Descubre Planes",
    "get_started_free": "Comienza Gratis",
    "common_challenges": "Desafíos Comunes para",
    "understand_challenges": "Entendemos los desafíos únicos que enfrentas al gestionar contenido en redes sociales",
    "how_nolin_helps": "Cómo Nolin Ayuda",
    "hear_from": "Escucha de",
    "start_managing_social": "Potencia Tu Estrategia en Redes",
    "try_nolin_today": "Prueba Nolin hoy y experimenta la diferencia en tu flujo de trabajo",
    "start_free_trial": "Comenzar Prueba Gratuita",
    "see_pricing": "Ver Precios",

    // Use case audience-specific intro texts
    "content_creators_intro": "Perfecto para creadores de contenido que quieren optimizar su flujo de trabajo y ahorrar tiempo",
    "ghostwriters_intro": "Diseñado para ghostwriters que gestionan múltiples clientes y flujos de contenido",
    "community_managers_intro": "Ayudando a community managers a involucrar a su audiencia con contenido consistente",
    "agencies_intro": "Permitiendo a las agencias escalar su gestión de redes sociales de manera eficiente",
    "join_thousands": "Únete a miles de profesionales que están transformando su flujo de trabajo en redes sociales",
    
    // Audience-specific CTA blocks
    "scale_agency_title": "Escala Tu Agencia Sin Aumentar Gastos",
    "scale_agency_text": "Acepta más clientes mientras mantienes tu equipo eficiente y tus procesos optimizados",
    "create_once_title": "Crea Una Vez, Publica en Todas Partes",
    "create_once_text": "Céntrate en crear contenido de calidad mientras Nolin se encarga de la distribución",
    "streamline_workflow_title": "Optimiza Tu Flujo de Trabajo con Clientes",
    "streamline_workflow_text": "Gestiona más clientes con menos esfuerzo y mejor organización",
    "stronger_communities_title": "Construye Comunidades Más Fuertes",
    "stronger_communities_text": "Mantén a tu comunidad comprometida con contenido estratégico y consistente",
    "get_started": "Empezar",
    "get_started_title": "¿Listo para Comenzar?",
    "get_started_text": "Únete a miles de profesionales que ahorran tiempo y mejoran su estrategia de contenido en redes sociales",

    // Pricing Page
    "pricing_title": "Precios simples y transparentes",
    "pricing_subtitle": "Elige el plan adecuado para ti y comienza a optimizar tu flujo de trabajo en LinkedIn",
    "waitlist_free_month": "Regístrate en la lista de espera para obtener 1 mes gratis cuando lancemos",
    "monthly": "Mensual",
    "yearly": "Anual",
    "save_percent": "Ahorra 30%",
    "most_popular": "Más Popular",
    "mo_billed_yearly": "mes, facturado anualmente",
    "month": "mes",
    "join_waitlist_free_month": "Únete al Waitlist",
    "no_credit_card": "No se requiere tarjeta de crédito",
    "included_all_plans": "Incluido en todos los planes",
    "included_all_plans_desc": "Todos los planes incluyen estas características esenciales para optimizar tu flujo de trabajo en LinkedIn",
    "early_access": "Acceso Anticipado",
    "early_access_desc": "Sé de los primeros en experimentar nolin.ai",
    "secure_free_month": "Únete al Waitlist",
    "faq_title": "Preguntas Frecuentes",
    "faq_more_questions": "¿Tienes más preguntas? Contáctanos en",
  }
} 