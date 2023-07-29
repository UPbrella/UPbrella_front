import FormLocation from "@/components/atoms/Form/FormLocation";

export type FormLocationMoleculesProps = {
  label: string;
};

const FormLocationMolecules = ({ label }: FormLocationMoleculesProps) => {
  return (
    <div className="flex w-full justify-start">
      <FormLocation label="지역" isTitle />
      <FormLocation label={label} />
    </div>
  );
};

export default FormLocationMolecules;
