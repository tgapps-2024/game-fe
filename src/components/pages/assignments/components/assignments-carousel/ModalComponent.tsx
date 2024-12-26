import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode; // Изменяем тип на React.ReactNode для поддержки любого контента
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md translate-y-0 transform rounded-t-lg bg-white p-5 shadow-lg transition-transform">
        <h2 className="text-lg font-bold">Содержимое слайда</h2>
        <div>{content}</div>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-blue-500 p-2 text-white"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
