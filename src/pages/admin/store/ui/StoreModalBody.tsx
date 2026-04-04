import StoreFormWrapper from "@/pages/admin/store/ui/StoreFormWrapper";
import { TStoreBusinessHours, TStoreParams } from "@/entities/store/model/types";
import { Button, TextField, TextareaAutosize, Typography } from "@mui/material";
import SelectBox from "@/shared/ui/SelectBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSelectItems } from "@/shared/lib/select-box";
import { DAY_OF_WEEK } from "@/shared/constants/date";
import {
  createClassificationsOptions,
  getFilterBusinessTime,
} from "@/features/admin-store/lib/store-helpers";
import { TDayOfWeek } from "@/shared/model/types";
import {
  useGetClassifications,
  useGetStoreBusinessHours,
  useGetSubClassifications,
} from "@/entities/store/api/store.queries";
import StoreAddressInput from "@/pages/admin/store/ui/StoreAddressInput";

type TProps = {
  storeData: TStoreParams;
  setStoreData: Dispatch<SetStateAction<TStoreParams>>;
  onChangeStoreData: (e: {
    target: { name: string; value: string | number | null | TStoreBusinessHours[] };
  }) => void;
  selectedStoreId?: number;
};

const StoreModalContents = ({
  storeData,
  setStoreData,
  onChangeStoreData,
  selectedStoreId,
}: TProps) => {
  const { t } = useTranslation();
  const [dayInputState, setDayInputState] = useState<TStoreBusinessHours>({
    date: "MONDAY",
    openAt: "11:00",
    closeAt: "20:00",
  });

  // server
  const { data: classifiRes } = useGetClassifications();
  const { data: subClassifiRes } = useGetSubClassifications();
  const {
    data: businessHoursRes,
    isLoading: isBusinessHLoading,
    isError: isBusinessHError,
    refetch: refetchBusinessH,
  } = useGetStoreBusinessHours(selectedStoreId ?? 0);

  useEffect(() => {
    if (businessHoursRes) {
      setStoreData((prev) => ({
        ...prev,
        businessHours: businessHoursRes,
      }));
    }
  }, [businessHoursRes, setStoreData]);

  const classifiOptions = createClassificationsOptions(classifiRes);
  const subClassifiOptions = createClassificationsOptions(subClassifiRes);

  const onChangeDayInput = (name: string, value: string | number | null) => {
    if (name === "openAt" || name === "closeAt") {
      const _value = getFilterBusinessTime(dayInputState[name], value as string);
      if (_value === undefined) return;

      setDayInputState((prev) => ({
        ...prev,
        [name]: _value,
      }));
      return;
    }

    setDayInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickHourAdd = () => {
    const foundData = storeData.businessHours.find((e) => e.date === dayInputState.date);
    if (foundData) return;

    onChangeStoreData({
      target: { name: "businessHours", value: [...storeData.businessHours, dayInputState] },
    });
  };

  const onClickHourRemove = (date: TDayOfWeek) => {
    const filterData = storeData.businessHours.filter((e) => e.date !== date);

    onChangeStoreData({
      target: { name: "businessHours", value: filterData },
    });
  };

  return (
    <div className="flex flex-col gap-4 min-w-[700px]">
      <StoreFormWrapper label={t("admin.store.form.name")} isRequired>
        <TextField
          placeholder={t("admin.store.form.namePlaceholder")}
          value={storeData.name}
          name="name"
          onChange={onChangeStoreData}
        />
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.category")} isRequired>
        <TextField
          placeholder={t("admin.store.form.categoryPlaceholder")}
          value={storeData.category}
          name="category"
          onChange={onChangeStoreData}
        />
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.regionTag")} isRequired>
        <div>
          <SelectBox
            label={t("admin.store.form.majorClassification")}
            value={storeData.classificationId ?? ""}
            name="classificationId"
            onChange={(name, value) => onChangeStoreData({ target: { name, value } })}
            menuItems={classifiOptions}
          />
        </div>
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.officeTag")} isRequired>
        <div>
          <SelectBox
            label={t("admin.store.form.subClassification")}
            value={storeData.subClassificationId ?? ""}
            name="subClassificationId"
            onChange={(name, value) => onChangeStoreData({ target: { name, value } })}
            menuItems={subClassifiOptions}
          />
        </div>
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.hoursDisplay")} isRequired>
        <TextareaAutosize
          placeholder={t("admin.store.defaultBusinessHour")}
          value={storeData.businessHour}
          name="businessHour"
          onChange={onChangeStoreData}
          minRows={3}
          style={{
            width: "300px",
            border: "1px solid black",
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
          }}
        />
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.hoursMarker")} isRequired>
        {isBusinessHError ? (
          <div className="flex items-center gap-8">
            {t("admin.common.serverError")}
            <Button variant="contained" color="warning" onClick={() => refetchBusinessH()}>
              {t("admin.common.retry")}
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 w-[600px] lg:flex-col lg:w-auto">
              <SelectBox
                label={t("admin.store.form.dayLabel")}
                value={dayInputState.date}
                name="date"
                onChange={onChangeDayInput}
                menuItems={createSelectItems(DAY_OF_WEEK)}
              />
              <div className="flex items-center gap-2">
                <TextField
                  placeholder="10:00"
                  value={dayInputState.openAt}
                  name="openAt"
                  onChange={({ target: { name, value } }) => onChangeDayInput(name, value)}
                />
                ~
                <TextField
                  placeholder="18:00"
                  value={dayInputState.closeAt}
                  name="closeAt"
                  onChange={({ target: { name, value } }) => onChangeDayInput(name, value)}
                />
                <Button
                  onClick={onClickHourAdd}
                  disabled={!!(selectedStoreId && isBusinessHLoading)}
                >
                  {t("admin.common.add")}
                </Button>
              </div>
            </div>
            <div className="mt-6">
              {storeData.businessHours.map(({ date, openAt, closeAt }) => {
                return (
                  <Typography align="right" variant="subtitle1" key={date}>
                    {`${DAY_OF_WEEK[date]} ${openAt} ~ ${closeAt}`}{" "}
                    <Button color="error" onClick={() => onClickHourRemove(date)}>
                      X
                    </Button>
                  </Typography>
                );
              })}
            </div>
          </div>
        )}
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.address")} isRequired>
        <StoreAddressInput
          storeData={storeData}
          setStoreData={setStoreData}
          onChangeStoreData={onChangeStoreData}
        />
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.umbrellaLocation")} isRequired>
        <div className="flex items-center gap-2">
          <TextField
            placeholder="upbrella"
            value={storeData.umbrellaLocation}
            name="umbrellaLocation"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.contact")}>
        <div className="flex items-center gap-2">
          <TextField
            placeholder={t("admin.store.form.numberPlaceholder")}
            value={storeData.contactNumber}
            name="contactNumber"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.instagram")}>
        <div className="flex items-center gap-2">
          <TextField
            placeholder="upbrella"
            value={storeData.instagramId}
            name="instagramId"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      <StoreFormWrapper label={t("admin.store.form.content")}>
        <div className="flex flex-col items-end gap-2">
          <TextareaAutosize
            placeholder="upbrella"
            minRows={3}
            style={{
              width: "300px",
              border: "1px solid black",
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
            }}
            name="content"
            onChange={onChangeStoreData}
            value={storeData.content}
          />
          <span>{t("admin.store.form.contentCharCount", { count: storeData.content.length })}</span>
        </div>
      </StoreFormWrapper>
    </div>
  );
};

export default StoreModalContents;
