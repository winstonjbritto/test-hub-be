export default function EditChurchLoading() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-purple-200 rounded animate-pulse" />
          <div className="w-32 h-8 bg-purple-200 rounded animate-pulse" />
          <div>
            <div className="w-48 h-8 bg-purple-200 rounded animate-pulse mb-2" />
            <div className="w-64 h-4 bg-purple-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="w-32 h-10 bg-purple-200 rounded animate-pulse" />
      </div>

      <div className="space-y-6">
        <div className="w-full h-12 bg-purple-100 rounded animate-pulse" />
        <div className="w-full h-96 bg-white border border-purple-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}
