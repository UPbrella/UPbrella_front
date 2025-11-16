import Supercluster from "supercluster";

export interface ClusterPoint {
  type: "Feature";
  properties: {
    cluster?: boolean;
    point_count?: number;
    point_count_abbreviated?: string;
    storeId: number;
    name: string;
    openStatus: boolean;
    hasActiveStore?: boolean; // 클러스터 내 활성화된 지점 존재 여부
  };
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
}

export const createClusterManager = (
  stores: Array<{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    openStatus: boolean;
  }>
) => {
  const cluster = new Supercluster<ClusterPoint["properties"]>({
    radius: 80, // 클러스터 반경 (픽셀)
    maxZoom: 18, // 최대 줌 레벨 (이 레벨 이상에서는 클러스터링 안함)
    minZoom: 0,
    minPoints: 2, // 최소 포인트 수
  });

  const points: ClusterPoint[] = stores.map((store) => ({
    type: "Feature",
    properties: {
      storeId: store.id,
      name: store.name,
      openStatus: store.openStatus,
    },
    geometry: {
      type: "Point",
      coordinates: [store.longitude, store.latitude],
    },
  }));

  cluster.load(points);
  return cluster;
};

export const getClustersInBounds = (cluster: Supercluster, map: naver.maps.Map) => {
  const bounds = map.getBounds() as naver.maps.LatLngBounds;
  const zoom = Math.floor(map.getZoom());

  const bbox: [number, number, number, number] = [
    bounds.getSW().lng(),
    bounds.getSW().lat(),
    bounds.getNE().lng(),
    bounds.getNE().lat(),
  ];

  const clusters = cluster.getClusters(bbox, zoom);

  // 클러스터에 활성화 상태 정보 추가
  return clusters.map((clusterPoint) => {
    if (clusterPoint.properties.cluster) {
      const clusterId = clusterPoint.id as number;
      const children = cluster.getLeaves(clusterId, Infinity);
      const hasActiveStore = children.some((child) => child.properties.openStatus);

      return {
        ...clusterPoint,
        properties: {
          ...clusterPoint.properties,
          hasActiveStore,
        },
      };
    }
    return clusterPoint;
  });
};
