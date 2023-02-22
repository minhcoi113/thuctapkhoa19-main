import {apiClient} from "@/state/modules/apiClient";
const controller = "group";
export const actions = {
<<<<<<< HEAD
    async get({commit}) {
        return apiClient.get(controller +"/get");
    },
    async getPagingParams({commit}, params) {
        return apiClient.post(controller + "/get-paging-params", params);
    },
=======

    async get({commit}) {
        return apiClient.get(controller + "/get");
    },

>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
    async create({commit}, values) {
        return apiClient.post(controller + "/create", values);
    },
    async update({commit, dispatch}, values) {
        return apiClient.put(controller + "/update", values);
    },
    async delete({commit}, id) {
        return await apiClient.delete(controller + "/delete/" + id);
    },
<<<<<<< HEAD
    async getById({commit}, id) {
        return apiClient.get(controller + "/get-by-id/" + id);
    }
};
=======
    async getbyid({commit}, id) {
        return apiClient.get(controller + "/get-by-id/" + id);
    },
    async getPagingParams({commit}, params) {
        return apiClient.post(controller + "/get-paging-params", params);
    }
    

};
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
