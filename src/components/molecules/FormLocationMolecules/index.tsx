import FormLocation from "@/components/atoms/Form/FormLocation";

export type FormLocationMoleculesProps = {
  region: string;
  storeName: string;
};

const FormLocationMolecules = ({ region, storeName }: FormLocationMoleculesProps) => {
  return (
    <div className="flex w-full justify-start">
      <FormLocation label="지역" isTitle value={region} />
      <FormLocation label="대여지점" value={storeName} />
    </div>
  );
};

export default FormLocationMolecules;
