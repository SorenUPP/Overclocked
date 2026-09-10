'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * Collects styled-components styles generated during server render and injects
 * them into the streamed HTML. Required for styled-components to work with the
 * Next.js App Router. See https://nextjs.org/docs/app/building-your-application/styling/css-in-js
 */
export default function StyledComponentsRegistry({ children }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return children;
  }

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
