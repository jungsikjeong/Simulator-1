import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen max-w-md md:max-w-lg lg:max-w-xl mx-auto text-center relative">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
