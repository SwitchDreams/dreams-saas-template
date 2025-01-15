import { useForm } from "@inertiajs/react";
import { Button, Card, Input, Text } from "@switchdreams/ui";
import React from "react";

const EditProfile = ({ auth: { currentUser } }) => {
  const { data, setData, patch, processing, errors } = useForm({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch("/profile");
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Text as="h1" size="2xl" className="mb-6">
            Edit Profile
          </Text>

          <div className="space-y-4">
            <Input
              label="Name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              error={errors.name}
            />

            <Input
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              error={errors.email}
            />
          </div>

          <Button type="submit" loading={processing}>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;