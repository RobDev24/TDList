import Model from "./Model";

export default class Tasks extends Model {
    resource(){
        return this.endpoint( "tasks");
    }
}