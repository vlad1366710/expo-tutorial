// Импортируем необходимые компоненты из библиотеки 'react-native'
import { Text, View,  StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// export позволяет делиться кодом между модулями.
// default используется вместе с export, чтобы указать, что данный экспорт является основным (по умолчанию) для модуля
export default function Index() {
  return (
    // Используем компонент View как контейнер, который применяет стили из styles.container
    <View style={styles.container}>
       {/* Компонент Text отображает текст "Home screen" с применением стилей из styles.text */}
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

// Создаем объект стилей с помощью StyleSheet.create
const styles = StyleSheet.create({
  // Стиль для контейнера
  container: {
    flex: 1, // Занимает все доступное пространство
    backgroundColor: '#25292e', // Цвет фона
    alignItems: 'center', // Выравнивание дочерних элементов по центру по горизонтали
    justifyContent: 'center', // Выравнивание дочерних элементов по центру по вертикали
  },
  // Стиль для текста
  text: {
    color: '#fff', // Цвет текста (белый)
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});