import webMarker from "@/assets/webMarker.svg";
import webMarker_inactive from "@/assets/webMarker_inactive.svg";

export const createClusterIcon = (pointCount: number, hasActiveStore: boolean): string => {
  const iconSrc = hasActiveStore ? webMarker : webMarker_inactive;

  return `
    <div class="marker-wrapper-cluster">
      <img class="marker-cluster" alt="clusterMarker" src="${iconSrc}" />
      <div class="cluster-count">${pointCount}</div>
    </div>
  `;
};

export const createSingleMarkerIcon = (
  name: string,
  openStatus: boolean,
  isSelected: boolean
): string => {
  const iconSrc = openStatus ? webMarker : webMarker_inactive;

  if (isSelected) {
    return `
      <div class="marker-wrapper-focus">
        <img class="marker-focus" alt="webMarkerFocus" src="${iconSrc}" />
        <div class="custom-label-focus">${name}</div>
      </div>
    `;
  }

  return `
    <div class="marker-wrapper">
      <img class="marker" alt="webMarker" src="${iconSrc}" />
      <div class="custom-label">${name}</div>
    </div>
  `;
};
