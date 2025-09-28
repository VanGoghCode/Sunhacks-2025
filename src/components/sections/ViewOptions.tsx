import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Grid2x2,
  LayoutList,
  SlidersHorizontal,
} from "lucide-react";

interface ViewOptionsProps {
  viewMode: "grid" | "list";
  sortBy: "name" | "rating" | "condition";
  onViewModeChange: (mode: "grid" | "list") => void;
  onSortChange: (sort: "name" | "rating" | "condition") => void;
  totalDevices: number;
}

export default function ViewOptions({
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
  totalDevices,
}: ViewOptionsProps) {
  return (
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-3 mb-6">
      <div className="text-sm text-blue-600">
        {totalDevices} devices available
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-blue-50 rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={`px-2 ${viewMode === "grid" ? "bg-white shadow" : ""}`}
          >
            <Grid2x2 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={`px-2 ${viewMode === "list" ? "bg-white shadow" : ""}`}
          >
            <LayoutList className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "name" | "rating" | "condition")
            }
            className="text-sm bg-transparent border-none focus:ring-0 text-blue-600 pr-8"
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="condition">Condition</option>
          </select>
        </div>
      </div>
    </div>
  );
}
