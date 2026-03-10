"use client";

import { useState } from "react";
import AccountSidebar, { AccountTab } from "../../../components/account/AccountSidebar";
import ProfileSection from "../../../components/account/ProfileSection";
import MyListingsSection from "../../../components/account/MyListingsSection";
import SavedListingsSection from "../../../components/account/SavedListingsSection";
import ChangePasswordSection from "../../../components/account/ChangePasswordSection";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "listings":
        return <MyListingsSection />;
      case "saved":
        return <SavedListingsSection />;
      case "password":
        return <ChangePasswordSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row gap-8">
        <AccountSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userName="Long"
          userType="Thành viên"
        />

        <main className="flex-1 min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
