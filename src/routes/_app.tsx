import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center p-6'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
