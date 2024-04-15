import { getImage } from "~/server/db/queries";

export default async function ImgModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(imageId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

  const image = await getImage(idAsNumber);

  return (
    <div>
      {imageId}
      <img src={image.url} className="size-32" />
    </div>
  );
}
