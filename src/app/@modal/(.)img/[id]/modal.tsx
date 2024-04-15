import { useRouter } from "next/navigation";
import { useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="m-0 h-screen w-screen bg-zinc-900/50"
      onClose={onDismiss}
    >
      {children}
      <button onClick={onDismiss} className="close-button" />
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
