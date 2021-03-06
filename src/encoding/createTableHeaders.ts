import all from "./all";

function getHeaders() {
  return all.map((obj) => obj.property);
}

export default function createTableHeader() {
  const headers = getHeaders();
  return headers.join(",") + "\n";
}
