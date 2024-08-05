"use client";

import React, { useState, useEffect } from "react";
import TableComponent from "@/components/table";
import CustomLoader from "@/components/loader";
import { mockData } from "@/lib/data";

// Fetch the data from the API using server side rendering
async function fetchImages(): Promise<{
  data: [];
} | null> {
  const res = await fetch(
    `https://run.mocky.io/v3/69f60a58-3a36-48c5-a9cf-b100b015950c`
  );

  if (!res.ok) {
    console.error("Failed to fetch images:", res.statusText);
    return null;
  }

  const text = await res.text();

  // Safely evaluate the JavaScript code
  const evaluatedData = new Function(`
          ${text}
          return mockData;
        `)();

  return evaluatedData;
}

// Fetch data from the API and display it in a table using client side rendering
export default function SearchableEmployeeTable() {
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/69f60a58-3a36-48c5-a9cf-b100b015950c"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();

        // Safely evaluate the JavaScript code
        const evaluatedData = new Function(`
          ${text}
          return mockData;
        `)();

        setEmployeeData(evaluatedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch employee data");
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // Use this when fetching data from the api and replace mockData with employeeData

  // if (isLoading) return <CustomLoader />;
  // if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Data Report</h1>
      <TableComponent data={mockData} />
    </div>
  );
}
