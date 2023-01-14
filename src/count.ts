export const count = {
    count: 1,
    get state() {
        return this.count++;
    }
};

export default count;