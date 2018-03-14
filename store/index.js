/*
 * @Author: lvshihao
 * @Date: 2018-01-30 11:53:22
 * @Last Modified by: lvshihao
 * @Last Modified time: 2018-02-09 13:22:05
 */
import axios from 'axios'

const host = process.env.NODE_ENV === "production"
    ? "http://server.lvshihaonb.cn"
    : "http://localhost:8088"

export const state = () => ({admin: {}, backgrounds: [], background: ``})

export const mutations = {
    SET_ADMIN: function (state, admin) {
        state.admin = admin;
    },
    SET_BACKGROUNDS: function (state, backgrounds) {
        state.backgrounds = backgrounds;
    },
    SET_BACKGROUND: function (state, background) {
        state.background = background;
    }
}

export const actions = {
    async nuxtServerInit({
        commit
    }, {req}) {
        if (req.session && req.session.admin) {
            commit("SET_ADMIN", req.session.admin);
        }
        const backgrounds = [];
        const backgroundSmall = [];
        const {data} = await axios.post(host + "/api/admin/backgrounds");
        data.forEach(element => {
            backgrounds.push(`${host}/backgrounds/${element}`);
            backgroundSmall.push(`${host}/backgrounds/small/${element}`);
        });
        commit("SET_BACKGROUNDS", backgroundSmall);
        if (!state.background) {
            const random = Math.floor(Math.random() * backgrounds.length);
            commit("SET_BACKGROUND", `background:url('${backgrounds[random]}') no-repeat fixed center center;background-size:cover`);
        }
    },
    async login({
        commit
    }, admin) {
        await axios.post("/api/setadminsession", admin);
        commit('SET_ADMIN', admin);
    },
    async logout({commit}) {
        await axios.post("/api/deleteadminsession");
        commit("SET_ADMIN", null);
    },
    async update({
        commit
    }, admin) {
        await axios.post("/api/updateadminsession", admin);
        commit("SET_ADMIN", admin);
    }
}