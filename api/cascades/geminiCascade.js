function geminiCascade(input) {
  return {
    provider: "gemini",
    status: "configured",
    input,
  };
}

module.exports = {
  geminiCascade,
};
