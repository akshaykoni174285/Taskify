"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";


export default function SignupPage() {
  return <AuthForm type="signup"/>
}
