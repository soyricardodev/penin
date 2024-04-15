import { getImage } from "~/server/db/queries";
import { Modal } from "./modal";

export default async function ImgModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(imageId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

  const image = await getImage(idAsNumber);

  return (
    <Modal>
      {imageId}
      <img src={image.url} className="size-32" />
    </Modal>
  );
}
