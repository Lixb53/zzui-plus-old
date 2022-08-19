export const composeEventHandlers = <E>(
  theirsHandlers?: (event: E) => boolean | void,
  oursHandlers?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandlers?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandlers?.(event)
    }
  }

  return handleEvent
}
