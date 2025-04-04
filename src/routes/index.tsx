import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div>
      <h1 className='text-4xl font-bold text-red-500'>Hello World</h1>
    </div>
  );
}
