export default class SimpleBinarization{

  apply(imageData){
    let pixels = imageData.data;
    let color;
    let histogram = this.getHistogram(pixels);
    let threshold = this.otsu(histogram, pixels.length/4);
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      if(threshold > 0.299 * r+ 0.587 * g+ 0.114 * b) color = 0;
      else color = 255;
      pixels[i]     = color; // red
      pixels[i + 1] = color; // green
      pixels[i + 2] = color; // blue
    }
    return imageData;
  }

  getHistogram(pixels){
    let histogram = [];
    for(let i=0;i<256;i++) histogram[i] = 0;
    let populateHistogram = (n) => {
      let h = 0xff & n;
      histogram[h] = histogram[h] + 1;
    };
    for (let i = 0; i < pixels.length; i += 4) {
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      populateHistogram(0.299 * r+ 0.587 * g+ 0.114 * b);
    }
    return histogram;
  }

  otsu (histogram, total) {
    var sum = 0;
    for (let i = 0; i < 256; ++i) sum += i * histogram[i];
    let sumB = 0;
    let wB = 0;
    let wF = 0;
    let mB;
    let mF;
    let max = 0;
    let between;
    let threshold = 0;
    for (let i = 0; i < 256; ++i) {
      wB += histogram[i];
      if (wB == 0)
        continue;
      wF = total - wB;
      if (wF == 0)
        break;
      sumB += i * histogram[i];
      mB = sumB / wB;
      mF = (sum - sumB) / wF;
      between = wB * wF * Math.pow(mB - mF, 2);
      if (between > max) {
        max = between;
        threshold = i;
      }
    }
    return threshold;
  }
}