/**
 * construct a regular expression for filtering out tasks by given keyword(s)
 *
 * reference: https://levelup.gitconnected.com/use-regex-and-javascript-to-improve-search-results-870932050d08
 *
 * @param keyword a string that user inputs
 * @returns a RegExp object to be matched against
 */
export const getSearchPatternByKeyword = (keyword: string) => {
  const pattern = keyword
    .split("")
    .map((x) => {
      return `(?=.*${x})`
    })
    .join("")

  return new RegExp(pattern, "gi")
}
