import AboutClient from "./AboutClient";
import ErrorBoundary from "@/components/ErrorBoundary";

export { metadata } from "./metadata";

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <AboutClient />
    </ErrorBoundary>
  );
}
