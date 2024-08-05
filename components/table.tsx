import { TableTypes } from "@/lib/types";
import React, { useState, useMemo } from "react";
import SearchBar from "./search";
import FilterDrawer from "./drawer";
import { Button } from "@mui/material";

interface TableComponentProps {
  data: TableTypes[];
}

interface FilterConfig {
  column: keyof TableTypes;
  type: string;
  value: string;
  value2?: string;
  isNull?: boolean;
}

export default function TableComponent({ data }: TableComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableTypes;
    direction: "asc" | "desc" | null;
  }>({ key: "id", direction: null });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<keyof TableTypes | null>(
    null
  );
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  const columnTypes: Record<keyof TableTypes, string> = {
    id: "integer",
    name: "string",
    age: "integer",
    role: "string",
    department: "string",
    salary: "integer",
    isActive: "boolean",
    hireDate: "date",
    projectsCompleted: "integer",
    lastLogin: "date",
    accessLevel: "string",
  };

  const sortedAndFilteredData = useMemo(() => {
    let processedData = [...data];

    // Apply filters
    filters.forEach((filter) => {
      processedData = processedData.filter((item) => {
        const value = item[filter.column];

        // Handle date comparisons
        if (columnTypes[filter.column] === "date") {
          const itemDate = new Date(value as string);
          const filterDate = new Date(filter.value);
          const filterDate2 = filter.value2 ? new Date(filter.value2) : null;

          switch (filter.type) {
            case "equals":
              return itemDate.toDateString() === filterDate.toDateString();
            case "notEqual":
              return itemDate.toDateString() !== filterDate.toDateString();
            case "lessThan":
              return itemDate < filterDate;
            case "lessOrEqual":
              return itemDate <= filterDate;
            case "greaterThan":
              return itemDate > filterDate;
            case "greaterOrEqual":
              return itemDate >= filterDate;
            case "dateRange":
              return filterDate2
                ? itemDate >= filterDate && itemDate <= filterDate2
                : true;
            case "isNull":
              return value === null || value === undefined;
            case "isNotNull":
              return value !== null && value !== undefined;
            default:
              return true;
          }
        }

        // Handle other types of comparisons
        switch (filter.type) {
          case "equals":
            return value == filter.value;
          case "notEqual":
            return value != filter.value;
          case "lessThan":
            return value < filter.value;
          case "lessOrEqual":
            return value <= filter.value;
          case "greaterThan":
            return value > filter.value;
          case "greaterOrEqual":
            return value >= filter.value;
          case "range":
            return (
              value >= filter.value && value <= (filter.value2 || filter.value)
            );
          case "contains":
            return String(value)
              .toLowerCase()
              .includes(filter.value.toLowerCase());
          case "notContains":
            return !String(value)
              .toLowerCase()
              .includes(filter.value.toLowerCase());
          case "startsWith":
            return String(value)
              .toLowerCase()
              .startsWith(filter.value.toLowerCase());
          case "endsWith":
            return String(value)
              .toLowerCase()
              .endsWith(filter.value.toLowerCase());
          case "isNull":
            return value === null || value === undefined;
          case "isNotNull":
            return value !== null && value !== undefined;
          case "in":
            return filter.value.split(",").includes(String(value));
          case "notIn":
            return !filter.value.split(",").includes(String(value));
          default:
            return true;
        }
      });
    });

    // Apply sorting
    if (sortConfig.direction) {
      processedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Apply search
    return processedData.filter((employee) =>
      Object.values(employee).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, sortConfig, filters]);

  const sortData = (key: keyof TableTypes) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof TableTypes) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "↑";
  };

  const openDrawer = (column: keyof TableTypes) => {
    setActiveColumn(column);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setActiveColumn(null);
  };

  const applyFilter = (filterConfig: FilterConfig) => {
    setFilters((prevFilters) => {
      // Remove any existing filter for this column
      const updatedFilters = prevFilters.filter(
        (f) => f.column !== filterConfig.column
      );
      // Add the new filter
      return [...updatedFilters, filterConfig];
    });
    closeDrawer();
  };

  const resetFilter = (column?: keyof TableTypes) => {
    if (column) {
      // Reset filter for a specific column
      setFilters((prevFilters) =>
        prevFilters.filter((f) => f.column !== column)
      );
    } else {
      // Reset all filters
      setFilters([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button
          variant="outlined"
          onClick={() => resetFilter()}
          disabled={filters.length === 0}
        >
          Reset All Filters
        </Button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {[
              "id",
              "name",
              "age",
              "role",
              "department",
              "salary",
              "isActive",
              "hireDate",
              "lastLogin",
            ].map((key) => (
              <th key={key} className="px-4 py-2 border">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openDrawer(key as keyof TableTypes)}
                    className="text-left font-bold hover:underline"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                    {filters.some((f) => f.column === key) && "🔍"}
                  </button>
                  <div>
                    <button
                      onClick={() => sortData(key as keyof TableTypes)}
                      className="px-1"
                    >
                      {getSortIcon(key as keyof TableTypes)}
                    </button>
                    {filters.some((f) => f.column === key) && (
                      <button
                        onClick={() => resetFilter(key as keyof TableTypes)}
                        className="text-red-500 text-sm ml-1"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.map((employee) => (
            <tr key={employee.id}>
              <td className="px-4 py-2 border">{employee.id}</td>
              <td className="px-4 py-2 border">{employee.name}</td>
              <td className="px-4 py-2 border">{employee.age}</td>
              <td className="px-4 py-2 border">{employee.role}</td>
              <td className="px-4 py-2 border">{employee.department}</td>
              <td className="px-4 py-2 border">
                ${employee.salary.toLocaleString()}
              </td>
              <td className="px-4 py-2 border">
                {employee.isActive ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 border">
                {formatDate(employee.hireDate)}
              </td>
              <td className="px-4 py-2 border">
                {formatDate(employee.lastLogin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        column={activeColumn}
        onApplyFilter={applyFilter}
        columnType={activeColumn ? columnTypes[activeColumn] : ""}
      />
    </>
  );
}