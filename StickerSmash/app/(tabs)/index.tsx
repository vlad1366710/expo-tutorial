import { View, StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import * as ImagePicker from 'expo-image-picker'; // Импорт библиотеки для выбора изображений
import { useState } from 'react'; // Импорт хука useState для управления состоянием

import Button from '@/components/Button'; // Импорт компонента Button
import ImageViewer from '@/components/ImageViewer'; // Импорт компонента ImageViewer

// Импорт изображения-заглушки с использованием require
const PlaceholderImage = require('@/assets/images/background-image.png');

// Основной компонент Index
export default function Index() {
  // Состояние для хранения URI выбранного изображения
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // Функция для выбора изображения из галереи
  const pickImageAsync = async () => {
    // Запуск стандартного интерфейса выбора изображения
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Тип медиа (только изображения)
      allowsEditing: true, // Разрешение редактирования изображения
      quality: 1, // Качество изображения (от 0 до 1)
    });

    // Если пользователь выбрал изображение (не нажал "Отмена")
    if (!result.canceled) {
      // Устанавливаем URI выбранного изображения в состояние
      setSelectedImage(result.assets[0].uri);
    } else {
      // Если пользователь отменил выбор, показываем сообщение
      alert('You did not select any image.');
    }
  };

  // Возвращаем JSX для рендеринга
  return (
    <View style={styles.container}>
      {/* Контейнер для изображения */}
      <View style={styles.imageContainer}>
        {/* Компонент ImageViewer, который отображает либо выбранное изображение, либо заглушку */}
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {/* Контейнер для кнопок */}
      <View style={styles.footerContainer}>
        {/* Кнопка с темой "primary" для выбора изображения */}
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
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