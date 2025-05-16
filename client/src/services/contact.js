import ApiClient from "../apiClient";

export const contactService = (data) =>  {
    return ApiClient.post("services/message", data);
}