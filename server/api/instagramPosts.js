export default defineEventHandler(async (event) => {
    const url = 'https://instagram-api-20231.p.rapidapi.com/api/user_posts/25025320?count=12';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '122f95c70cmshf109d1265b10d39p1f35a8jsn99bb280f4d1e',
        'x-rapidapi-host': 'instagram-api-20231.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json(); // JSON formatında döndür
      console.log(result); // API yanıtını konsola yazdır
      return result; // Sonucu döndür
    } catch (error) {
      console.error('API Hatası:', error);
      return { error: 'Veri alınamadı' };
    }
  });
  