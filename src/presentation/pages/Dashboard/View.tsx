"use client";

import CustomTable from "@/presentation/components/CustomTable";
import React from "react";
import ViewModel from "./ViewModel";

const Dashboard = () => {
  const {
    handleSubmit,
    handleSetNumPage,
    handleSetNumRecordsPage,
    handleSetTextFilter,
    athlete,
    AthleteColumns,
  } = ViewModel();

  return (
    <div className="">
      <CustomTable
        onSubmit={handleSubmit}
        onSetNumPage={handleSetNumPage}
        onSetNumRecordsPage={handleSetNumRecordsPage}
        onSetTextFilter={handleSetTextFilter}
        records={athlete}
        columns={AthleteColumns}
      />
    </div>
  );
};

export default Dashboard;
