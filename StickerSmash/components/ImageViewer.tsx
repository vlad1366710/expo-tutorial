import { StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import { Image, type ImageSource } from 'expo-image'; // Импорт компонента Image и типа ImageSource

// Типы пропсов для компонента ImageViewer
type Props = {
  imgSource: ImageSource; // Источник изображения (заглушка)
  selectedImage?: string; // Опциональный пропс для URI выбранного изображения ? необязательно 
};

// Компонент ImageViewer
export default function ImageViewer({ imgSource, selectedImage }: Props) {
  // Если выбрано изображение, используем его URI, иначе — заглушку
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  // Возвращаем компонент Image с переданным источником и стилями
  return <Image source={imageSource} style={styles.image} />;
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