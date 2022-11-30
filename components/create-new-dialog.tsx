import { Dialog, DialogContent } from "@reach/dialog"
import "@reach/dialog/styles.css"

export interface CreateNewDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateNewDialog({ open, onClose }: CreateNewDialogProps) {
  return (
    <Dialog isOpen={open} onDismiss={onClose}>
      <p>
        I will allow zoom and pinch gestures on iOS devices even when scrolling
        is locked!
      </p>
    </Dialog>
  )
}
