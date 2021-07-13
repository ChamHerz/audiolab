export function truncate2decimal(target) {
  return target.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}
