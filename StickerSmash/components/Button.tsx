import { StyleSheet, View, Pressable, Text } from 'react-native'; // Импорт компонентов из React Native
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Импорт иконок из библиотеки FontAwesome

// Типы пропсов для компонента Button
type Props = {
  label: string; // Текст кнопки
  theme?: 'primary'; // Опциональный пропс для темы кнопки
  onPress?: () => void; // Опциональный пропс для обработки нажатия
};

// Компонент Button
export default function Button({ label, theme, onPress }: Props) {
  // Если тема кнопки — 'primary', применяем особые стили
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }, // Дополнительные стили
        ]}>
        {/* Pressable — это компонент, который реагирует на нажатия */}
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]} // Стиль кнопки
          onPress={onPress} // Обработчик нажатия
        >
          {/* Иконка из FontAwesome */}
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          {/* Текст кнопки */}
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  // Обычная кнопка без темы
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}  onPress={onPress} >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

// Стили для компонента Button
const styles = StyleSheet.create({
  // Контейнер для кнопки
  buttonContainer: {
    width: 320, // Ширина
    height: 68, // Высота
    marginHorizontal: 20, // Отступы по горизонтали
    alignItems: 'center', // Выравнивание по центру
    justifyContent: 'center', // Выравнивание по центру
    padding: 3, // Внутренний отступ
  },
  // Стиль кнопки
  button: {
    borderRadius: 10, // Закругление углов
    width: '100%', // Ширина 100%
    height: '100%', // Высота 100%
    alignItems: 'center', // Выравнивание по центру
    justifyContent: 'center', // Выравнивание по центру
    flexDirection: 'row', // Направление элементов (в строку)
  },
  // Стиль иконки
  buttonIcon: {
    paddingRight: 8, // Отступ справа
  },
  // Стиль текста кнопки
  buttonLabel: {
    color: '#fff', // Цвет текста
    fontSize: 16, // Размер текста
  },
});