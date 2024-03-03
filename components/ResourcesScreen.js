
import { globalStyles } from '../styles/global';
import { View, Text } from 'react-native';

const ResourcesScreen = () => {
  return (
    <View style={globalStyles.body}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Resources Screen</Text>
      </View>
    </View>
  );
};

export default ResourcesScreen;
