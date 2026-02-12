import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import React, { createContext, useEffect, useState } from "react";

const alertContextDefaultValue = {
  showAlert: () => {},
};

export const AlertContext = createContext(alertContextDefaultValue);

export const AlertProvider = ({ children }) => {
  const [content, setContent] = useState({
    title: "",
    message: "",
    type: "error",
  });
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Displays an alert with specified message, title, and type.
   * @param {Object} options - Options for displaying the alert.
   * @param {string} options.message - The alert message.
   * @param {?string} options.title - The alert title (optional).
   * @param {("primary"|"success"|"warning"|"error")} [options.type="error"] - The alert type (optional, default: "error").
   * @returns {void}
   */
  const showAlert = ({ message, title = null, type = "error" }) => {
    setContent({
      title,
      message,
      type,
    });
    if (message !== "") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);

  const { errors } = usePage().props;

  useEffect(() => {
    if (errors) showAlert({ message: errors });
  }, [errors]);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
      }}
    >
      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed right-4 top-4 z-50">
          <div
            className={`flex items-center gap-3 rounded-lg border p-4 shadow-lg ${
              content.type === "error"
                ? "border-red-200 bg-red-50 text-red-900"
                : content.type === "success"
                  ? "border-green-200 bg-green-50 text-green-900"
                  : content.type === "warning"
                    ? "border-yellow-200 bg-yellow-50 text-yellow-900"
                    : "border-blue-200 bg-blue-50 text-blue-900"
            }`}
          >
            <div className="flex-1">
              {content.title && <p className="font-semibold">{content.title}</p>}
              <p className="text-sm">{content.message}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-current opacity-70 hover:opacity-100"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};
