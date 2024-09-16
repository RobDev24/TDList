import{ Model as BaseModel } from "vue-api-query";


export default class Model extends BaseModel {
    baseURL(){
        return this.endpoint( "http://localhost:3000" );
    }

    request(config){
        return this.endpoint.$http.request(config);
    }
}