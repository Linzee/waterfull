
export function shuffle(a, amount) {
    var j, x, i;
    if(amount === undefined) {
      amount = a.length;
    }
    for (i = amount; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
