const mRtcPeerConnection = new RTCPeerConnection();
const onStatSended = (ev: RTCStatsEvent) => console.log(ev);
const onConnectionStateChange = (ev: Event) => console.log(ev);
const onDataChannel = (ev: RTCDataChannelEvent) => console.log(ev);
type TypeExcahnge<T> = {
  [K in keyof T]: T[K] extends any ? {type: K; fn: (ev: T[K]) => void} : never
};
type Unbox<T> = T extends { [K in keyof T]: infer U} ? U: never;
type MyListeners = Unbox<TypeExcahnge<RTCPeerConnectionEventMap>>;
function listeners(): MyListeners[] {
  return [
    { type: 'statsended', fn: onStatSended },
    { type: 'connectionstatechange', fn: onConnectionStateChange },
    { type: 'datachannel', fn: onDataChannel }
  ];
}
const addListener = () => {
  // mRtcPeerConnection.addEventListener('statsended', onStatSended);
  // mRtcPeerConnection.addEventListener('connectionstatechange', onConnectionStateChange);
  listeners().forEach((o) => {
    mRtcPeerConnection.addEventListener(o.type, o.fn);
  });
};
const removeListener = () => {
  // mRtcPeerConnection.removeEventListener('statsended', onStatSended);
  // mRtcPeerConnection.removeEventListener('connectionstatechange', onConnectionStateChange);
  listeners().forEach((o) => {
    mRtcPeerConnection.removeEventListener(o.type, o.fn);
  });
};
export { addListener, removeListener };
export default mRtcPeerConnection;