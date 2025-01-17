import { AsyncLocalStorage } from "async_hooks";

class Store {
    constructor() {
        this.asyncLocalStorage = new AsyncLocalStorage();
    }

    ensureContext() {
        if (!this.asyncLocalStorage.getStore()) {
            this.asyncLocalStorage.enterWith({});
        }
    }

    set(key, value) {
        this.ensureContext();
        const store = this.asyncLocalStorage.getStore();
        store[key] = value;
    }
    
    get(key) {
        this.ensureContext();
        const store = this.asyncLocalStorage.getStore();
        if (key) {
            return store[key];
        }
        return store;
    }
}

export default new Store();
