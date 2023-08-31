import FormLocation from "@/components/atoms/Form/FormLocation";

export type FormLocationMoleculesProps = {
  label: string;
  location: string;
  storeName: string;
};

const FormLocationMolecules = ({ label, location, storeName }: FormLocationMoleculesProps) => {
  return (
    <div className="flex w-full justify-start">
      <FormLocation label="지역" isTitle value={location} />
      <FormLocation label={label} value={storeName} />
    </div>
  );
};

export default FormLocationMolecules;
