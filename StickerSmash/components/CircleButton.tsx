import { View, Pressable, StyleSheet } from 'react-native'; // Импорт компонентов из React Native
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Импорт иконок из библиотеки MaterialIcons

// Типы пропсов для компонента CircleButton
type Props = {
  onPress: () => void; // Функция, вызываемая при нажатии на кнопку
};

// Компонент CircleButton
export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      {/* Pressable — это компонент, который реагирует на нажатия */}
      <Pressable style={styles.circleButton} onPress={onPress}>
        {/* Иконка "add" из MaterialIcons */}
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

// Стили для компонента CircleButton
const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84, // Ширина
    height: 84, // Высота
    marginHorizontal: 60, // Отступы по горизонтали
    borderWidth: 4, // Толщина рамки
    borderColor: '#ffd33d', // Цвет рамки
    borderRadius: 42, // Закругление углов
    padding: 3, // Внутренний отступ
  },
  circleButton: {
    flex: 1, // Занимает всё доступное пространство
    justifyContent: 'center', // Выравнивание по центру
    alignItems: 'center', // Выравнивание по центру
    borderRadius: 42, // Закругление углов
    backgroundColor: '#fff', // Цвет фона
  },
});