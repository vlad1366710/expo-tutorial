import { Pressable, StyleSheet, Text } from 'react-native'; // Импорт компонентов из React Native
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Импорт иконок из библиотеки MaterialIcons

// Типы пропсов для компонента IconButton
type Props = {
  icon: keyof typeof MaterialIcons.glyphMap; // Имя иконки
  label: string; // Текст кнопки
  onPress: () => void; // Функция, вызываемая при нажатии на кнопку
};

// Компонент IconButton
export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

// Стили для компонента IconButton
const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center', // Выравнивание по центру
    alignItems: 'center', // Выравнивание по центру
  },
  iconButtonLabel: {
    color: '#fff', // Цвет текста
    marginTop: 12, // Отступ сверху
  },
});