"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Navbar from "@/components/navbar";
import HeroEdit from "@/sections/admin/heroEdit";
import LabourEdit from "@/sections/admin/labourEdit";
import FundEdit from "@/sections/admin/fundEdit";
import NavbarEdit from "@/components/admin/navbarEdit";
import JoinEdit from "@/components/admin/joinEdit";
import MembershipEdit from "@/components/admin/membershipEdit";
import MembershipFormEdit from "@/components/admin/membershipFormEdit";
import VisionEdit from "@/components/admin/visionEdit";
import StrategyEdit from "@/components/admin/strategyEdit";
import SignupEdit from "@/components/admin/signup";
import PrivacyEdit from "@/components/admin/privacyEdit";
import DonationEdit from "@/components/admin/donationEdit";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading)
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <h1 className="text-center text-4xl animate-pulse">Loading...</h1>
      </div>
    );

  return (
    <div>
      <Navbar buttons={false} />
      <h2 className="text-4xl text-center mt-10">Navbar</h2>
      <NavbarEdit />
      <h2 className="text-4xl text-center mt-10">Landing Page</h2>
      <HeroEdit />
      <LabourEdit />
      <FundEdit />
      <h2 className="text-4xl text-center mt-10">Join Page</h2>
      <JoinEdit />
      <h2 className="text-4xl text-center mt-10">What Is Membership Page</h2>
      <MembershipEdit />
      <h2 className="text-4xl text-center mt-10">Membership Form</h2>
      <MembershipFormEdit />
      <h2 className="text-4xl text-center mt-10">Vision</h2>
      <VisionEdit />
      <h2 className="text-4xl text-center mt-10">Strategy</h2>
      <StrategyEdit />
      <h2 className="text-4xl text-center mt-10">Signup</h2>
      <SignupEdit />
      <h2 className="text-4xl text-center mt-10">Privacy</h2>
      <PrivacyEdit />
      <h2 className="text-4xl text-center mt-10">Donation</h2>
      <DonationEdit />
    </div>
  );
}
