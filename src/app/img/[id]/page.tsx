export default function ImgModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  return <div>{imageId}</div>;
}
