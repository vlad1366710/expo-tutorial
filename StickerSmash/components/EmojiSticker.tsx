import { View } from 'react-native'; // Импорт компонентов из React Native
import { Image, type ImageSource } from 'expo-image'; // Импорт компонента Image и типа ImageSource

// Типы пропсов для компонента EmojiSticker
type Props = {
  imageSize: number; // Размер изображения
  stickerSource: ImageSource; // Источник изображения (эмодзи)
};

// Компонент EmojiSticker
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}