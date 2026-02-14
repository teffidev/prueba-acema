import { useState } from "react";
import { UserForm } from "./UserForm";
import type { User } from "../../../types";
import { userService } from "../services/useServices";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";


interface UserCardProps {
  user: User;
  onUpdate: (email: string, data: Partial<User["user"]>) => void;
  onDelete: (email: string) => void;
}

export const UserCard = ({ user, onUpdate, onDelete }: UserCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const displayName = userService.getDisplayName(user);
  const location = userService.getLocation(user);

  const handleDelete = () => {
    onDelete(user.user.email);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={user.user.picture.large}
              alt={displayName}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary-200"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {user.user.email}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="truncate">{user.user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => setIsEditModalOpen(true)}>
              Editar
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="flex-1"
              onClick={() => setIsDeleteModalOpen(true)}>
              Eliminar
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Usuario"
        size="lg">
        <UserForm
          user={user}
          onSubmit={(data: Partial<User["user"]>) => {
            onUpdate(user.user.email, data);
            setIsEditModalOpen(false);
          }}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </>
        }>
        <p className="text-gray-700">
          ¿Estás seguro de que deseas eliminar a{" "}
          <span className="font-semibold">{displayName}</span>?
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Esta acción no se puede deshacer.
        </p>
      </Modal>
    </>
  );
};
