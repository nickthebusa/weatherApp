interface RGBColor {
  r: number;
  g: number;
  b: number;
}


function getAverageColor(data: ImageData): RGBColor {
  const d = data.data;
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < d.length; i += 4) {
    r += d[i];
    g += d[i + 1];
    b += d[i + 2];
  }
  const pixelCount = data.width * data.height;
  return {
    r: Math.round(r / pixelCount),
    g: Math.round(g / pixelCount),
    b: Math.round(b / pixelCount)
  };
}

function getMostContrastingColor(color: RGBColor): RGBColor {
  return {
    r: 255 - color.r,
    g: 255 - color.g,
    b: 255 - color.b,
  }
}

function rgbToHex(color: RGBColor): string {
  return '#' + [color.r, color.g, color.b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}


export function getTextColor(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = (e: Event): void => {
      const ele = e.target as HTMLImageElement;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get 2D context"));
        return;
      }

      canvas.width = ele.width;
      canvas.height = ele.height;
      ctx.drawImage(ele, 0, 0);

      try {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const averageColor = getAverageColor(data);
        const contrastColor = getMostContrastingColor(averageColor);
        const hexColor = rgbToHex(contrastColor);
        resolve(hexColor);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = (): void => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
}
