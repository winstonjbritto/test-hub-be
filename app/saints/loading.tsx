import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SaintsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-16 w-3/4 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-8 w-2/3 mx-auto mb-8 bg-white/20" />
            <Skeleton className="h-14 w-full max-w-2xl mx-auto bg-white/20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="space-y-2 mb-4">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
