"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { NotionLinkedInFlowDemo } from "@/components/notion-linkedin-flow-demo"
import { useLanguage } from "@/contexts/language-context"
import { WaitlistModal } from "@/components/waitlist-modal"
import { 
  CheckCircle, 
  Quote, 
  Calendar, 
  Clock, 
  BarChart3, 
  Zap, 
  Layers, 
  Settings,
  FileText,
  BarChart4,
  Users,
  Building,
  Sparkles,
  Gauge,
  Target,
  Megaphone,
  PenTool,
  MoveRight,
  PhoneCall
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

export function UseCaseTemplate({ useCase }: { useCase: UseCase }) {
  const { t, language } = useLanguage()
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  
  // Translate the audience name
  const getTranslatedAudience = () => {
    // Map audience names to their translation keys
    const audienceMap: Record<string, string> = {
      "Content Creators": "linkedin_creators",
      "Ghostwriters": "ghostwriters",
      "Community Managers": "community_managers",
      "Agencies": "agencies"
    };
    
    const translationKey = audienceMap[useCase.audience];
    if (translationKey) {
      return t(translationKey);
    }
    
    return useCase.audience;
  };
  
  const translatedAudience = getTranslatedAudience();

  // Helper function to get appropriate icon for a feature
  const getFeatureIcon = (index: number) => {
    const icons = [
      <Calendar className="h-6 w-6 text-primary" key="calendar" />,
      <Clock className="h-6 w-6 text-primary" key="clock" />,
      <BarChart3 className="h-6 w-6 text-primary" key="chart" />,
      <Zap className="h-6 w-6 text-primary" key="zap" />,
      <Layers className="h-6 w-6 text-primary" key="layers" />,
      <Settings className="h-6 w-6 text-primary" key="settings" />
    ];
    return icons[index % icons.length];
  };

  // Get the tailored intro text based on audience type
  const getTailoredIntroText = () => {
    // Get the original audience key by matching either English or Spanish audience name
    const getAudienceKey = (audience: string): string => {
      const audienceKeys = {
        // English values
        "Content Creators": "content_creators_intro",
        "LinkedIn Creators": "content_creators_intro",
        "Ghostwriters": "ghostwriters_intro",
        "Community Managers": "community_managers_intro",
        "Agencies": "agencies_intro",
        // Spanish values
        "LinkedIn Influencers": "content_creators_intro",
        "Agencias": "agencies_intro",
      };
      
      return audienceKeys[audience] || "join_thousands";
    };
    
    // First try with the original audience, then with the translated audience
    const originalKey = getAudienceKey(useCase.audience);
    if (originalKey !== "join_thousands") {
      return t(originalKey);
    }
    
    // If we couldn't find a match with the original audience, try with translated
    return t(getAudienceKey(translatedAudience));
  };

  // Get the tailored icon for a benefit based on audience and benefit title
  const getAudienceSpecificIcon = (title: string) => {
    // Helper function to determine the audience category regardless of language
    const getAudienceCategory = (audience: string): string => {
      const audienceMap: Record<string, string> = {
        // English values
        "Content Creators": "Content Creators",
        "LinkedIn Creators": "Content Creators",
        "Ghostwriters": "Ghostwriters",
        "Community Managers": "Community Managers",
        "Agencies": "Agencies",
        // Spanish values 
        "LinkedIn Influencers": "Content Creators",
        "Ghostwriters": "Ghostwriters", // Keep in English as per request
        "Community Managers": "Community Managers", // Keep in English as per request
        "Agencias": "Agencies"
      };
      
      return audienceMap[audience] || audience;
    };
    
    const audienceCategory = getAudienceCategory(useCase.audience);
    
    // Common keywords across all audiences
    if (title.toLowerCase().includes('platform') || title.toLowerCase().includes('cross') || title.toLowerCase().includes('multi')) {
      return <Layers className="h-5 w-5 text-primary" />;
    } else if (title.toLowerCase().includes('analytic') || title.toLowerCase().includes('track') || title.toLowerCase().includes('report')) {
      return <BarChart3 className="h-5 w-5 text-primary" />;
    } else if (title.toLowerCase().includes('schedule') || title.toLowerCase().includes('post') || title.toLowerCase().includes('publish')) {
      return <Clock className="h-5 w-5 text-primary" />;
    }

    // Audience-specific icons
    switch(audienceCategory) {
      case "Content Creators":
        if (title.toLowerCase().includes('workflow') || title.toLowerCase().includes('central')) {
          return <Sparkles className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('consistent')) {
          return <Gauge className="h-5 w-5 text-primary" />;
        }
        break;
      case "Ghostwriters":
        if (title.toLowerCase().includes('approval') || title.toLowerCase().includes('client')) {
          return <PenTool className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('account') || title.toLowerCase().includes('manage')) {
          return <Users className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('organiz')) {
          return <FileText className="h-5 w-5 text-primary" />;
        }
        break;
      case "Community Managers":
        if (title.toLowerCase().includes('team') || title.toLowerCase().includes('collab')) {
          return <Users className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('strategic') || title.toLowerCase().includes('plan')) {
          return <Target className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('engage')) {
          return <Megaphone className="h-5 w-5 text-primary" />;
        }
        break;
      case "Agencies":
        if (title.toLowerCase().includes('scale') || title.toLowerCase().includes('client')) {
          return <Building className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('report')) {
          return <FileText className="h-5 w-5 text-primary" />;
        } else if (title.toLowerCase().includes('collab')) {
          return <Users className="h-5 w-5 text-primary" />;
        }
        break;
    }

    // Default icon if no specific match
    return <Zap className="h-5 w-5 text-primary" />;
  };

  // Helper to get content based on current language
  const getLocalizedContent = (enContent: string, esContent: string) => {
    return language === "es" ? esContent : enContent;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{t("nolin_for")} {translatedAudience}</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  {getLocalizedContent(useCase.description, useCase.descriptionEs)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="#cta">{t("unlock_your_potential")}</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/pricing">{t("discover_plans")}</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("common_challenges")} {translatedAudience}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("understand_challenges")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCase.painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <span className="text-xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {getLocalizedContent(point.title, point.titleEs)}
                      </h3>
                      <p className="text-muted-foreground">
                        {getLocalizedContent(point.description, point.descriptionEs)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution/Benefits Section - Updated UI */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("how_nolin_helps")} {translatedAudience}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {getTailoredIntroText()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCase.benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getAudienceSpecificIcon(getLocalizedContent(benefit.title, benefit.titleEs))}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {getLocalizedContent(benefit.title, benefit.titleEs)}
                          </h3>
                          <p className="text-muted-foreground">
                            {getLocalizedContent(benefit.description, benefit.descriptionEs)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Demo Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("notion_flow_title")}</h2>
            </div>
            <NotionLinkedInFlowDemo />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("hear_from")} {translatedAudience}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCase.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="h-10 w-10 text-primary/40 mb-4" />
                      <blockquote className="text-lg mb-6 flex-grow">
                        "{getLocalizedContent(testimonial.quote, testimonial.quoteEs)}"
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="font-semibold">{testimonial.author.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {getLocalizedContent(testimonial.role, testimonial.roleEs)}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full py-20 lg:py-40">
          <div className="container mx-auto">
            <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
              <div>
                <Badge>{t("get_started")}</Badge>
              </div>
              <motion.div 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                  {t("start_managing_social")}
                </h3>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl mx-auto">
                  {t("try_nolin_today")}
                </p>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="gap-4" onClick={() => setIsWaitlistModalOpen(true)}>
                    {t("get_started_free")} 
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    >
                      <MoveRight className="w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </div>
  )
}
