import DashboardLayout from './dashboardlayout';
import StatsCards from './statscard';
import UsersTable from './userstable';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <StatsCards />
        <UsersTable />
      </div>
    </DashboardLayout>
  );
}