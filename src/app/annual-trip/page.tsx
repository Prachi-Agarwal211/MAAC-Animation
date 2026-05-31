import ErrorBoundary from "@/components/ErrorBoundary";
import AnnualTripPage from "../../../annual_trip_page";

export { metadata } from "./metadata";

function AnnualTripPageWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <AnnualTripPage />
    </ErrorBoundary>
  );
}

export default AnnualTripPageWithErrorBoundary;
