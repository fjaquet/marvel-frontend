const errorHandler = (error) => {
  if (error.response.data.details) {
    const details = error.response.data.details
      .map((e) => `- ${e.field}: "${e.message}"`)
      .join("\n");

    alert(details);
  } else if (error.message) {
    alert(error.message);
  } else if (error.response) {
    alert(error.response.data.message);
  } else {
    console.log(error);
  }
};

export default errorHandler;
