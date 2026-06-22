import api from "./apiClient";

export async function submitSellerVerification(payload) {
  const { data } = await api.post("/api/marketplace/verification/submit/", payload);
  return data;
}

export const VERIFICATION_COPY = {
  not_submitted: {
    label: "Not submitted",
    description: "Submit your seller identity details before creating listings.",
  },
  pending: {
    label: "Pending review",
    description: "Your seller verification is with the admin team.",
  },
  verified: {
    label: "Verified seller",
    description: "You can create listings and manage seller agreements.",
  },
  rejected: {
    label: "Needs resubmission",
    description: "Your last verification was rejected. Submit updated details for review.",
  },
};

export async function getConversations() {
  const { data } = await api.get("/api/marketplace/conversations/");
  return data;
}

export async function startConversation({ seller, product }) {
  const { data } = await api.post("/api/marketplace/conversations/", { seller, product });
  return data;
}

export async function getConversation(id) {
  const { data } = await api.get(`/api/marketplace/conversations/${id}/`);
  return data;
}

export async function sendMessage(conversationId, body) {
  const { data } = await api.post(`/api/marketplace/conversations/${conversationId}/messages/`, { body });
  return data;
}

export async function getAgreements() {
  const { data } = await api.get("/api/marketplace/agreements/");
  return data;
}

export async function createAgreement(payload) {
  const { data } = await api.post("/api/marketplace/agreements/", payload);
  return data;
}

export async function getAgreement(id) {
  const { data } = await api.get(`/api/marketplace/agreements/${id}/`);
  return data;
}

export async function confirmAgreement(id) {
  const { data } = await api.post(`/api/marketplace/agreements/${id}/confirm/`);
  return data;
}

export async function rejectAgreement(id) {
  const { data } = await api.post(`/api/marketplace/agreements/${id}/reject/`);
  return data;
}

export async function completeAgreement(id) {
  const { data } = await api.post(`/api/marketplace/agreements/${id}/complete/`);
  return data;
}

export async function payAgreement(payload) {
  const { data } = await api.post("/api/marketplace/payments/pay/", payload);
  return data;
}

export async function getPayments() {
  const { data } = await api.get("/api/marketplace/payments/");
  return data;
}

export async function getNotifications() {
  const { data } = await api.get("/api/marketplace/notifications/");
  return data;
}

export async function openDispute(agreement, payload) {
  const { data } = await api.post(`/api/marketplace/agreements/${agreement}/dispute/`, payload);
  return data;
}

export async function getDisputes() {
  const { data } = await api.get("/api/marketplace/disputes/");
  return data;
}

export async function getDispute(id) {
  const { data } = await api.get(`/api/marketplace/disputes/${id}/`);
  return data;
}

export async function resolveDispute(id, payload) {
  const { data } = await api.post(`/api/marketplace/disputes/${id}/resolve/`, payload);
  return data;
}
