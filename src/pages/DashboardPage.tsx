import { Layout } from "../components/layout/Layout";
import { Spinner } from "../components/Spinner";
import { Pagination } from "../features/users/components/Pagination";
import { UserCard } from "../features/users/components/UserCard";
import { UserFilters } from "../features/users/components/UserFilters";
import { useUsers } from "../features/users/hooks/useUsers";


export const DashboardPage = () => {
  const {
    paginatedUsers,
    filteredUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    setSearchTerm,
    setCurrentPage,
    updateUser,
    deleteUser,
  } = useUsers();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <Spinner size="lg" text="Cargando usuarios..." />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <h3 className="font-semibold mb-2">Error al cargar usuarios</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">
            Administra y gestiona usuarios de manera eficiente
          </p>
        </div>

        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={filteredUsers.length}
        />

        {paginatedUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
                <UserCard
                  key={user.user.email}
                  user={user}
                  onUpdate={updateUser}
                  onDelete={deleteUser}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No se encontraron usuarios
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar tu búsqueda o filtros
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
