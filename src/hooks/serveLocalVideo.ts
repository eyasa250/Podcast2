import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export async function getLocalVideoUri(): Promise<string> {
    const asset = Asset.fromModule(require('C:/Users/eyasa/Desktop/Podcast2/assets/Fréro Delavega - Ton visage.mp4'));
    await asset.downloadAsync();
    return `${FileSystem.cacheDirectory}${asset.name}`;
}
