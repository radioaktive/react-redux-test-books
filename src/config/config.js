const apiIndex = "http://localhost:8000/api/v1";


const GLOBAL_VARIABLES = {
  WEBSITE_NAME: "BOOKS",
  API_CATEGORIES_URL: apiIndex + "/authors/list",
  API_POSTS_URL: apiIndex + "/books/list",
  API_POST_URL: apiIndex + "/books/by-id",
  API_INDEX_URL: apiIndex,
  WEBSITE_INDEX_URL: "http://localhost:3000",
  GITHUB_SOURCE_REPO: "radioaktive/react-redux-test-books",
  OFFLINE: false
}

export default GLOBAL_VARIABLES;
