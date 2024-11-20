// react-native-simple-bottom-sheet.d.ts
declare module 'react-native-simple-bottom-sheet' {
  import React from 'react';
  import { ViewProps } from 'react-native';

  interface BottomSheetProps extends ViewProps {
    isOpen: boolean;
    // Add other props as needed
  }

  const BottomSheet: React.FC<BottomSheetProps>;
  export default BottomSheet;
}
