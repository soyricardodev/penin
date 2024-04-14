const mockUrls = [
  "https://utfs.io/f/79fb97cb-0ce0-4e4f-824c-7e44c2a8d718-srkle0.png",
  "https://utfs.io/f/66873c7c-3e9b-464b-bc14-54c15d3f0534-jshcw8.png",
  "https://utfs.io/f/966b9b84-5e0b-4568-8c50-33ef4646ba82-27vwp5.jpeg",
  "https://utfs.io/f/80c21cc8-b0a9-4fd3-9f10-8ece4290c178-yx1040.png",
  "https://utfs.io/f/e8a80e84-ffcc-4327-9a26-cb007016ce70-aqnrr3.avif"
]


const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}))

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div className="w-48" key={image.id}>
            <img src={image.url} alt="mock image" />
          </div>
        ))}
      </div>
    </main>
  );
}
