const errorHandler = (error) => {
  if (error.response.data?.details) {
    const details = error.response.data.details
      .map((e) => `- ${e.field}: "${e.message}"`)
      .join("\n");

    alert(details);
  } else if (error.response?.data) {
    alert(error.response.data.message || error.response.data || "");
  } else {
    console.log(error);
  }
};

export default errorHandler;
