class Storage {
    store(data, key){
        const collection = [];
        if(data.length > 0){
            data.forEach(item => {
                collection.push(item.data());
            })
            const shrink = JSON.stringify(collection);
            const hideData = btoa(shrink);
            localStorage.setItem(key, hideData);
            return;
        }
        const str = JSON.stringify(data);
        const hide = btoa(str);
        localStorage.setItem(key, hide);
    }

    get(key){
        const getItem = localStorage.getItem(key);
        if (!getItem) return null;
        const revealData = atob(getItem);
        const toObject = JSON.parse(revealData);
        return toObject;
    }
}

const storage = new Storage();
export default storage;

