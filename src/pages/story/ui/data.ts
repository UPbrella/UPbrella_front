import i18n from "@/shared/lib/i18n";

export const getUpbrellaHistories = (): THistorySteps[] => [
  {
    year: 2025,
    works: [
      {
        month: "03",
        details: [
          i18n.t("story.history.2025.03.0"),
          i18n.t("story.history.2025.03.1"),
          i18n.t("story.history.2025.03.2"),
          i18n.t("story.history.2025.03.3"),
          i18n.t("story.history.2025.03.4"),
        ],
      },
      {
        month: "05",
        details: [i18n.t("story.history.2025.05.0"), i18n.t("story.history.2025.05.1")],
      },
      { month: "06", details: [i18n.t("story.history.2025.06.0")] },
      {
        month: "10",
        details: [i18n.t("story.history.2025.10.0"), i18n.t("story.history.2025.10.1")],
      },
      {
        month: "11",
        details: [i18n.t("story.history.2025.11.0"), i18n.t("story.history.2025.11.1")],
      },
      {
        month: "12",
        details: [i18n.t("story.history.2025.12.0"), i18n.t("story.history.2025.12.1")],
      },
    ],
  },
  {
    year: 2024,
    works: [
      {
        month: "03",
        details: [
          i18n.t("story.history.2024.03.0"),
          i18n.t("story.history.2024.03.1"),
          i18n.t("story.history.2024.03.2"),
        ],
      },
      {
        month: "04",
        details: [i18n.t("story.history.2024.04.0"), i18n.t("story.history.2024.04.1")],
      },
      {
        month: "05",
        details: [
          i18n.t("story.history.2024.05.0"),
          i18n.t("story.history.2024.05.1"),
          i18n.t("story.history.2024.05.2"),
        ],
      },
      { month: "06", details: [i18n.t("story.history.2024.06.0")] },
      {
        month: "07",
        details: [i18n.t("story.history.2024.07.0"), i18n.t("story.history.2024.07.1")],
      },
      {
        month: "09",
        details: [i18n.t("story.history.2024.09.0"), i18n.t("story.history.2024.09.1")],
      },
      { month: "10", details: [i18n.t("story.history.2024.10.0")] },
      { month: "12", details: [i18n.t("story.history.2024.12.0")] },
    ],
  },
  {
    year: 2023,
    works: [
      {
        month: "02",
        details: [i18n.t("story.history.2023.02.0"), i18n.t("story.history.2023.02.1")],
      },
      { month: "03", details: [i18n.t("story.history.2023.03.0")] },
      { month: "04", details: [i18n.t("story.history.2023.04.0")] },
    ],
  },
  {
    year: 2022,
    works: [
      { month: "02", details: [i18n.t("story.history.2022.02.0")] },
      { month: "03", details: [i18n.t("story.history.2022.03.0")] },
      { month: "04", details: [i18n.t("story.history.2022.04.0")] },
      { month: "06", details: [i18n.t("story.history.2022.06.0")] },
      { month: "09", details: [i18n.t("story.history.2022.09.0")] },
      { month: "11", details: [i18n.t("story.history.2022.11.0")] },
    ],
  },
  {
    year: 2021,
    works: [
      { month: "04", details: [i18n.t("story.history.2021.04.0")] },
      { month: "05", details: [i18n.t("story.history.2021.05.0")] },
      { month: "06", details: [i18n.t("story.history.2021.06.0")] },
      { month: "07", details: [i18n.t("story.history.2021.07.0")] },
      { month: "08", details: [i18n.t("story.history.2021.08.0")] },
      { month: "09", details: [i18n.t("story.history.2021.09.0")] },
      { month: "11", details: [i18n.t("story.history.2021.11.0")] },
    ],
  },
];

type THistorySteps = {
  year: number;
  works: { month: string; details: string[] }[];
};
