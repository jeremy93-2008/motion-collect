import type { Ref } from 'vue'

export interface ConfirmationProvider {
    type: 'error' | 'warning' | 'info'
    title: string
    message: string
    onOk?: () => void
    onCancel?: () => void
    show: boolean
}

export function useConfirmation() {
    const alert = inject('confirmationProvider') as Ref<ConfirmationProvider>

    const confirmAlert = (
        title: string,
        message: string,
        type: 'error' | 'warning' | 'info'
    ) => {
        alert.value.type = type
        alert.value.title = title
        alert.value.message = message
        alert.value.show = true

        const promiseResolver = Promise.withResolvers()

        alert.value.onOk = () => {
            alert.value.show = false
            promiseResolver.resolve(true)
        }
        alert.value.onCancel = () => {
            alert.value.show = false
            promiseResolver.resolve(false)
        }

        return promiseResolver.promise
    }

    return {
        confirmInfoAlert: (title: string, message: string) => {
            return confirmAlert(title, message, 'info')
        },
        confirmWarningAlert: (title: string, message: string) => {
            return confirmAlert(title, message, 'warning')
        },
        confirmErrorAlert: (title: string, message: string) => {
            return confirmAlert(title, message, 'error')
        },
    }
}
