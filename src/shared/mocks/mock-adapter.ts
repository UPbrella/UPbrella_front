import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { TApiResponse } from "@/shared/model/types";
import {
  mockUserStatus,
  mockUsers,
  mockBlackUsers,
  mockRentHistoriesClient,
  mockSocialSession,
  mockStores,
  mockClassifications,
  mockSubClassifications,
  mockClassificationStores,
  mockStoreDetail,
  mockStoreList,
  mockStoreBusinessHours,
  mockStoreImages,
  mockUmbrellas,
  mockUmbrellaStatistics,
  mockRentHistories,
  mockConditionReports,
  mockImprovementReports,
  mockLockers,
  mockRentFormData,
  mockReturnFormData,
  mockReturnUmbrella,
  mockRentPassword,
  mockLockerCount,
} from "./mock-data";

type MockRoute = {
  method: string;
  pattern: RegExp;
  response: TApiResponse<unknown> | null;
};

const EMPTY_OK: TApiResponse<null> = {
  status: "success",
  code: 200,
  message: "OK",
  data: null,
};

const routes: MockRoute[] = [
  // ── User ──
  { method: "get", pattern: /^\/users\/loggedIn$/, response: mockUserStatus },
  { method: "get", pattern: /^\/admin\/users$/, response: mockUsers },
  { method: "get", pattern: /^\/users\/blackList$/, response: mockBlackUsers },
  { method: "get", pattern: /^\/users\/histories$/, response: mockRentHistoriesClient },
  { method: "get", pattern: /^\/users\/session\/social$/, response: mockSocialSession },
  { method: "post", pattern: /^\/users\/login$/, response: EMPTY_OK },
  { method: "post", pattern: /^\/users\/oauth\/login$/, response: EMPTY_OK },
  { method: "post", pattern: /^\/users\/join$/, response: EMPTY_OK },
  { method: "post", pattern: /^\/users\/logout$/, response: EMPTY_OK },
  { method: "delete", pattern: /^\/admin\/users\/\d+$/, response: null },
  { method: "delete", pattern: /^\/users\/blackList\/\d+$/, response: null },
  { method: "patch", pattern: /^\/admin\/users\/\d+$/, response: null },

  // ── Store ──
  { method: "get", pattern: /^\/admin\/stores$/, response: mockStores },
  { method: "get", pattern: /^\/stores\/introductions$/, response: mockStoreList },
  { method: "get", pattern: /^\/stores\/\d+$/, response: mockStoreDetail },
  { method: "get", pattern: /^\/stores\/classifications$/, response: mockClassifications },
  { method: "get", pattern: /^\/stores\/subClassifications$/, response: mockSubClassifications },
  { method: "get", pattern: /^\/stores\/classification\/\d+$/, response: mockClassificationStores },
  {
    method: "get",
    pattern: /^\/admin\/stores\/\d+\/businessHours$/,
    response: mockStoreBusinessHours,
  },
  { method: "get", pattern: /^\/admin\/stores\/\d+\/images$/, response: mockStoreImages },
  { method: "post", pattern: /^\/admin\/stores$/, response: null },
  { method: "post", pattern: /^\/admin\/stores\/\d+\/images$/, response: null },
  { method: "patch", pattern: /^\/admin\/stores\/\d+$/, response: null },
  { method: "patch", pattern: /^\/admin\/stores\/\d+\/activate$/, response: null },
  { method: "patch", pattern: /^\/admin\/stores\/\d+\/inactivate$/, response: null },
  { method: "delete", pattern: /^\/admin\/stores\/\d+$/, response: null },
  { method: "delete", pattern: /^\/admin\/stores\/images\/\d+$/, response: null },
  { method: "post", pattern: /^\/admin\/stores\/classifications$/, response: null },
  { method: "delete", pattern: /^\/admin\/stores\/classifications\/\d+$/, response: null },
  { method: "post", pattern: /^\/admin\/stores\/subClassifications$/, response: null },
  { method: "delete", pattern: /^\/admin\/stores\/subClassifications\/\d+$/, response: null },

  // ── Umbrella ──
  { method: "get", pattern: /^\/admin\/umbrellas$/, response: mockUmbrellas },
  { method: "get", pattern: /^\/admin\/umbrellas\/\d+$/, response: mockUmbrellas },
  { method: "get", pattern: /^\/admin\/umbrellas\/statistics$/, response: mockUmbrellaStatistics },
  {
    method: "get",
    pattern: /^\/admin\/umbrellas\/statistics\/\d+$/,
    response: mockUmbrellaStatistics,
  },
  { method: "post", pattern: /^\/admin\/umbrellas$/, response: null },
  { method: "patch", pattern: /^\/admin\/umbrellas\/\d+$/, response: null },
  { method: "delete", pattern: /^\/admin\/umbrellas\/\d+$/, response: null },

  // ── Rent (admin) ──
  { method: "get", pattern: /^\/admin\/rent\/histories$/, response: mockRentHistories },
  { method: "patch", pattern: /^\/admin\/rent\/histories\/refund\/\d+$/, response: null },
  { method: "patch", pattern: /^\/admin\/rent\/histories\/payment\/\d+$/, response: null },
  { method: "delete", pattern: /^\/admin\/rent\/histories\/\d+\/account$/, response: null },

  // ── Feedback ──
  { method: "get", pattern: /^\/admin\/rent\/histories\/status$/, response: mockConditionReports },
  {
    method: "get",
    pattern: /^\/admin\/rent\/histories\/improvements$/,
    response: mockImprovementReports,
  },

  // ── Locker ──
  { method: "get", pattern: /^\/admin\/lockers$/, response: mockLockers },
  { method: "post", pattern: /^\/admin\/lockers$/, response: null },
  { method: "patch", pattern: /^\/admin\/lockers\/\d+$/, response: null },
  { method: "delete", pattern: /^\/admin\/lockers\/\d+$/, response: null },

  // ── Rent / Return Form ──
  { method: "get", pattern: /^\/rent\/form\/\d+$/, response: mockRentFormData },
  { method: "get", pattern: /^\/return\/form\/\d+/, response: mockReturnFormData },
  { method: "get", pattern: /^users\/loggedIn\/umbrella$/, response: mockReturnUmbrella },
  { method: "post", pattern: /^\/rent$/, response: mockRentPassword },
  { method: "patch", pattern: /^\/rent$/, response: null },
  { method: "patch", pattern: /^\/lockers\/\d+$/, response: mockLockerCount },
];

function stripBase(url: string, baseURL?: string): string {
  if (!url) return "/";
  if (baseURL && url.startsWith(baseURL)) {
    url = url.slice(baseURL.length);
  }
  const qIdx = url.indexOf("?");
  if (qIdx !== -1) url = url.slice(0, qIdx);
  return url.startsWith("/") ? url : `/${url}`;
}

function findRoute(method: string, url: string): MockRoute | undefined {
  const m = method.toLowerCase();
  return routes.find((r) => r.method === m && r.pattern.test(url));
}

export function mockAdapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve) => {
    const path = stripBase(config.url || "", config.baseURL);
    const method = config.method || "get";
    const route = findRoute(method, path);

    const data = route?.response ?? EMPTY_OK;

    setTimeout(() => {
      resolve({
        data,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      } as AxiosResponse);
    }, 150);
  });
}
