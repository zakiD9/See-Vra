"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

interface TabItem {
  feature: string
  description: string
}

interface ReusableTabsProps {
  tabs: TabItem[]
  defaultTab?: string
}

export function ReusableTabs({ tabs, defaultTab }: ReusableTabsProps) {
  if (!tabs || tabs.length === 0) {
    return <p className="text-gray-400">No features available.</p>
  }

  return (
    <Tabs defaultValue={defaultTab || tabs[0].feature} className="w-full">
      <TabsList className="w-full justify-start border-b border-gray-600 bg-transparent rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.feature}
            value={tab.feature}
            className="data-[state=active]:border-b-2 mb-1 data-[state=active]:border-blue-500 data-[state=active]:text-white rounded-none px-6 py-2 text-gray-300"
          >
            {tab.feature}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.feature} value={tab.feature} className="mt-4 text-gray-300">
          <p>{tab.description}</p>
        </TabsContent>
      ))}
    </Tabs>
  )
}

