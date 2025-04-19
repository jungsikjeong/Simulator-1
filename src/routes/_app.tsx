import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-md md:max-w-lg lg:max-w-xl mx-auto text-center relative">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
