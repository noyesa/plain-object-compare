import isPlainObject from 'lodash.isplainobject';

/**
 * Compares two objects by iterating their properties and calling the
 * comparator function on each one to determine if they match.
 *
 * @param {object} expectedObject The object containing expected property values
 * @param {object} actualObject The object containing the actual property values
 * @param {function(*,*):boolean} comparator The predicate that compares each property
 */
function compareObjects(expectedObject, actualObject, comparator) {
  const keys = Object.keys(expectedObject);
  return keys.every((key) => {
    const expectedValue = expectedObject[key];
    const actualValue = actualObject[key];
    return comparator.call(this, expectedValue, actualValue);
  });
}

/**
 * Compares two values. If both values are objects, their properties are each
 * compared recursively. If the expected value is a regular expression and the
 * actual value is a string, then the regular expression will be matched
 * against the string. All other types will be compared using strict equality.
 *
 * @param {*} expectedValue The expected value
 * @param {*} actualValue The actual value
 * @returns {boolean} Does the expectedValue match the actual value?
 */
export default function compare(expectedValue, actualValue) {
  if (isPlainObject(expectedValue) && isPlainObject(actualValue)) {
    return compareObjects(expectedValue, actualValue, compare);
  } else if (expectedValue instanceof RegExp && typeof actualValue === 'string') {
    return expectedValue.test(actualValue);
  }
  return expectedValue === actualValue;
}
