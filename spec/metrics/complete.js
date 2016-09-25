function all(first, second) {
    var sum = initialize(first, second);
    var other = 111, yetAnother = 222;
    for (var i = 0; i < myArray.length; i++) {
        sum = sum + myArray[i];
        yetAnother *= first;
    }
    if (sum > 10) {
        other = yetAnother + 123;
        sum = doStuff(other);
    }
    switch (sum) {
        case 1:
            sideEffect(sum, second);
            break;
        case 50:
            sum += other;
            break;
        case 100:
            return -1;
    }
    return sum;
}