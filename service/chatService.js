// In future connect with backend API
export const fetchMessages = async (peerId) => {
  // Mock data for now
  return [
    { _id: "m1", text: "Hi there!", sender: "me" },
    { _id: "m2", text: "Hello 👋", sender: "peer" },
  ];
};

export const sendMessage = async (peerId, text) => {
  console.log("sending to backend:", { peerId, text });
  // Later call your backend API
};
