import { useState } from 'react'; // Импорт хука useState
import { StyleSheet, FlatList, Platform, Pressable } from 'react-native'; // Импорт компонентов из React Native
import { Image, type ImageSource } from 'expo-image'; // Импорт компонента Image и типа ImageSource

// Типы пропсов для компонента EmojiList
type Props = {
  onSelect: (image: ImageSource) => void; // Функция для выбора эмодзи
  onCloseModal: () => void; // Функция для закрытия модального окна
};

// Компонент EmojiList
export default function EmojiList({ onSelect, onCloseModal }: Props) {
  // Состояние для хранения списка эмодзи
  const [emoji] = useState<ImageSource[]>([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  // Возвращаем JSX для рендеринга
  return (
    <FlatList
      horizontal // Горизонтальный список
      showsHorizontalScrollIndicator={Platform.OS === 'web'} // Показывать индикатор прокрутки только на вебе
      data={emoji} // Данные для списка
      contentContainerStyle={styles.listContainer} // Стиль контейнера списка
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item); // Выбор эмодзи
            onCloseModal(); // Закрытие модального окна
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

// Стили для компонента EmojiList
const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10, // Закругление углов
    borderTopLeftRadius: 10, // Закругление углов
    paddingHorizontal: 20, // Отступы по горизонтали
    flexDirection: 'row', // Направление элементов (в строку)
    alignItems: 'center', // Выравнивание по центру
    justifyContent: 'space-between', // Распределение пространства между элементами
  },
  image: {
    width: 100, // Ширина
    height: 100, // Высота
    marginRight: 20, // Отступ справа
  },
});