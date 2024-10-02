
/**
  * Slice the specified keys from the object and return a new object with the sliced keys and their corresponding values as blank string or their original values.
  * Reduces an object to only the specified keys, with the option to invert the selection.
  * When invert is `true`, the function returns an object with keys that are not in the specified keys array.
  * Each key in the returned object will have its original value if present in the input object, or an empty string if not.
  *
  * @param obj - The source object from which keys are to be sliced.
  * @param {Array<string | Array<string>>} keys - the keys to be sliced from the object - An array of keys that should be included or excluded based on the invert flag.
  * @param invert - A boolean flag indicating whether to invert the selection of keys (default: false).
  * @returns A new object containing only the selected keys with their corresponding values.
  */
export const sliceKeys = (obj: any, keys: Array<string | Array<string>>, invert: boolean = false): { [key: string]: string } => {
  let filter_keys: Array<string | Array<string>> = invert ? Object.keys(obj).filter(key => !keys.includes(Array.isArray(key) ? key[0] : key)) : keys;
  // return Object.keys(obj)
  //   .filter((k: string) => keys.indexOf(k) >= 0)
  // As we must return key value as blank string or its value
  return filter_keys.reduce((new_obj: any, key: (string | Array<string>)) => {
    if (Array.isArray(key)) {
      new_obj[key[1]] = obj[key[0]] || "";
    } else {
      new_obj[key] = obj[key] || "";
    }
    return new_obj;
  }, {});
}