
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

export function animatedSprite(images) {
  let textureArray = [];

  for (let i=0; i < images.length; i++)
  {
     let texture = PIXI.Texture.fromImage(images[i]);
     textureArray.push(texture);
  }

  return new PIXI.extras.AnimatedSprite(textureArray);
}
