'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </EmotionCacheProvider>
  );
}

function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'chakra', prepend: true });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
