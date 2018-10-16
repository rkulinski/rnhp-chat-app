/**
 *
 * @format
 * @flow
 */
import axios from 'axios'
import { API_URL } from '../../global-config'

export function getMessages() {
  const getMessagesURL: string = `${API_URL}/api/v1/messages/`

  return axios.get(getMessagesURL)
}

export function createMessage(content: string, author: string, image: any) {
  const createMessageURL: string = `${API_URL}/api/v1/messages/`

  return axios.post(createMessageURL, {
    content,
    author,
    image,
  })
}

export function likeMessage(messageId: string, author: string) {
  const likeURL: string = `${API_URL}/api/v1/messages/${messageId}/likes/`

  return axios.post(likeURL, { author })
}

export function startTyping() {}

export function stopTyping() {}
