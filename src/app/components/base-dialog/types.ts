interface DialogProps {
    isOpen: boolean,
    onClose: () => void,
}

interface BaseDialogProps extends DialogProps {
    children: React.ReactNode,
}

export type { DialogProps, BaseDialogProps }