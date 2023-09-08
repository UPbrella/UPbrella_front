import FormLocation from "@/components/atoms/Form/FormLocation";

export type FormLocationMoleculesProps = {
  location: string;
  storeName: string;
};

const FormLocationMolecules = ({ location, storeName }: FormLocationMoleculesProps) => {
  return (
    <div className="flex w-full justify-start">
      <FormLocation label="지역" isTitle value={location} />
      <FormLocation label="대여지점" value={storeName} />
    </div>
  );
};

export default FormLocationMolecules;
