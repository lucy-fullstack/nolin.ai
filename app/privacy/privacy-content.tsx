"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function PrivacyContent() {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  return (
    <div className="container py-12 max-w-4xl">
      <Link 
        href="/" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {isSpanish ? "Volver al inicio" : "Back to home"}
      </Link>
      
      <h1 className="text-4xl font-bold tracking-tight mb-2">{isSpanish ? "Política de Privacidad" : "Privacy Policy"}</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        {isSpanish ? "Última actualización: " : "Last updated: "}
        {new Date().toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })}
      </p>
      
      <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-base">
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Introducción" : "Introduction"}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {isSpanish 
              ? "En nolin.ai (\"nosotros\", \"nuestro\" o \"nos\"), respetamos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio web y te informará sobre tus derechos de privacidad y cómo la ley te protege."
              : "At nolin.ai (\"we\", \"our\", or \"us\"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
            }
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Datos que Recopilamos" : "Data We Collect"}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {isSpanish
              ? "Podemos recopilar, utilizar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos agrupado de la siguiente manera:"
              : "We may collect, use, store and transfer different kinds of personal data about you which we have grouped as follows:"
            }
          </p>
          <ul className="space-y-3 list-disc pl-6 text-muted-foreground">
            <li className="leading-relaxed">
              <span className="font-semibold text-foreground">{isSpanish ? "Datos de Identidad" : "Identity Data"}</span>: 
              {isSpanish 
                ? " incluye nombre, apellido, nombre de usuario o identificador similar."
                : " includes first name, last name, username or similar identifier."
              }
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-foreground">{isSpanish ? "Datos de Contacto" : "Contact Data"}</span>: 
              {isSpanish 
                ? " incluye dirección de correo electrónico."
                : " includes email address."
              }
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-foreground">{isSpanish ? "Datos Técnicos" : "Technical Data"}</span>: 
              {isSpanish 
                ? " incluye dirección de protocolo de internet (IP), tipo y versión del navegador, configuración y ubicación de zona horaria, tipos y versiones de complementos del navegador, sistema operativo y plataforma."
                : " includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform."
              }
            </li>
            <li className="leading-relaxed">
              <span className="font-semibold text-foreground">{isSpanish ? "Datos de Uso" : "Usage Data"}</span>: 
              {isSpanish 
                ? " incluye información sobre cómo utilizas nuestro sitio web y servicios."
                : " includes information about how you use our website and services."
              }
            </li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Cómo Utilizamos tus Datos" : "How We Use Your Data"}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {isSpanish
              ? "Solo utilizaremos tus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos tus datos personales en las siguientes circunstancias:"
              : "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:"
            }
          </p>
          <ul className="space-y-3 list-disc pl-6 text-muted-foreground">
            <li className="leading-relaxed">
              {isSpanish 
                ? "Para registrarte como nuevo cliente o miembro de la lista de espera."
                : "To register you as a new customer or waitlist member."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Para proporcionar y mejorar nuestros servicios."
                : "To provide and improve our services."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Para gestionar nuestra relación contigo."
                : "To manage our relationship with you."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Para administrar y proteger nuestro negocio y sitio web."
                : "To administer and protect our business and website."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Para entregarte contenido y anuncios relevantes del sitio web."
                : "To deliver relevant website content and advertisements to you."
              }
            </li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Seguridad de Datos" : "Data Security"}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {isSpanish
              ? "Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan, utilicen o accedan de manera no autorizada, se alteren o divulguen accidentalmente."
              : "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed."
            }
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Retención de Datos" : "Data Retention"}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {isSpanish
              ? "Solo conservaremos tus datos personales durante el tiempo necesario para cumplir con los fines para los que los recopilamos, incluidos los fines de satisfacer cualquier requisito legal, contable o de informes."
              : "We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements."
            }
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Tus Derechos Legales" : "Your Legal Rights"}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {isSpanish
              ? "Bajo ciertas circunstancias, tienes derechos según las leyes de protección de datos en relación con tus datos personales, incluido el derecho a:"
              : "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:"
            }
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6 text-muted-foreground list-disc">
            <li className="leading-relaxed">
              {isSpanish 
                ? "Solicitar acceso a tus datos personales."
                : "Request access to your personal data."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Solicitar la corrección de tus datos personales."
                : "Request correction of your personal data."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Solicitar la eliminación de tus datos personales."
                : "Request erasure of your personal data."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Oponerte al procesamiento de tus datos personales."
                : "Object to processing of your personal data."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Solicitar la restricción del procesamiento de tus datos personales."
                : "Request restriction of processing your personal data."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Solicitar la transferencia de tus datos personales."
                : "Request transfer of your personal data."
              }
            </li>
            <li className="leading-relaxed">
              {isSpanish 
                ? "Derecho a retirar el consentimiento."
                : "Right to withdraw consent."
              }
            </li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Cambios en esta Política de Privacidad" : "Changes to This Privacy Policy"}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {isSpanish
              ? "Podemos actualizar nuestra política de privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva política de privacidad en esta página y actualizando la fecha de \"Última actualización\"."
              : "We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the \"Last updated\" date."
            }
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl mb-4 font-bold text-foreground">{isSpanish ? "Contáctanos" : "Contact Us"}</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            {isSpanish
              ? "Si tienes alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, por favor contáctanos en:"
              : "If you have any questions about this privacy policy or our privacy practices, please contact us at:"
            }
          </p>
          <p className="text-primary font-medium">Email: hi@nolin.ai</p>
        </section>
      </div>
    </div>
  )
} 