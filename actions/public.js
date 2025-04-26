"use server";

export async function getPixabayImage(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}+feelings+illustration&client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=landscape`
    );
    const data = await res.json();
    
    const imageUrl = data.urls?.regular || null;
    console.log("Fetched Image URL:", imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Unsplash API Error:", error);
    return null;
  }
}
