import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Button,
  Text
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useMessaging } from './src/hooks/useMessaging';

const App = () => {
  const { requestUserPermission, subscribeToTopic, unsubscribeFromTopic } = useMessaging();

  useEffect(() => {
    // request UserPermission on App start (will only create Native Alert on first start)
    requestUserPermission();

    // listen to Remote Messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // unsubscribe on unmount
    return unsubscribe;
  }, []);

  const handleSubscribe = () => {
    subscribeToTopic('weather');
  }

  const handleUnsubscribe = () => {
    unsubscribeFromTopic('weather');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#ff00ff' }} >Weather Notifications</Text>
        <Button title="Subscribe" onPress={handleSubscribe} />
        <Button title="Unsubscribe" onPress={handleUnsubscribe} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App;
