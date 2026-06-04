"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterSidebarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filters?: {
    title: string
    options: FilterOption[]
    selectedValues: string[]
    onFilterChange: (value: string) => void
  }[]
  onReset?: () => void
}

export function FilterSidebar({
  searchTerm,
  onSearchChange,
  filters = [],
  onReset,
}: FilterSidebarProps) {
  return (
    <Card className="p-4 space-y-6 rounded-none border-0 border-r">
      {/* Search Bar */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      {filters.map((filter, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-sm font-semibold">{filter.title}</h3>
          <div className="space-y-2">
            {filter.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.selectedValues.includes(option.value)}
                  onChange={() => filter.onFilterChange(option.value)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm flex-1">{option.label}</span>
                {option.count !== undefined && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {option.count}
                  </Badge>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Reset Button */}
      {onReset && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </Card>
  )
}
