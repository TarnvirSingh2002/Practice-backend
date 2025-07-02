const obj = {
    name: "Tarnvir",
    show:{
        get:setTimeout(() => {
            console.log("Arrow:", this.name);  // Inherits `this` from `show`
        }, 1000),

        go:setTimeout(function () {
            console.log("Regular:", this.name);  // `this` is global (undefined in strict mode)
        }, 1000)
    }
};

obj.show.get;
obj.show.go;
