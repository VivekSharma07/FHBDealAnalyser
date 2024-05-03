import ProtectedLayout from "../../components/protected_layout";
import DealAnalyserForm from "./dealForm";
import TestDealAnalyserForm from "./TestDealForm";
const Dashboard = () => {
  return <ProtectedLayout>

<TestDealAnalyserForm/>

  </ProtectedLayout>;
};

export default Dashboard;
