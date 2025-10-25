import { redirect } from "next/navigation";

export default function MainHome() {
  // Middleware will handle authentication check
  // If user reaches here and is authenticated, redirect to dashboard
  redirect("/dashboard");
}
