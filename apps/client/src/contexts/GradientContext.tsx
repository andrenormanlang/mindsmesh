import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const gradients = [
  "linear-gradient(to bottom, #005f73, #0a9396)",
  "linear-gradient(to bottom, #3a0ca3, #f72585)",
  "linear-gradient(to bottom, #ff7f11, #ff206e)",
  "linear-gradient(to bottom, #4361ee, #4cc9f0)",
];

type GradientContextType = {
  gradientIndex: number;
  toggleGradient: () => void;
  currentGradient: string;
};

const GradientContext = createContext<GradientContextType | undefined>(undefined);

type GradientProviderProps = {
  children: ReactNode;
};

export const GradientProvider: React.FC<GradientProviderProps> = ({ children }) => {
  const [gradientIndex, setGradientIndex] = useState(0);

  const toggleGradient = () => {
    setGradientIndex((prevIndex) => (prevIndex + 1) % gradients.length);
  };

  const currentGradient = gradients[gradientIndex];

  // Effect to apply the current gradient to the body with a smooth transition
  useEffect(() => {
    document.body.style.transition = "background 1s ease-in-out";
    document.body.style.background = currentGradient;
  }, [currentGradient]);

  const value = {
    gradientIndex,
    toggleGradient,
    currentGradient,
  };

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (context === undefined) {
    throw new Error("useGradient must be used within a GradientProvider");
  }
  return context;
};
