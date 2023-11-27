"use client"
import { DocumentGrid } from "@/components/cards/DocumentGrid"
import { SettingsBar } from '@/components/settings/SettingsBar'
import { Separator } from '@/components/ui/separator'

export default function Page() {

  return (
    <section className="flex flex-col w-full min-h-[100vh] items-center bg-muted">
      <SettingsBar />
      <Separator className="w-full max-w-6xl" />
      <DocumentGrid />
    </section>
  )
}
