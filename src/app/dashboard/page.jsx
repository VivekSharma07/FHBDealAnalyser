"use client";
import ProtectedLayout from "../../components/protected_layout";
import { auth } from "../../../firebase/firebaseConfig";
import PrivateRoute from "@/components/PrivateRoute";
import InTheWorksKPI from "./KPIs/InTheWorksKPI";
import CardLayout from "./CardLayout/CardLayout";
import InTheWorksLeads from "./KPIs/InTheWorksLeads";

const Dashboard = () => {
  return (
    <ProtectedLayout>
      {auth.currentUser && (
        <div className="min-h-screen grid grid-cols-[auto_1fr] gap-8 p-8 ">
         
          <div className="shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <div className="space-y-8">
              <CardLayout/>
              <InTheWorksKPI />
              <InTheWorksLeads/>
              {/* Other KPI components */}

            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default function ProtectedDashboard() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}