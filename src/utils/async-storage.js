/**
 *
 * @format
 * @flow
 */
import { AsyncStorage } from 'react-native'

const STORAGE_SAVE_ERROR: string =
  'Error occurred while saving data to async storage'
const STORAGE_READ_ERROR: string =
  'Error occurred while reading data from async storage'
const ASYNC_STORAGE_PREFIX: string = '@RNHP_'

export async function storeData(key: string, value: string): Promise<any> {
  try {
    return await AsyncStorage.setItem(`${ASYNC_STORAGE_PREFIX}${key}`, value)
  } catch (error) {
    alert(STORAGE_SAVE_ERROR)
    return null
  }
}

export async function retrieveData(key: string): Promise<string> {
  let value: string = ''
  try {
    value = await AsyncStorage.getItem(`${ASYNC_STORAGE_PREFIX}${key}`)
  } catch (error) {
    alert(STORAGE_READ_ERROR)
  }

  return value;
}
