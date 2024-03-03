
import { globalStyles } from '../styles/global';
import { View, Text } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>About Screen</Text>
      </View>
    </View>
  );
};

export default AboutScreen;
