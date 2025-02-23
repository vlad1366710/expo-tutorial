// Импорт библиотек для обработки жестов и анимаций
import { Gesture, GestureDetector } from 'react-native-gesture-handler'; // Для обработки жестов (например, двойное нажатие, перетаскивание)
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'; // Для создания анимаций и работы с анимированными значениями
import { type ImageSource } from 'expo-image'; // Тип для источника изображения (например, URI или локальный ресурс)

// Определение пропсов компонента EmojiSticker
type Props = {
  imageSize: number; // Начальный размер стикера (ширина и высота)
  stickerSource: ImageSource; // Источник изображения стикера (например, эмодзи)
};

// Основной компонент EmojiSticker
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // Анимированные значения для управления состоянием стикера
  const scaleImage = useSharedValue(imageSize); // Анимированное значение для масштабирования стикера (начальное значение — imageSize)
  const translateX = useSharedValue(0); // Анимированное значение для перемещения стикера по оси X (начальное значение — 0)
  const translateY = useSharedValue(0); // Анимированное значение для перемещения стикера по оси Y (начальное значение — 0)

  // Жест двойного нажатия (double tap)
  const doubleTap = Gesture.Tap() // Создание жеста нажатия
    .numberOfTaps(2) // Указываем, что жест срабатывает при двойном нажатии
    .onStart(() => {
      // Логика, выполняемая при двойном нажатии
      if (scaleImage.value !== imageSize * 2) {
        // Если текущий размер стикера не увеличен в 2 раза, увеличиваем его
        scaleImage.value = scaleImage.value * 2;
      } else {
        // Если стикер уже увеличен, возвращаем его к исходному размеру
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  // Анимированный стиль для изменения размера стикера
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value), // Плавное изменение ширины с пружинной анимацией
      height: withSpring(scaleImage.value), // Плавное изменение высоты с пружинной анимацией
    };
  });

  // Жест перетаскивания (drag)
  const drag = Gesture.Pan() // Создание жеста перетаскивания
    .onChange((event) => {
      // Логика, выполняемая при изменении положения пальца
      translateX.value += event.changeX; // Обновляем значение translateX на величину изменения по оси X
      translateY.value += event.changeY; // Обновляем значение translateY на величину изменения по оси Y
    });

  // Анимированный стиль для перемещения стикера
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value, // Применяем перемещение по оси X
        },
        {
          translateY: translateY.value, // Применяем перемещение по оси Y
        },
      ],
    };
  });

  // Рендеринг компонента
  return (
    // Обработчик жеста перетаскивания
    <GestureDetector gesture={drag}>
      {/* Анимированный контейнер для стикера */}
      <Animated.View style={[containerStyle, { top: -350 }]}>
        {/* Обработчик жеста двойного нажатия */}
        <GestureDetector gesture={doubleTap}>
          {/* Анимированное изображение стикера */}
          <Animated.Image
            source={stickerSource} // Источник изображения стикера
            resizeMode="contain" // Режим масштабирования изображения (вписывается в заданные размеры)
            style={[imageStyle, { width: imageSize, height: imageSize }]} // Стиль изображения (анимированный размер)
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}