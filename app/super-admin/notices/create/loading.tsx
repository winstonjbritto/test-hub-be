import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CreateNoticeLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-32" />
      </div>
      
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            <div className="grid gap-2">
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-32 w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
              
              <div className="grid gap-2">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
              
              <div className="grid gap-2">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <Skeleton className="h-6 w-40 mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-10 w-full" />
                </div>
                
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
                
                <div\
