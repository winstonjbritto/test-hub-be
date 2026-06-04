import { ReactNode } from "react"

interface SplitLayoutProps {
  leftPanel: ReactNode
  rightPanel: ReactNode
}

export function SplitLayout({ leftPanel, rightPanel }: SplitLayoutProps) {
  return (
    <div className="flex h-full gap-6">
      {/* Left Panel - Filter/Search */}
      <div className="w-64 flex-shrink-0 overflow-y-auto border-r">{leftPanel}</div>

      {/* Right Panel - Content */}
      <div className="flex-1 overflow-y-auto">{rightPanel}</div>
    </div>
  )
}
