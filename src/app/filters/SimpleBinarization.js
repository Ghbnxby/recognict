export default class SimpleBinarization{

  apply(imageData){
    let pixels = imageData.data;
    let color;
    for (let i = 0; i < pixels.length; i += 4) {
      var r = pixels[i];
      var g = pixels[i + 1];
      var b = pixels[i + 2];
      if(0.3 > 0.299 * r+ 0.587 * g+ 0.114 * b) color = 0;
      else color = 255;
      pixels[i]     = color; // red
      pixels[i + 1] = color; // green
      pixels[i + 2] = color; // blue
    }
    return imageData;
  }
}