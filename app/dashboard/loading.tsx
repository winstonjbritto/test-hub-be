import { Skeleton } from "@/components/ui/skeleton"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <>
      <CommonHeader />
      <main className="container mx-auto py-6 px-4">
        {/* Welcome Banner Skeleton */}
        <div className="bg-gradient-to-r from-purple-600/80 to-purple-800/80 rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-6">
            <div className="flex-1">
              <Skeleton className="h-8 w-3/4 bg-white/20 mb-2" />
              <Skeleton className="h-4 w-full bg-white/20 mb-2" />
              <Skeleton className="h-4 w-5/6 bg-white/20 mb-4" />
              <div className="flex gap-3">
                <Skeleton className="h-9 w-28 bg-white/20" />
                <Skeleton className="h-9 w-28 bg-white/20" />
                <Skeleton className="h-9 w-28 bg-white/20" />
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
              <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            <Skeleton className="h-10 rounded-md bg-gray-200" />
            <Skeleton className="h-10 rounded-md bg-gray-200" />
            <Skeleton className="h-10 rounded-md bg-gray-200" />
            <Skeleton className="h-10 rounded-md bg-gray-200" />
          </div>

          {/* Quick Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-purple-100" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    <Skeleton className="h-6 w-8 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Mass Skeleton */}
          <Card className="mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-gray-200 mb-2" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-purple-100" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48 bg-gray-200" />
                    <Skeleton className="h-4 w-32 bg-gray-200" />
                    <Skeleton className="h-4 w-40 bg-gray-200" />
                    <Skeleton className="h-4 w-56 bg-gray-200" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Skeleton className="h-9 w-24 bg-gray-200" />
                  <Skeleton className="h-9 w-36 bg-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-40 bg-gray-200" />
                    <Skeleton className="h-8 w-20 bg-gray-200" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {[1, 2].map((j) => (
                      <div key={j} className="flex items-start gap-3 p-4">
                        <Skeleton className="w-12 h-12 rounded bg-gray-200" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full bg-gray-200" />
                          <Skeleton className="h-3 w-5/6 bg-gray-200" />
                          <Skeleton className="h-3 w-24 bg-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  )
}
