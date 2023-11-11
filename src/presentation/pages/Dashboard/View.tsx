"use client";

import CustomTable from "@/presentation/components/CustomTable";
import React from "react";
import ViewModel from "./ViewModel";

const Dashboard = () => {
  const { handleSetNumPage, handleSetTextFilter, athlete, AthleteColumns } =
    ViewModel();

  return (
    <div className="">
      <CustomTable
        onSetNumPage={handleSetNumPage}
        onSetTextFilter={handleSetTextFilter}
        records={athlete}
        columns={AthleteColumns}
      />
    </div>
  );
};

export default Dashboard;
