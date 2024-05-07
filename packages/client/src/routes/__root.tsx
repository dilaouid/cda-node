import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Navbar } from '../components/organisms/Navbar'
import { Footer } from '../components/organisms/Footer'

const RootComponent = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
        { process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools /> }
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
