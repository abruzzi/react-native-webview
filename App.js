/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import type {Node} from 'react';
import WebView from 'react-native-webview'
import {
  StyleSheet,
} from 'react-native';


const WEB_URL = `http://localhost:8080/checkout`;

const event = {
  type: 'checkout',
  payload: {
    orderId: 'a3ed73f3-e705-4ec3-a8ec-df392a98fbe3',
    platform: 'ios'
  }
}

const code = `
window.postMessage(${JSON.stringify(event)}, "*");
true;
`;


const App: () => Node = () => {
  const webviewRef = useRef<WebView>(null)

  const handleOnMessage = async (event) => {
    console.log(`message from web:`, event.nativeEvent.data)
  }

  return (
    <WebView
          ref={webviewRef}
          style={styles.webview}
          source={{
            uri: `${WEB_URL}`
          }}
          injectedJavaScript={code}
          startInLoadingState
          onMessage={handleOnMessage}
      />
  );
};

const styles = StyleSheet.create({
  webview: {
    backgroundColor: '#00FF00'
  }
});

export default App;
