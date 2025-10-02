"use client";

import HeroSection from "@/components/hero-section";
import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { userId } = useAuth();
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser)

  useEffect(() => {
    console.log("userid",userId)
    if (userId && user) {
      createUser({
        clerkId: userId,
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        proUser: !!user.publicMetadata.proUser,
      });
    }
  }, [userId, user]);

  return <HeroSection />;
}