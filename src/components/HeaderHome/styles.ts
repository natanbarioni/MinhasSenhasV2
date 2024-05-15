import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 8,
    paddingBottom: 24,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 4,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    color: '#666666',
    fontSize: 20
  },
  subtitle: {
    color: '#565656',
    fontSize: 13
  },
  avatar: {
    width: 56,
    height: 56,
  }

});
