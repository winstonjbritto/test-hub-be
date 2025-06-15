import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"

export default function LiturgicalCalendarLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <CommonHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-80 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-96 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Today's Liturgy Skeleton */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="w-full h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-64 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Calendar Skeleton */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Skeletons */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources Skeleton */}
        <Card>
          <CardHeader>
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <CommonFooter />
    </div>
  )
}
