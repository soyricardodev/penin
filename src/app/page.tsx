import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  console.log(images);

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div className="w-48 flex flex-col" key={image.id + "-" + index}>
            <img src={image.url} alt="mock image" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
