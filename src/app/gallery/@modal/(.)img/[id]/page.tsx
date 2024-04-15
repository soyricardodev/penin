import { Modal } from "./modal";
import { FullPageImageView } from "~/common/full-page-image-view";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  // const idAsNumber = Number(photoId);

  // if (Number.isNaN(idAsNumber)) throw new Error("Invalid id");

  return (
    <Modal>
      <FullPageImageView id={photoId} />
    </Modal>
  );
}
