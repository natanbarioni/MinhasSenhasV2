import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  header: {
    height: 110,
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 24,
    paddingTop: getStatusBarHeight() + 24,
    marginBottom: 24
  },
  form: {
    width: '100%',
    padding: 24,
    flex: 1
  },
  title: {
    fontSize: 20,
    color: '#666666',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    zIndex: 999,
    padding: 24,
    paddingTop: getStatusBarHeight() + 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  }
});
