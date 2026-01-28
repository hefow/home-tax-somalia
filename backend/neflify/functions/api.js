exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "success",
      message: "API is running smoothly",
      timestamp: new Date().toISOString(),
      health: "good"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };
};
