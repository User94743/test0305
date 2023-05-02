import { makeAutoObservable} from "mobx";
import {Task} from "../types/Task";
class Store {

    email: string | boolean = false;
    tasks: Task[] = []
    constructor() {
        makeAutoObservable(this)
    }

    login(email: string) {
        this.email = email;
    }

    logout() {
        this.email = false;
    }
    setTasks(tasks: Task[]) {
        this.tasks = tasks
    }

}



export default new Store();