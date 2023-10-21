import {Group, Picture, Skia, createPicture} from '@shopify/react-native-skia';
import React, {useEffect, useMemo, useRef, useState} from 'react';

/**
 * Generate 2d coordonnates each 100ms
 * (that interval can be 1s or 1ms, it behave the same)
 */
const useOperationProvider = () => {
  const [operation, setOperation] = useState<{x: number; y: number}>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setInterval(() => {
      setOperation(ops => ({x: 0, y: ops.y + 10}));
    }, 100);
  }, []);

  return operation;
};

export const Crash = () => {
  const lastOperation = useOperationProvider();
  const serialized = useRef<Uint8Array | null>(null);

  const picture = useMemo(
    () =>
      createPicture({x: 0, y: 0, width: 300, height: 300}, canvas => {
        // Here we're drawing last drawed elements
        if (serialized.current) {
          const previousPicture = Skia.Picture.MakePicture(serialized.current);

          if (previousPicture) {
            // Seems like passed 15336 items in that array,
            // an error occur that leads to data loss.
            // That "limit" size seems to depend on which kind of elements have been drawed before
            console.log(serialized.current.length);
            canvas.drawPicture(previousPicture);
          }
        }

        // Now we draw the new received operation
        const paint = Skia.Paint();
        paint.setColor(Skia.Color('red'));

        canvas.drawRect(
          {
            x: lastOperation.x,
            y: lastOperation.y,
            height: 10,
            width: 10,
          },
          paint,
        );
      }),
    [lastOperation, serialized],
  );

  serialized.current = useMemo(() => picture.serialize(), [picture]);

  return (
    <Group>
      <Picture picture={picture} />
    </Group>
  );
};
