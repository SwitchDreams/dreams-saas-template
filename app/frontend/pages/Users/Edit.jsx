import { Button, Card, Input, Link, Text } from "@switchdreams/ui";
      </Card>

      <Card className="mt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Text as="h2" size="xl">
                Subscription
              </Text>
              <SubscriptionBadge status={currentUser.subscription_status} />
            </div>
            <Button
              as={Link}
              href="/subscriptions"
              variant="secondary"
            >
              Manage Subscription
            </Button>
          </div>
        </div>
