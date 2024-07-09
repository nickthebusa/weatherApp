function getBrightness(data: Uint8ClampedArray): number {
  let totalBrightness = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    totalBrightness += brightness;
  }
  return totalBrightness / (data.length / 4);
}


export function getWhiteOrBlack(imageUrl: string): Promise<string> {
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
        const averageColor = getBrightness(data.data);
        const contrastColor = averageColor >= 128 ? "black" : "white";
        resolve(contrastColor);
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

