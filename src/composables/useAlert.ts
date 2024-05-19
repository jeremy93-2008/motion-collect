import type { Ref } from 'vue'

export interface AlertProvider {
    type: 'error' | 'warning' | 'info'
    title: string
    message: string
    show: boolean
}

export function useAlert() {
    const alert = inject('alertProvider') as Ref<AlertProvider>
    return {
        showInfoAlert: (title: string, message: string) => {
            alert.value.type = 'info'
            alert.value.title = title
            alert.value.message = message
            alert.value.show = true
        },
        showWarningAlert: (title: string, message: string) => {
            alert.value.type = 'warning'
            alert.value.title = title
            alert.value.message = message
            alert.value.show = true
        },
        showErrorAlert: (title: string, message: string) => {
            alert.value.type = 'error'
            alert.value.title = title
            alert.value.message = message
            alert.value.show = true
        },
    }
}
