const apiRequest = async (url = "", optionObjs = null) => {
    let errMsg = null;
  try {
    const response = await fetch(url, optionObjs);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
