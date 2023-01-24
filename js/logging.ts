const consoleDebugLogging = false

export function debugLog(message: string) {
  if (consoleDebugLogging) {
    console.log(message)
  }
}
