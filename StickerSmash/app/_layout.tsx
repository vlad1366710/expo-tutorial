import { Stack } from 'expo-router';

// Экспортируем компонент RootLayout по умолчанию
// Этот компонент определяет структуру навигации приложения
export default function RootLayout() {
  return (
    // Используем компонент Stack для создания стека навигации
    <Stack>

    {/* 
        Stack.Screen — это компонент, который определяет отдельный экран в стеке навигации.
        - Атрибут `name` указывает имя экрана (должно совпадать с именем файла в папке `app`).
        - Атрибут `options` позволяет настроить отображение экрана (например, заголовок).
      */}

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
