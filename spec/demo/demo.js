console.log("loggy");

function one() {
    console.log("function-one");
}

function two() {
    var twoVar = "222222";
    document.write(twoVar);
    return twoVar;
}

function three(a, b) {
    if (a > b) {
        return a;
    }
    return b;
}

function four(myArray) {
    var sum = 0;
    for (var i = 0; i < myArray.length; i++) {
        sum = sum + myArray[i];
    }
    return sum;
}