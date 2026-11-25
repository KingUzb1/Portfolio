export async function compressImageToDataUrl(
  file: File,
  maxWidth = 1400,
  maxBytes = 420_000
): Promise<string> {
  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Rasm o‘qilmadi'));
      }
    };
    reader.onerror = () => reject(new Error('Faylni o‘qishda xatolik'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error('Rasm formati qo‘llab-quvvatlanmaydi'));
    element.src = rawDataUrl;
  });

  const scale = img.width > maxWidth ? maxWidth / img.width : 1;
  const targetWidth = Math.max(1, Math.round(img.width * scale));
  const targetHeight = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas konteksti ochilmadi');
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  let quality = 0.84;
  let result = canvas.toDataURL('image/jpeg', quality);

  while (result.length > maxBytes && quality > 0.42) {
    quality -= 0.1;
    result = canvas.toDataURL('image/jpeg', quality);
  }

  if (result.length > 490_000) {
    throw new Error(
      'Rasm hajmi juda katta. Kichikroq rasm tanlang yoki rasm havolasini (URL) kiriting.'
    );
  }

  return result;
}
