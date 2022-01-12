export const displayUnits = (distance) => {
  if (distance >= 1000) return `${distance / 1000}km`;
  else if (distance > 0) return `${distance}m`;
};
