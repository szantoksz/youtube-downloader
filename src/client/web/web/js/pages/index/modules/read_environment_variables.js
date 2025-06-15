// make a function take takes a list argument, goes through every elemt of the list and reads meta tag contents
// the meta tag name is the list elements
export async function read_environment_variables(tag_names) {
  let values = [];

  // loop through every tag name
  for (let i of tag_names) {
    // try to read the values
    try {
      let value = document.querySelector(`meta[name="${i}"]`).content;
      // check if it has data
      if (value) {
        // if it does add it normally
        values.push(value);
      } else {
        // if it doesn't, make it null
        values.push(null);
      }
    } catch {
      // if it fails to read, make it null
      values.push(null);
    }
  }

    // after it finished looping, return the finished values
    return values;
}
