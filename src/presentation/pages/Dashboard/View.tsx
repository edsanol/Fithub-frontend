"use client";

import CustomTable from "@/presentation/components/CustomTable";
import React from "react";
import ViewModel from "./ViewModel";
import CustomModal from "@/presentation/components/CustomModal";

const Dashboard = () => {
  const {
    handleSetNumPage,
    handleSetTextFilter,
    handleModal,
    handleOpenModal,
    openModal,
    athlete,
    AthleteColumns,
    athleteUser,
  } = ViewModel();

  return (
    <div className="">
      <CustomTable
        onSetNumPage={handleSetNumPage}
        onSetTextFilter={handleSetTextFilter}
        onOpenModal={handleOpenModal}
        records={athlete}
        columns={AthleteColumns}
      />
      <CustomModal
        isOpen={openModal}
        onOpenChange={handleModal}
        data={athleteUser}
      />
    </div>
  );
};

export default Dashboard;
