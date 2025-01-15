import { useForm } from "@inertiajs/react";
import { Button, Card, Text } from "@switchdreams/ui";
import React from "react";

import { SubscriptionBadge } from "@/components/SubscriptionBadge";

const SubscriptionIndex = ({ auth: { currentUser } }) => {
  const { post, delete: destroy, processing } = useForm();

  const handleSubscribe = () => {
    post("/subscriptions");
  };

  const handleCancel = () => {
    destroy("/subscriptions/cancel");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderSubscriptionDetails = () => {
    switch (currentUser.subscription_status) {
      case "none":
        return (
          <div className="space-y-4">
            <Text className="text-gray-600">
              Assine agora para ter acesso a todos os recursos premium da plataforma.
            </Text>
            <div className="flex items-center space-x-2">
              <Text className="font-semibold">R$ 10,00/mês</Text>
            </div>
            <Button
              variant="primary"
              onClick={handleSubscribe}
              loading={processing}
              className="w-full md:w-auto"
            >
              Assinar agora
            </Button>
          </div>
        );

      case "active":
        return (
          <div className="space-y-4">
            <Text className="text-gray-600">
              Sua assinatura está ativa. Aproveite todos os recursos premium!
            </Text>
            {currentUser.subscription_ends_at && (
              <Text className="text-gray-600">
                Próxima renovação: {formatDate(currentUser.subscription_ends_at)}
              </Text>
            )}
            <Button
              variant="secondary"
              onClick={handleCancel}
              loading={processing}
              className="w-full md:w-auto"
            >
              Cancelar assinatura
            </Button>
          </div>
        );

      case "canceled":
        return (
          <div className="space-y-4">
            <Text className="text-gray-600">
              Sua assinatura foi cancelada e permanecerá ativa até{" "}
              {formatDate(currentUser.subscription_ends_at)}.
            </Text>
            <Button
              variant="primary"
              onClick={handleSubscribe}
              loading={processing}
              className="w-full md:w-auto"
            >
              Renovar assinatura
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Text as="h1" size="2xl">
              Gerenciar Assinatura
            </Text>
            <SubscriptionBadge status={currentUser.subscription_status} />
          </div>
          {renderSubscriptionDetails()}
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionIndex;
