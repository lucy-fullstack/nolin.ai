"use client"

import NotionLinkedInFlow from "@/components/ui/notion-linkedin-flow"
import { useLanguage } from "@/contexts/language-context"

export const NotionLinkedInFlowDemo = () => {
  const { t } = useLanguage()
  
  return (
    <div className="flex justify-center items-center w-full py-12 overflow-visible">
      <div className="flex justify-center w-full max-w-[800px] px-4">
        <NotionLinkedInFlow
          title={t("notion_flow_title")}
          circleText="nolin.ai"
          badgeTexts={{
            first: t("notion_flow_create"),
            second: t("notion_flow_schedule"),
            third: t("notion_flow_publish"),
            fourth: t("notion_flow_analyze"),
          }}
          buttonTexts={{
            first: "Notion",
            second: "LinkedIn",
          }}
          lightColor="hsl(var(--primary))"
          className="scale-110"
          animateLines={true}
          fixAnimationTiming={true}
          synchronizeFlowPaths={true}
          improvePathConnections={true}
          enhanceParticleEffect={true}
        />
      </div>
    </div>
  )
}
