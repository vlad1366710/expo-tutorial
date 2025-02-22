// Tabs используется для создания навигации с вкладками (табами)
import { Tabs } from 'expo-router';

// Импортируем иконки из библиотеки @expo/vector-icons
import Ionicons from '@expo/vector-icons/Ionicons';

// Этот компонент определяет структуру навигации с вкладками
export default function TabLayout() {
  return (
    // Используем компонент Tabs для создания навигации с вкладками
    <Tabs
      // Настройки для всех экранов внутри Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d', // Цвет активной вкладки
        headerStyle: {
          backgroundColor: '#25292e', // Цвет фона заголовка
        },
        headerShadowVisible: false, // Убираем тень у заголовка
        headerTintColor: '#fff', // Цвет текста заголовка
        tabBarStyle: {
          backgroundColor: '#25292e', // Цвет фона панели вкладок
        },
      }}
    >
      {/* 
        Tabs.Screen — это компонент, который определяет отдельный экран во вкладке.
        - Атрибут `name` указывает имя экрана (должно совпадать с именем файла в папке `app`).
        - Атрибут `options` позволяет настроить отображение экрана (например, заголовок и иконку).
      */}
      <Tabs.Screen
        name="index" // Имя экрана (файл `index.js` или `index.tsx` в папке `app`)
        options={{
          title: 'Home', // Заголовок экрана
          tabBarIcon: ({ color, focused }) => (
            // Иконка для вкладки
            // Если вкладка активна (focused), используем иконку 'home-sharp', иначе — 'home-outline'
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about" // Имя экрана (файл `about.js` или `about.tsx` в папке `app`)
        options={{
          title: 'About', // Заголовок экрана
          tabBarIcon: ({ color, focused }) => (
            // Иконка для вкладки
            // Если вкладка активна (focused), используем иконку 'information-circle', иначе — 'information-circle-outline'
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}