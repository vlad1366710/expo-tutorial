import { View, StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import * as ImagePicker from 'expo-image-picker'; // Импорт библиотеки для выбора изображений
import { useState } from 'react'; // Импорт хука useState для управления состоянием
import { type ImageSource } from 'expo-image'; // Импорт типа ImageSource из библиотеки expo-image

// Импорт компонентов
import Button from '@/components/Button'; // Компонент кнопки
import ImageViewer from '@/components/ImageViewer'; // Компонент для отображения изображения
import IconButton from '@/components/IconButton'; // Компонент кнопки с иконкой
import CircleButton from '@/components/CircleButton'; // Компонент круглой кнопки
import EmojiPicker from '@/components/EmojiPicker'; // Компонент модального окна для выбора эмодзи
import EmojiList from '@/components/EmojiList'; // Компонент списка эмодзи
import EmojiSticker from '@/components/EmojiSticker'; // Компонент стикера с эмодзи

// Импорт изображения-заглушки
const PlaceholderImage = require('@/assets/images/background-image.png');

// Основной компонент Index
export default function Index() {
  // Состояние для хранения URI выбранного изображения
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // Состояние для отображения дополнительных опций после выбора изображения
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  // Состояние для управления видимостью модального окна с эмодзи
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // Состояние для хранения выбранного эмодзи
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  // Функция для выбора изображения из галереи
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Тип медиа (только изображения)
      allowsEditing: true, // Разрешение редактирования изображения
      quality: 1, // Качество изображения (от 0 до 1)
    });

    // Если пользователь выбрал изображение (не нажал "Отмена")
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Сохраняем URI выбранного изображения
      setShowAppOptions(true); // Показываем дополнительные опции
    } else {
      alert('You did not select any image.'); // Сообщение, если изображение не выбрано
    }
  };

  // Функция для сброса состояния
  const onReset = () => {
    setShowAppOptions(false); // Скрываем дополнительные опции
  };

  // Функция для открытия модального окна с эмодзи
  const onAddSticker = () => {
    setIsModalVisible(true); // Показываем модальное окно
  };

  // Функция для закрытия модального окна
  const onModalClose = () => {
    setIsModalVisible(false); // Скрываем модальное окно
  };

  // Функция для сохранения изображения (пока не реализована)
  const onSaveImageAsync = async () => {
    // TODO: Реализовать сохранение изображения
  };

  // Возвращаем JSX для рендеринга
  return (
    <View style={styles.container}>
      {/* Контейнер для изображения */}
      <View style={styles.imageContainer}>
        {/* Компонент ImageViewer, который отображает либо выбранное изображение, либо заглушку */}
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {/* Если выбран эмодзи, отображаем его поверх изображения */}
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            {/* Кнопка "Reset" */}
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            {/* Круглая кнопка для добавления стикера */}
            <CircleButton onPress={onAddSticker} />
            {/* Кнопка "Save" */}
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      {/* Модальное окно для выбора эмодзи */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* Список эмодзи */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

// Стили для компонента Index
const styles = StyleSheet.create({
  container: {
    flex: 1, // Занимает всё доступное пространство
    backgroundColor: '#25292e', // Цвет фона
    alignItems: 'center', // Выравнивание дочерних элементов по центру по горизонтали
  },
  imageContainer: {
    flex: 1, // Занимает всё доступное пространство внутри контейнера
  },
  footerContainer: {
    flex: 1 / 3, // Занимает 1/3 доступного пространства
    alignItems: 'center', // Выравнивание кнопок по центру
  },
  optionsContainer: {
    position: 'absolute', // Абсолютное позиционирование
    bottom: 80, // Отступ снизу
  },
  optionsRow: {
    alignItems: 'center', // Выравнивание по центру
    flexDirection: 'row', // Направление элементов (в строку)
  },
});