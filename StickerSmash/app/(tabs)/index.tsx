import { View, StyleSheet } from 'react-native'; // Основные компоненты React Native
import * as ImagePicker from 'expo-image-picker'; // Для выбора изображений из галереи
import { useState, useRef } from 'react'; // Хуки для управления состоянием и ссылками
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Для обработки жестов
import * as MediaLibrary from 'expo-media-library'; // Для сохранения изображений в медиатеку
import { captureRef } from 'react-native-view-shot'; // Для создания скриншота View
import { type ImageSource } from 'expo-image'; // Тип для источника изображения

// Импорт пользовательских компонентов
import Button from '@/components/Button'; // Кнопка
import ImageViewer from '@/components/ImageViewer'; // Просмотр изображения
import IconButton from '@/components/IconButton'; // Кнопка с иконкой
import CircleButton from '@/components/CircleButton'; // Круглая кнопка
import EmojiPicker from '@/components/EmojiPicker'; // Модальное окно для выбора эмодзи
import EmojiList from '@/components/EmojiList'; // Список эмодзи
import EmojiSticker from '@/components/EmojiSticker'; // Стикер с эмодзи

// Импорт изображения-заглушки
const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  // Состояния
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined); // URI выбранного изображения
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false); // Показывать ли дополнительные опции
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Видимость модального окна с эмодзи
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined); // Выбранный эмодзи

  // Запрос разрешения на доступ к медиатеке
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // Ссылка на View для создания скриншота
  const imageRef = useRef<View>(null);

  // Если разрешение не запрошено, запрашиваем его
  if (status === null) {
    requestPermission();
  }

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

  // Функция для сохранения изображения
  const onSaveImageAsync = async () => {
    try {
      // Создаем скриншот View
      const localUri = await captureRef(imageRef, {
        height: 440, // Высота скриншота
        quality: 1, // Качество скриншота
      });

      // Сохраняем скриншот в медиатеку
      await MediaLibrary.saveToLibraryAsync(localUri);

      // Если сохранение прошло успешно, показываем сообщение
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e); // Логируем ошибку, если что-то пошло не так
    }
  };

  // Рендеринг компонента
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Контейнер для изображения */}
      <View style={styles.imageContainer}>
        {/* View для создания скриншота */}
        <View ref={imageRef} collapsable={false}>
          {/* Компонент для отображения изображения */}
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {/* Если выбран эмодзи, отображаем его поверх изображения */}
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
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
    </GestureHandlerRootView>
  );
}

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