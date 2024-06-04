// app/deal-analyser-1/deals/[docId]/page.jsx
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedLayout from "../../../../components/protected_layout";
import DealFormDynamic from "./dealForm";
import { fetchDealAnalyzerData } from "@/lib/fetchData";

export default function DealAnalyzerItemPage({ params: { docId } }) {
  return (
    <ProtectedLayout>
      <DealAnalyzerItemPageContent docId={docId} />
    </ProtectedLayout>
  );
}

async function DealAnalyzerItemPageContent({ docId }) {
  try {
    const dealAnalyzerData = await fetchDealAnalyzerData(docId);

    return dealAnalyzerData ? (
      <DealFormDynamic initialData={dealAnalyzerData} docId={docId} />
    ) : (
      <div>Deal analyzer not found</div>
    );
  } catch (error) {
    return <div>Error occurred while fetching data</div>;
  }
}

export const Loading = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Skeleton className="h-6 w-1/2 mb-4" />
    <Skeleton className="h-8 w-full mb-4" />
    <Skeleton className="h-8 w-full mb-4" />
    <Skeleton className="h-8 w-full mb-4" />
  </div>
);
