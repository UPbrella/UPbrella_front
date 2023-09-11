import FormLocation from "@/components/atoms/Form/FormLocation";

export type FormLocationMoleculesProps = {
  classificationName: string;
  rentStoreName: string;
};

const FormLocationMolecules = ({
  classificationName,
  rentStoreName,
}: FormLocationMoleculesProps) => {
  return (
    <div className="flex w-full justify-start">
      <FormLocation label="지역" isTitle value={classificationName} />
      <FormLocation label="대여지점" value={rentStoreName} />
    </div>
  );
};

export default FormLocationMolecules;
