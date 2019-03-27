"use strict"

class Algorithm {
    constructor() {}

    setData(data) {
        this.data = data;
        return this;
    }

    train() {}
}

class KMeans extends Algorithm {
    constructor() {
        super();
    }

    setData(data) {
        super.setData(data);
        return this;
    }

    train() {
        console.log(this.data)
    }

    execute(inputsData) {
        console.log(inputsData)
    }
}

class Bayes extends Algorithm {
    constructor() {
        super();
    }

    train() {}

    execute(inputsData) {
        console.log(inputsData)
    }
}

class Lloyd extends Algorithm {
    constructor() {
        super();
    }

    train() {}

    execute(inputsData) {
        console.log(inputsData)
    }
}

class SOM extends Algorithm {
    constructor() {
        super();
    }

    train() {}

    execute(inputsData) {
        console.log(inputsData)
    }
}