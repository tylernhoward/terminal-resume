import { ref, computed } from 'vue'
import type { ViewLocation } from '../components/ProjectData'

export function useFinderNavigation() {
    const currentLocation = ref<ViewLocation>({ type: 'root' })
    const backStack = ref<ViewLocation[]>([])
    const forwardStack = ref<ViewLocation[]>([])

    const canGoBack = computed(() => backStack.value.length > 0)
    const canGoForward = computed(() => forwardStack.value.length > 0)

    function navigateTo(location: ViewLocation) {
        backStack.value.push(currentLocation.value)
        forwardStack.value = []
        currentLocation.value = location
    }

    function goBack() {
        if (!canGoBack.value) return
        forwardStack.value.push(currentLocation.value)
        currentLocation.value = backStack.value.pop()!
    }

    function goForward() {
        if (!canGoForward.value) return
        backStack.value.push(currentLocation.value)
        currentLocation.value = forwardStack.value.pop()!
    }

    return {
        currentLocation,
        canGoBack,
        canGoForward,
        navigateTo,
        goBack,
        goForward
    }
}
