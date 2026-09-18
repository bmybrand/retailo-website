"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { FeatureId } from "@/lib/features";

type FeatureSelection = {
  active: FeatureId;
  setActive: (feature: FeatureId) => void;
};

const FeatureSelectionContext = createContext<FeatureSelection | null>(null);

export function FeatureSelectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<FeatureId>("products");

  return (
    <FeatureSelectionContext.Provider value={{ active, setActive }}>
      {children}
    </FeatureSelectionContext.Provider>
  );
}

export function useFeatureSelection() {
  const selection = useContext(FeatureSelectionContext);
  if (!selection) throw new Error("FeatureSelectionProvider is missing");
  return selection;
}
