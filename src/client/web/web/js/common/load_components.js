// define a function that loads the header and footer
export async function load_components() {
  // define a function that takes an id and file path parameter and inserts the file path's contents onto the element with the given id
  const load = async (id, file_path) => {
    // fetch the file
    const response = await fetch(file_path);

    // read the response (raw html)
    const html = await response.text();

    // insert the html onto the element with the given id
    document.getElementById(id).innerHTML = html;
  };

  // load the header
  await load("header", "../../components/header.html");

  // load the footer
  await load("footer", "../../components/footer.html");
}
