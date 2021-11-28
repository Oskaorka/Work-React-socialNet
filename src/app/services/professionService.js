import httpService from "./httpService";

const professionEndpoint = "profession/";

const professionService = {
    get: async () => {
        const { data } = await httpService.get(professionEndpoint);
        // console.log(data);
        return data;
    }
};
export default professionService;