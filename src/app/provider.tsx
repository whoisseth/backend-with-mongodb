"use client";
import React from "react";
import { SessionProvider, useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  return <SessionProvider>{children} </SessionProvider>;
}
