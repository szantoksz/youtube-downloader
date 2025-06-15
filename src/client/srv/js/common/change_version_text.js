// define a function that takes an argument data and makes that the version number text
export async function change_version_text(version) {
  document.getElementById("version_number").textContent = version;
}
