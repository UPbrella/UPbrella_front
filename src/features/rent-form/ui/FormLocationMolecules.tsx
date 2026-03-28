import FormLocation from "@/features/rent-form/ui/FormLocation";
import { useTranslation } from "react-i18next";

type FormLocationMoleculesProps = {
  region: string;
  storeName: string;
};

const FormLocationMolecules = ({ region, storeName }: FormLocationMoleculesProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-start">
      <FormLocation label={t("rent.form.region")} isTitle value={region} />
      <FormLocation label={t("rent.form.rentStore")} value={storeName} />
    </div>
  );
};

export default FormLocationMolecules;
