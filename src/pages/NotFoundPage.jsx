import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-9xl font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-2xl leading-7">¡Lo lamentamos!</p>
        <p className=" mt-1 text-base leading-7">El recurso que buscas parece no estar disponible.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md text-gray-200 bg-blue-700 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Regresar al inicio
          </Link>
          <a
            href="mailto:braulioecheverria@kinal.edu.gt?subject=Necesito%20ayuda"
            className="text-sm font-semibold text-blue-600"
          >
            Contactar a soporte <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

