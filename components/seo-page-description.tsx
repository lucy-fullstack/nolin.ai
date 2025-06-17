"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'

interface SEOPageDescriptionProps {
  pageKey?: string
  path?: string
  description?: string
}

export function SEOPageDescription({ pageKey, path, description }: SEOPageDescriptionProps) {
  const pathname = usePathname()
  const { t, language } = useLanguage()
  
  // Determine which description to use
  const getPageDescription = () => {
    if (description) return description
    
    if (pageKey) {
      const translationKey = `${pageKey}_meta_description`
      const translatedDesc = t(translationKey)
      
      // If we have a translation, use it
      if (translatedDesc !== translationKey) {
        return translatedDesc
      }
    }
    
    // Check if we're on a specific path
    const currentPath = path || pathname
    
    if (currentPath.includes('pricing')) {
      return language === 'es' 
        ? 'Planes de precios flexibles para creadores de contenido, ghostwriters y agencias. Gestiona tu contenido de social media desde Notion con nolin.ai.'
        : 'Flexible pricing plans for content creators, ghostwriters, and agencies. Manage your social media content from Notion with nolin.ai.'
    }
    
    if (currentPath.includes('use-cases')) {
      if (currentPath.includes('linkedin-creators')) {
        return language === 'es'
          ? 'Crea y programa contenido para LinkedIn directamente desde Notion. Una solución diseñada específicamente para creadores de LinkedIn.'
          : 'Create and schedule LinkedIn content directly from Notion. A solution purpose-built for LinkedIn creators.'
      }
      
      if (currentPath.includes('ghostwriters')) {
        return language === 'es'
          ? 'Gestiona el contenido de múltiples clientes en un solo lugar. nolin.ai te ayuda a organizar, programar y publicar contenido de forma eficiente.'
          : 'Manage content for multiple clients in one place. nolin.ai helps you organize, schedule, and publish content efficiently.'
      }
      
      if (currentPath.includes('agencies')) {
        return language === 'es'
          ? 'Escala tu servicio de gestión de redes sociales sin escalar tu equipo. nolin.ai simplifica el flujo de trabajo para agencias.'
          : 'Scale your social media management service without scaling your team. nolin.ai streamlines the workflow for agencies.'
      }
      
      // Default for any use-case
      return language === 'es'
        ? 'Descubre cómo nolin.ai puede mejorar tu flujo de trabajo de contenido para redes sociales con integración directa con Notion.'
        : 'Discover how nolin.ai can improve your social media content workflow with direct Notion integration.'
    }
    
    // Default homepage description
    return t('meta_description')
  }
  
  useEffect(() => {
    const description = getPageDescription()
    
    // Update meta description
    const metaDescTag = document.querySelector('meta[name="description"]')
    if (metaDescTag) {
      metaDescTag.setAttribute('content', description)
    } else {
      const newMetaTag = document.createElement('meta')
      newMetaTag.setAttribute('name', 'description')
      newMetaTag.setAttribute('content', description)
      document.head.appendChild(newMetaTag)
    }
    
    // Update OpenGraph description
    const ogDescTag = document.querySelector('meta[property="og:description"]')
    if (ogDescTag) {
      ogDescTag.setAttribute('content', description)
    }
    
    // Update Twitter description
    const twitterDescTag = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescTag) {
      twitterDescTag.setAttribute('content', description)
    }
  }, [pathname, language])
  
  // This component doesn't render anything visually
  return null
} 