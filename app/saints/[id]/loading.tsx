import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SaintDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-10 w-32 bg-white/20" />
            <div className="flex gap-2 ml-auto">
              <Skeleton className="h-8 w-8 bg-white/20" />
              <Skeleton className="h-8 w-8 bg-white/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="w-full max-w-sm mx-auto h-96 bg-white/20 rounded-2xl" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4 bg-white/20" />
              <Skeleton className="h-6 w-1/2 bg-white/20" />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full bg-white/20" />
                  <Skeleton className="h-4 w-full bg-white/20" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 bg-white/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-full mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
