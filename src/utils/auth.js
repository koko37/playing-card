const sessionStorageKey = "60kSESSIONstoreV1"
const storageKey = "60kSCOREchReactv1";

export function validateEmail(email) 
{
    let re = /\S+@\S+\.\S+/
    return re.test(email)
}
export function getTokenFromLocal() {
  return JSON.parse(window.localStorage.getItem(sessionStorageKey))
}
export function saveTokenToLocal(tokens) {
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(tokens))
}
export function isAuthValid() {
  let token = getTokenFromLocal()
  if(token == null) return false
  if(token.expiry*1000 <= Date.now()) return false
  return true
}
export function clearTokenFromLocal() {
  window.localStorage.removeItem(sessionStorageKey)
}


export function readScoreFromLocal() {
  return JSON.parse(window.localStorage.getItem(storageKey))
}
export function saveScoreToLocal(scores) {
  window.localStorage.setItem(storageKey, JSON.stringify(scores));
}
