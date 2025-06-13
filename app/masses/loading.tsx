import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"

export default function MassScheduleLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-10" />
              </div>

              <Skeleton className="h-10 w-[180px]" />
            </div>
          </div>

          <Skeleton className="h-10 w-full max-w-md mb-6" />

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-purple-200 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <Skeleton className="h-7 w-64 mb-2" />
                      <Skeleton className="h-4 w-80" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <Skeleton className="h-5 w-72 mb-4" />
                      <div className="space-y-3">
                        {[1, 2].map((j) => (
                          <Skeleton key={j} className="h-24 w-full" />
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <CommonFooter />
    </div>
  )
}
