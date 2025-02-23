import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import { PropsWithChildren } from 'react'; // Импорт типа PropsWithChildren
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Импорт иконок из библиотеки MaterialIcons

// Типы пропсов для компонента EmojiPicker
type Props = PropsWithChildren<{
  isVisible: boolean; // Видимость модального окна
  onClose: () => void; // Функция для закрытия модального окна
}>;

// Компонент EmojiPicker
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          {/* Кнопка для закрытия модального окна */}
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children} {/* Дочерние элементы (список эмодзи) */}
      </View>
    </Modal>
  );
}

// Стили для компонента EmojiPicker
const styles = StyleSheet.create({
  modalContent: {
    height: '25%', // Высота модального окна
    width: '100%', // Ширина модального окна
    backgroundColor: '#25292e', // Цвет фона
    borderTopRightRadius: 18, // Закругление углов
    borderTopLeftRadius: 18, // Закругление углов
    position: 'absolute', // Абсолютное позиционирование
    bottom: 0, // Расположение внизу экрана
  },
  titleContainer: {
    height: '16%', // Высота контейнера заголовка
    backgroundColor: '#464C55', // Цвет фона заголовка
    borderTopRightRadius: 10, // Закругление углов
    borderTopLeftRadius: 10, // Закругление углов
    paddingHorizontal: 20, // Отступы по горизонтали
    flexDirection: 'row', // Направление элементов (в строку)
    alignItems: 'center', // Выравнивание по центру
    justifyContent: 'space-between', // Распределение пространства между элементами
  },
  title: {
    color: '#fff', // Цвет текста
    fontSize: 16, // Размер текста
  },
});