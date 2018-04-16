import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require('./hola.jpg')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    /* If you want to use the component as a header
    only use headerTitle instead of only title */
    //title: 'Home',
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
      headerTitle: <LogoTitle />,
      headerRight: (
      <Button
        onPress={params.increaseCount}
        title="+1"
        color="#fff"
      />
      ),
    };
  };

  state = {
    count: 0,
  };

  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }


  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        <Text>{this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
          });
        }}
        />
      </View>
    );
  }
}

class DetailScreen extends React.Component {

  static navigationOptions =({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A nested Details Screen',
      /* There values are used instad od the shared configuration */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>Details Screen</Text>

        <Text>itemId: { JSON.stringify(itemId) }</Text>

        <Text>Without JSON: {otherParam}</Text>

        <Text>otherParam: { JSON.stringify(otherParam) }</Text>

        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />

        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />

        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />

      </View>
    );
  }
}

class ModalScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
      </View>
    );
  }
}

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },

    headerTintColor: '#fff',

    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

class App extends Component {
  render() {
    return <RootStack />;
  }
}

export default App;
