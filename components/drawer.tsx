import React, { useState, useEffect } from "react";
import { TableTypes } from "@/lib/types";
import {
  Drawer,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  column: keyof TableTypes | null;
  onApplyFilter: (filterConfig: any) => void;
  columnType: string;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  column,
  onApplyFilter,
  columnType,
}: FilterDrawerProps) {
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterValue2, setFilterValue2] = useState("");
  const [isNull, setIsNull] = useState(false);

  useEffect(() => {
    setFilterType("");
    setFilterValue("");
    setFilterValue2("");
    setIsNull(false);
  }, [column]);

  const handleApplyFilter = () => {
    onApplyFilter({
      column,
      type: filterType,
      value: filterValue,
      value2: filterValue2,
      isNull: isNull,
    });
    onClose();
  };

  const renderFilterOptions = () => {
    switch (columnType) {
      case "integer":
        return (
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="lessThan">Less than</MenuItem>
            <MenuItem value="lessOrEqual">Less than or equal</MenuItem>
            <MenuItem value="greaterThan">Greater than</MenuItem>
            <MenuItem value="greaterOrEqual">Greater than or equal</MenuItem>
            <MenuItem value="range">Range</MenuItem>
            <MenuItem value="notEqual">Not equal</MenuItem>
          </Select>
        );
      case "string":
        return (
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value="contains">Contains</MenuItem>
            <MenuItem value="notContains">Not contains</MenuItem>
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="notEqual">Not equal</MenuItem>
            <MenuItem value="startsWith">Starts with</MenuItem>
            <MenuItem value="endsWith">Ends with</MenuItem>
            <MenuItem value="isNull">Is null</MenuItem>
            <MenuItem value="isNotNull">Is not null</MenuItem>
          </Select>
        );
      case "datetime":
      case "date":
        return (
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="notEqual">Not equal</MenuItem>
            <MenuItem value="lessThan">Before</MenuItem>
            <MenuItem value="lessOrEqual">Before or on</MenuItem>
            <MenuItem value="greaterThan">After</MenuItem>
            <MenuItem value="greaterOrEqual">After or on</MenuItem>
            <MenuItem value="dateRange">Date range</MenuItem>
            <MenuItem value="isNull">Is null</MenuItem>
            <MenuItem value="isNotNull">Is not null</MenuItem>
          </Select>
        );
      case "enum":
        return (
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value="in">In</MenuItem>
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="notEqual">Not equal</MenuItem>
            <MenuItem value="notIn">Not in</MenuItem>
            <MenuItem value="isNull">Is null</MenuItem>
          </Select>
        );
      case "boolean":
        return (
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value="isNull">Is null</MenuItem>
            <MenuItem value="isNotNull">Is not null</MenuItem>
            <MenuItem value="equals">Equals</MenuItem>
          </Select>
        );
      default:
        return null;
    }
  };

  const renderFilterInputs = () => {
    if (["isNull", "isNotNull"].includes(filterType)) {
      return null;
    }

    switch (columnType) {
      case "integer":
        if (filterType === "range") {
          return (
            <>
              <TextField
                label="From"
                type="number"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <TextField
                label="To"
                type="number"
                value={filterValue2}
                onChange={(e) => setFilterValue2(e.target.value)}
              />
            </>
          );
        }
        return (
          <TextField
            label="Value"
            type="number"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        );
      case "string":
        return (
          <TextField
            label="Value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        );
      case "datetime":
      case "date":
        if (filterType === "dateRange") {
          return (
            <>
              <TextField
                label="From"
                type="date"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="To"
                type="date"
                value={filterValue2}
                onChange={(e) => setFilterValue2(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </>
          );
        }
        return (
          <TextField
            label="Value"
            type="date"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        );
      case "enum":
        const enumValues = [
          "Engineer",
          "Intern",
          "Director",
          "Designer",
          "Manager",
          "Senior Manager",
          "Product Manager",
        ]; 
        return (
          <Select
            multiple={filterType === "in" || filterType === "notIn"}
            value={
              filterType === "in" || filterType === "notIn"
                ? filterValue.split(",")
                : filterValue
            }
            onChange={(e) =>
              setFilterValue(
                Array.isArray(e.target.value)
                  ? e.target.value.join(",")
                  : e.target.value
              )
            }
          >
            {enumValues.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        );
      case "boolean":
        return (
          <Select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <h1 className="text-2xl font-bold mb-4">Filter - {column}</h1>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Filter Type</InputLabel>
          {renderFilterOptions()}
        </FormControl>

        {renderFilterInputs()}

        {["isNull", "isNotNull"].includes(filterType) && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isNull}
                onChange={(e) => setIsNull(e.target.checked)}
              />
            }
            label="Is Null"
          />
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleApplyFilter}
            sx={{ mr: 1 }}
          >
            Apply Filter
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
