
import { globalStyles } from '../styles/global';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Home Screen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
