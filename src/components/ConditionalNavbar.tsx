"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const hide = pathname.startsWith("/dashboard") || pathname.startsWith("/login");
  if (hide) return null;
  return <Navbar />;
}
