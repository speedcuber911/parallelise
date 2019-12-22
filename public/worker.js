self.onmessage = ({ data }) => {
  const { funcStr } = data;
  const functionExecution = eval(`(${funcStr})()`);
  self.postMessage(functionExecution);
};
