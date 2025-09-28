import React from "react";
import { Filter } from "@/types/marketplace";
import { Button } from "@/components/ui/Button";
import {
  SlidersHorizontal,
  MonitorSmartphone,
  Database,
  HardDrive,
  Star,
  PackageCheck,
  X,
} from "lucide-react";

interface FilterSidebarProps {
  filters: Filter;
  onFilterChange: (newFilters: Filter) => void;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
}: FilterSidebarProps) {
  const screenSizes = ['13"', '14"', '15"', '17"'];
  const ramOptions = ["4GB", "8GB", "16GB", "32GB"];
  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const conditions = ["A", "B", "C"];

  const handleCheckboxChange = (
    category: keyof Filter,
    value: string | number
  ) => {
    if (category === "quantity") {
      onFilterChange({
        ...filters,
        [category]: typeof value === "string" ? parseInt(value) : value,
      });
      return;
    }

    const currentValues = filters[category] as string[];
    const updatedValues = currentValues.includes(value as string)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value as string];

    onFilterChange({
      ...filters,
      [category]: updatedValues,
    });
  };

  const FilterGroup = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="w-4 h-4 text-blue-500" />
        <h4 className="font-semibold text-blue-700">{title}</h4>
      </div>
      {children}
    </div>
  );

  const hasActiveFilters =
    filters.screenSize.length > 0 ||
    filters.ram.length > 0 ||
    filters.storage.length > 0 ||
    filters.condition.length > 0 ||
    filters.quantity > 1;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-800">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onFilterChange({
                screenSize: [],
                ram: [],
                storage: [],
                condition: [],
                quantity: 1,
              })
            }
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Screen Size */}
      <FilterGroup title="Screen Size" icon={MonitorSmartphone}>
        <div className="flex flex-wrap gap-2">
          {screenSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleCheckboxChange("screenSize", size)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.screenSize.includes(size)
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-blue-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* RAM */}
      <FilterGroup title="RAM" icon={Database}>
        <div className="flex flex-wrap gap-2">
          {ramOptions.map((ram) => (
            <button
              key={ram}
              onClick={() => handleCheckboxChange("ram", ram)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.ram.includes(ram)
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-blue-200"
              }`}
            >
              {ram}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Storage */}
      <FilterGroup title="Storage" icon={HardDrive}>
        <div className="flex flex-wrap gap-2">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              onClick={() => handleCheckboxChange("storage", storage)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filters.storage.includes(storage)
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-blue-200"
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Condition */}
      <FilterGroup title="Condition Grade" icon={Star}>
        <div className="flex gap-2">
          {conditions.map((condition) => (
            <button
              key={condition}
              onClick={() => handleCheckboxChange("condition", condition)}
              className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                filters.condition.includes(condition as "A" | "B" | "C")
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-blue-200"
              }`}
            >
              Grade {condition}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Quantity */}
      <FilterGroup title="Minimum Quantity" icon={PackageCheck}>
        <div className="flex items-center space-x-3">
          <input
            type="range"
            min="1"
            max="20"
            value={filters.quantity}
            onChange={(e) =>
              handleCheckboxChange("quantity", parseInt(e.target.value))
            }
            className="flex-1 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
          <span className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
            {filters.quantity}+
          </span>
        </div>
      </FilterGroup>

      {hasActiveFilters && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="text-sm text-gray-500 mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.screenSize.map((size) => (
              <div
                key={size}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg"
              >
                {size} Screen
              </div>
            ))}
            {filters.ram.map((ram) => (
              <div
                key={ram}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg"
              >
                {ram} RAM
              </div>
            ))}
            {filters.storage.map((storage) => (
              <div
                key={storage}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg"
              >
                {storage} Storage
              </div>
            ))}
            {filters.condition.map((condition) => (
              <div
                key={condition}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg"
              >
                Grade {condition}
              </div>
            ))}
            {filters.quantity > 1 && (
              <div className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg">
                Min {filters.quantity} Units
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
