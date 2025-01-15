import { Badge } from "@switchdreams/ui";
import React from "react";

export const SubscriptionBadge = ({ status }) => {
  const getBadgeProps = () => {
    switch (status) {
      case "active":
        return {
          label: "Ativa",
          className:
            "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20",
        };
      case "canceled":
        return {
          label: "Cancelada",
          className:
            "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20",
        };
      default:
        return {
          label: "Sem assinatura",
          className:
            "bg-gray-50 text-gray-600 ring-gray-500/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-400/20",
        };
    }
  };

  const { label, className } = getBadgeProps();

  return (
    <Badge
      label={label}
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    />
  );
};

SubscriptionBadge.displayName = "SubscriptionBadge";
