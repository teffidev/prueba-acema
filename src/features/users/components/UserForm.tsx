import { useState } from "react";
import type { User } from "../../../types";
import { validation } from "../../../utils/validation";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

interface UserFormProps {
  user: User;
  onSubmit: (data: Partial<User["user"]>) => void;
  onCancel: () => void;
}

export const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState({
    firstName: user.user.name.first,
    lastName: user.user.name.last,
    email: user.user.email,
    phone: user.user.phone,
    city: user.user.location.city,
    state: user.user.location.state,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validation.isRequired(formData.firstName)) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!validation.isRequired(formData.lastName)) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!validation.isRequired(formData.email)) {
      newErrors.email = "El email es requerido";
    } else if (!validation.isValidEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!validation.isRequired(formData.phone)) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!validation.isValidPhone(formData.phone)) {
      newErrors.phone = "Teléfono inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ CORRECTO PARA REACT 19
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      name: {
        ...user.user.name,
        first: formData.firstName,
        last: formData.lastName,
      },
      email: formData.email,
      phone: formData.phone,
      location: {
        ...user.user.location,
        city: formData.city,
        state: formData.state,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
          required
        />
        <Input
          label="Apellido"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Teléfono"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={errors.phone}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Ciudad"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
        <Input
          label="Estado"
          value={formData.state}
          onChange={(e) => handleChange("state", e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Cambios</Button>
      </div>
    </form>
  );
};
