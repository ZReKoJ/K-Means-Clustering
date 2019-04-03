"use strict"

class Algorithm {
    constructor() {}

    setData(data) {
        this.data = {};
        this.classes = [];

        Array(data.columns).fill().forEach((element, index) => {
            if (index + 1 < CONFIG.CLASS) {
                this.data[index] = [];
                for (let j = 0; j < data.body.length; j++) {
                    this.data[index].push(Number(data.body[j][index]));
                }
            } else {
                for (let j = 0; j < data.body.length; j++) {
                    this.classes.push(String(data.body[j][index]));
                }
            }
        });

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
        let centers = {};
        Array.from(new Set(this.classes)).forEach(c => {
            centers[c] = {};
            let count = this.classes.reduce((ac, n) => (c == n) ? ac + 1 : ac, 0);
            Object.keys(this.data).forEach(key => {
                let sum = this.data[key].reduce((ac, n, index) => (c == this.classes[index]) ? ac + n : ac, 0);
                centers[c][key] = sum / count;
            });
        });

        this.centers = this.iterate(centers);
    }

    iterate(centers) {
        let belongingDegrees = this.belongingDegree(centers);
        let newCenters = this.center(centers, belongingDegrees);
        if (this.difference(centers, newCenters)) {
            return newCenters;
        } else {
            return this.iterate(newCenters);
        }
    }

    difference(centers, newCenters) {
        return Object.keys(centers).every(key =>
            Number(CONFIG.ALGORITHMS["k-means"].tolerance) > Math.sqrt(
                Object.keys(centers[key]).reduce((ac, n) => Math.pow(centers[key][n] - newCenters[key][n], 2) + ac, 0)
            )
        );
    }

    center(centers, belongingDegrees) {
        let newCenters = {};
        Object.keys(centers).forEach(
            key => {
                newCenters[key] = {};
                Object.keys(this.data).forEach(
                    row => {
                        let dividend = this.data[row].reduce(
                            (ac, n, index) => Math.pow(belongingDegrees[key][index], CONFIG.ALGORITHMS["k-means"]["exponential-weight"]) * n + ac, 0);
                        let divider = this.data[row].reduce(
                            (ac, n, index) => Math.pow(belongingDegrees[key][index], CONFIG.ALGORITHMS["k-means"]["exponential-weight"]) + ac, 0);
                        newCenters[key][row] = dividend / divider;
                    }
                );
            }
        )
        return newCenters;
    }

    belongingDegree(centers) {
        let belongingDegrees = {};
        let distances = Array(this.classes.length).fill().map(
            (element, index) => {
                let distance = {}
                Object.keys(centers).forEach(
                    key => {
                        distance[key] = Object.keys(centers[key]).reduce(
                            (ac, n) => Math.pow(this.data[n][index] - centers[key][n], 2) + ac, 0)
                    }
                );
                distance["sum"] = Object.values(distance).reduce((ac, n) =>
                    ac + Math.pow(1 / n, 1 / (CONFIG.ALGORITHMS["k-means"]["exponential-weight"] - 1)), 0);
                return distance;
            }
        );
        Object.keys(centers).forEach(
            key => {
                belongingDegrees[key] = distances.map(
                    element => Math.pow(1 / element[key], 1 / (CONFIG.ALGORITHMS["k-means"]["exponential-weight"] - 1)) / element["sum"]
                )
            }
        )
        return belongingDegrees;
    }

    execute(inputsData) {
        let arrayResult = [];
        let total = 0;
        Object.keys(this.centers).forEach(key => {
            let result = Math.sqrt(
                Object.keys(this.centers[key]).reduce(
                    (ac, n) => Math.pow(Number(this.centers[key][n]) - Number(inputsData[n]), 2) + ac, 0)
            )
            total += result;
            arrayResult.push({ title: key, probability: result })
        });
        return arrayResult
            .map(element => {
                element.probability = 1 - (element.probability / total);
                return element;
            })
            .sort((a, b) => a.probability < b.probability ? 1 : -1);
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