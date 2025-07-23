import { createContext, useContext, useState } from "react";

export type Hospital = {
  id: string;
  label: string;
};

type HospitalMultiSelectContextType = {
  selectedHospitals: (Hospital | null)[];
  setSelectedHospitals: React.Dispatch<
    React.SetStateAction<(Hospital | null)[]>
  >;
};

const HospitalMultiselectContext = createContext<
  HospitalMultiSelectContextType | undefined
>(undefined);

export const HospitalMultiselectProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedHospitals, setSelectedHospitals] = useState<
    (Hospital | null)[]
  >([null, null, null]);

  return (
    <HospitalMultiselectContext.Provider
      value={{ selectedHospitals, setSelectedHospitals }}
    >
      {children}
    </HospitalMultiselectContext.Provider>
  );
};

export const useHospitalMultiselect = () => {
  const context = useContext(HospitalMultiselectContext);
  if (!context) {
    throw new Error(
      "useHospitalMultiselect must be used within a HospitalMultiselectProvider",
    );
  }
  return context;
};
