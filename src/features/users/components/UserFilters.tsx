import { Input } from "../../../components/Input";

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalResults: number;
}

export const UserFilters = ({
  searchTerm,
  onSearchChange,
  totalResults,
}: UserFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{totalResults}</span> usuario
          {totalResults !== 1 ? "s" : ""} encontrado
          {totalResults !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};
