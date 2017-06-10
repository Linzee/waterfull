
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

export function distance(s1, s2) {
  var dx = s1.x-s2.x;
  var dy = s1.y-s2.y;
  return Math.sqrt(dx*dx+dy*dy);
}
