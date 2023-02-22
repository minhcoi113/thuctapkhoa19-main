<<<<<<< HEAD
import {apiClient} from "@/state/modules/apiClient";
const controller = "Label";
=======
﻿import {apiClient} from "@/state/modules/apiClient";
const  controller = "Label";
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
export const actions = {
    async get({commit}) {
        return apiClient.get(controller +"/get");
    },
<<<<<<< HEAD
=======
    async getDonViCha({commit}) {
        return apiClient.get(controller +"/getTree");
    },
    async getTree({commit}) {
        return apiClient.get(controller +"/get-tree");
    },
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
    async getPagingParams({commit}, params) {
        return apiClient.post(controller + "/get-paging-params", params);
    },
    async create({commit}, values) {
        return apiClient.post(controller + "/create", values);
    },
    async update({commit, dispatch}, values) {
        return apiClient.put(controller + "/update", values);
    },
    async delete({commit}, id) {
        return await apiClient.delete(controller + "/delete/" + id);
    },
    async getById({commit}, id) {
        return apiClient.get(controller + "/get-by-id/" + id);
<<<<<<< HEAD
    }
=======
    },
    async getByIdByFields({commit}, params) {
        return apiClient.post(controller + "/get-by-id-by-fields" , params);
    },
    async addFields({commit}, values) {
        return apiClient.post(controller + "/add-fields", values);
    },
    async deleteFields({commit}, values) {
        return apiClient.post(controller + "/delete-fields", values);
    },
>>>>>>> 819a556e2afb9ba5a3ff608013f3dfe23e59b99d
};
