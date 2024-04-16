import { FullPageImageView } from "~/common/full-page-image-view";

export default function ImgModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  return (
    <div className="h-full">
      <FullPageImageView id={imageId} />
    </div>
  );
}
