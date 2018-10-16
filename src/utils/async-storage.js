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

export async function _storeData(key: string, value: string): Promise<any> {
  try {
    return await AsyncStorage.setItem(`${ASYNC_STORAGE_PREFIX}${key}`, value)
  } catch (error) {
    alert(STORAGE_SAVE_ERROR)
  }
}

export async function _retrieveData(key: string): string {
  try {
    const value = await AsyncStorage.getItem(`${ASYNC_STORAGE_PREFIX}${key}`)
    if (value !== null) {
      return value
    }
  } catch (error) {
    alert(STORAGE_READ_ERROR)
  }
}
