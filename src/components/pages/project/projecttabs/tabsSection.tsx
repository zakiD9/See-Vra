"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface ReusableTabsProps {
  tabs: TabItem[]
  defaultTab?: string
}

export function ReusableTabs({ tabs, defaultTab }: ReusableTabsProps) {
  return (
    <Tabs defaultValue={defaultTab || tabs[0].id} className="w-full">
      <TabsList className="w-full justify-start border-b border-gray-600 bg-transparent rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:border-b-2 mb-1 data-[state=active]:border-blue-500 data-[state=active]:text-white rounded-none px-6 py-2 text-gray-300"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4 text-gray-300">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
