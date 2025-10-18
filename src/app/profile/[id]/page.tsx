import React from "react";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id }: { id: string } = await params;
  return <div>UserProfile: {id}</div>;
}
