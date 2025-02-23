import { StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import { Image, type ImageSource } from 'expo-image'; // Импорт компонента Image и типа ImageSource

// Типы пропсов для компонента ImageViewer
type Props = {
  imgSource: ImageSource; // Источник изображения
};

// Компонент ImageViewer
export default function ImageViewer({ imgSource }: Props) {
  // Возвращаем компонент Image с переданным источником и стилями
  return <Image source={imgSource} style={styles.image} />;
}

// Стили для компонента ImageViewer
const styles = StyleSheet.create({
  // Стиль изображения
  image: {
    width: 320, // Ширина
    height: 440, // Высота
    borderRadius: 18, // Закругление углов
  },
});