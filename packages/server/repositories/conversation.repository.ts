//Implementation detail
const conversations = new Map<string, string>()


export const conversationRepository = {
  getLastReponseId(conversationsId: string) {
    return conversations.get(conversationsId)
  },

  setLastResponseId(conversationsId: string, responseId: string) {
    return conversations.set(conversationsId, responseId)
  }


}

// //Export public interface
// export function getLastReponseId(conversationsId: string) {
//   return conversations.get(conversationsId)
// }

// export function setLastResponseId(conversationsId: string, responseId: string) {
//   return conversations.set(conversationsId, responseId)
// }
