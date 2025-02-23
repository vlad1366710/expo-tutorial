import { View, StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import Button from '@/components/Button'; // Импорт компонента Button
import ImageViewer from '@/components/ImageViewer'; // Импорт компонента ImageViewer

// Импорт изображения с использованием require
const PlaceholderImage = require('@/assets/images/background-image.png');

// Основной компонент Index
export default function Index() {
  return (
    // Основной контейнер, который занимает весь экран
    <View style={styles.container}>
      {/* Контейнер для изображения */}
      <View style={styles.imageContainer}>
        {/* Компонент ImageViewer, который отображает изображение */}
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      {/* Контейнер для кнопок */}
      <View style={styles.footerContainer}>
        {/* Кнопка с темой "primary" */}
        <Button theme="primary" label="Choose a photo" />
        {/* Обычная кнопка */}
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

// Стили для компонента Index
const styles = StyleSheet.create({
  // Стиль для основного контейнера
  container: {
    flex: 1, // Занимает всё доступное пространство
    backgroundColor: '#25292e', // Цвет фона
    alignItems: 'center', // Выравнивание дочерних элементов по центру по горизонтали
  },
  // Стиль для контейнера изображения
  imageContainer: {
    flex: 1, // Занимает всё доступное пространство внутри контейнера
  },
  // Стиль для контейнера кнопок
  footerContainer: {
    flex: 1 / 3, // Занимает 1/3 доступного пространства
    alignItems: 'center', // Выравнивание кнопок по центру
  },
});