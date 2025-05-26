export function handleAutoComplete(
  searchValue: string,
  sendFunction: (
    data: string | ArrayBufferLike | Blob | ArrayBufferView
  ) => void
) {
  sendFunction(searchValue);
}

export function handleWebsocketMessage(
  populatePeople: (result: any[]) => void,
  data: any[]
) {
  populatePeople(data);
}
