import { Skeleton } from "@/components/ui/skeleton"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <>
      <CommonHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-56" />
              </div>
              <Skeleton className="h-9 w-32" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-b p-4">
              <div className="flex gap-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>

            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 border-b">
                <div className="flex gap-4">
                  <Skeleton className="h-5 w-5 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
      <CommonFooter />
    </>
  )
}
